from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from datetime import datetime, date, timedelta
from app.db import create_connection


router = APIRouter()


def fetch_data_from_database():
    today = date.today()
    start_dtm = (
        today.strftime("%Y") + today.strftime("%m") + today.strftime("%d") + "0559"
    )

    tomorrow = today + timedelta(days=1)
    end_dtm = (
        tomorrow.strftime("%Y")
        + tomorrow.strftime("%m")
        + tomorrow.strftime("%d")
        + "0559"
    )

    fields = [
        "HEAT_NO",
        "ACT_CN_NO",
        "ACT_AR_NO",
        "ACT_VA_NO",
        "ACT_LF_NO",
        "ACT_RH_NO",
        "ACT_CC_NO",
        "TAPPING_STR_DTM",
        "TAPPING_END_DTM",
        "AR_STR_DTM",
        "AR_END_DTM",
        "VA_STR_DTM",
        "VA_END_DTM",
        "LF_STR_DTM",
        "LF_END_DTM",
        "RH_STR_DTM",
        "RH_END_DTM",
        "CC_STR_DTM",
        "CC_END_DTM",
        "PLAN_CC_NO",
    ]

    select_string = ""
    for i in range(len(fields)):
        if i == (len(fields) - 1):
            select_string += fields[i]
        else:
            select_string += f"{fields[i]}, "

    rows = None
    connection = create_connection()

    if connection:
        cursor = connection.cursor()
        cursor.execute(
            f"""SELECT {select_string} 
                FROM VW_SMS_HEAT 
                WHERE blow_str_dtm > {start_dtm} AND blow_str_dtm < {end_dtm}
                ORDER BY HEAT_NO"""
        )
        rows = cursor.fetchall()

        cursor.close()
        connection.close()

    return rows


def modify_data(rows: list):
    schedule = []
    route_dict = {
        1: {"name": "CONV", "start_dtm_index": 7, "end_dtm_index": 8},
        2: {"name": "ARU", "start_dtm_index": 9, "end_dtm_index": 10},
        3: {"name": "VAD", "start_dtm_index": 11, "end_dtm_index": 12},
        4: {"name": "LF", "start_dtm_index": 13, "end_dtm_index": 14},
        5: {"name": "RH", "start_dtm_index": 15, "end_dtm_index": 16},
        6: {"name": "MC", "start_dtm_index": 17, "end_dtm_index": 18},
    }
    # Keeping track of maximum CC_END_DTM of each section in CC to avoid overlapping with START_DTM in "status: Planned"
    CC_END_DTM_dict = {str(key): "" for key in range(1, 7)}

    for row in rows:
        for row_index in range(1, 7):
            if row[row_index]:
                # TAPPING_STR_DTM is null
                if row[route_dict[row_index]["start_dtm_index"]] is None:
                    continue


                # STR_DTM and END_DTM are available i.e process has been completed
                elif row[route_dict[row_index]["end_dtm_index"]]:
                    schedule_dict = {
                        "heat_no": row[0],
                        "current_process": {
                            "name": route_dict[row_index]["name"],
                            "section": row[row_index],
                        },
                        "start_datetime": str(
                            datetime.strptime(
                                row[route_dict[row_index]["start_dtm_index"]],
                                "%Y%m%d%H%M",
                            )
                        ),
                        "end_datetime": str(
                            datetime.strptime(
                                row[route_dict[row_index]["end_dtm_index"]],
                                "%Y%m%d%H%M",
                            )
                        ),
                        "status": "Completed",
                    }

                # END_DTM is null i.e process is under way
                else:
                    end_dtm = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

                    schedule_dict = {
                        "heat_no": row[0],
                        "current_process": {
                            "name": route_dict[row_index]["name"],
                            "section": row[row_index],
                        },
                        "start_datetime": str(
                            datetime.strptime(
                                row[route_dict[row_index]["start_dtm_index"]],
                                "%Y%m%d%H%M",
                            )
                        ),
                        "end_datetime": end_dtm,
                        "status": "In Process",
                    }

                schedule.append(schedule_dict)

                # Populating CC_END_DTM_dict with the maximum END_DTM of each section in CC
                if schedule_dict["current_process"]["name"] == "MC":
                    CC_section = schedule_dict["current_process"]["section"]

                    if CC_END_DTM_dict[CC_section]:
                        if schedule_dict["end_datetime"] > CC_END_DTM_dict[CC_section]:
                            CC_END_DTM_dict[CC_section] = schedule_dict["end_datetime"]
                    else:
                        CC_END_DTM_dict[CC_section] = schedule_dict["end_datetime"]


            # ACT_CC_NO is null i.e process for CC is planned
            elif row_index == 6:
                # Checking if AR_END_DTM is available
                AR_END_DTM = row[route_dict[2]["end_dtm_index"]]
                if AR_END_DTM:
                    # Adding 2 hrs to AR_END_DTM
                    planned_start_dtm = datetime.strptime(
                        AR_END_DTM, "%Y%m%d%H%M"
                    ) + timedelta(hours=2)

                    CC_section = row[-1]

                    planned_end_dtm = planned_start_dtm + timedelta(minutes=45)

                    schedule_dict = {
                        "heat_no": row[0],
                        "current_process": {
                            "name": route_dict[row_index]["name"],
                            "section": CC_section,
                        },
                        "start_datetime": str(planned_start_dtm),
                        "end_datetime": str(planned_end_dtm),
                        "status": "Planned",
                    }

                    schedule.append(schedule_dict)

            else:
                continue

    
    # Updating STR_DTM of planned processes according to CC_END_DTM_dict
    for process in schedule:
        if process["status"] == "Planned":
            CC_section = process["current_process"]["section"]

            if process["start_datetime"] <= CC_END_DTM_dict[CC_section]:
                planned_start_dtm = datetime.strptime(
                            CC_END_DTM_dict[CC_section], "%Y-%m-%d %H:%M:%S"
                        ) + timedelta(minutes=15)
                
                planned_end_dtm = planned_start_dtm + timedelta(minutes=45)

                process["start_datetime"] = str(planned_start_dtm)
                process["end_datetime"] = str(planned_end_dtm)

                CC_END_DTM_dict[CC_section] = process["end_datetime"]
                
    
    return schedule


@router.get("/api/schedule/")
async def get_schedule():
    rows = fetch_data_from_database()
    if rows:
        schedule = modify_data(rows)
        return JSONResponse(status_code=200, content=schedule)
    else:
        raise HTTPException(status_code=500, detail="Internal Server Error")
