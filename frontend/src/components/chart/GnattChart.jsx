import { ScatterChart, CartesianGrid, Tooltip } from 'recharts';
import CustomizedXAxis from '../axes/XAxis';
import PrimaryYAxis from '../axes/PrimaryYAxis';
import Rect from '../scatter/Rect';
import CustomTooltip from '../scatter/CustomTooltip';


function processData(rawData) {
    let dataArr = rawData.map((p) => ({
        product: {
            heatNo: p.heat_no,
            // type: p.product.type
        },
        currentProcess: `${p.current_process.name} ${p.current_process.section}`,
        startDatetime: new Date(p.start_datetime).getTime(),
        endDatetime: new Date(p.end_datetime).getTime(),
        status: p.status
    }))

    return dataArr;
}

export default function GnattChart({ schedule }) {
    const processedSchedule = processData(schedule);

    const completedArr = processedSchedule.filter((p) => p.status === 'Completed');
    const inProgressArr = processedSchedule.filter((p) => p.status === 'In Process');
    const plannedArr = processedSchedule.filter((p) => p.status === 'Planned');

    return (
        <>
            <ScatterChart
                width={5000}
                height={560}
            >
                <CartesianGrid
                    strokeDasharray="1 0"
                    width="2500px"
                />
                {
                    CustomizedXAxis({
                        key: "startDatetime"
                    })
                }
                {
                    PrimaryYAxis({
                        key: "currentProcess",
                    })
                }
                <Tooltip
                    content={<CustomTooltip />}
                />
                {
                    Rect({
                        typeArr: completedArr,
                        rectColor: "#0e7490",
                        opacity: 1.0,
                        textFill: '#fafafa'
                    })
                }
                {
                    Rect({
                        typeArr: inProgressArr,
                        rectColor: "#facc15",
                        opacity: 1.0,
                        textFill: '#fafafa'
                    })
                }
                {
                    Rect({
                        typeArr: plannedArr,
                        rectColor: "#a8a29e",
                        opacity: 0.6,
                        textFill: '#0f172a'
                    })
                }
            </ScatterChart>
        </>
    )
}
