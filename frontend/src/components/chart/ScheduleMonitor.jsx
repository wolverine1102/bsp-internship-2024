import { ScatterChart, CartesianGrid, Tooltip } from 'recharts';
import CustomizedXAxis from '../axes/XAxis';
import PrimaryYAxis from '../axes/PrimaryYAxis';
import Rect from '../scatter/Rect';
import CustomTooltip from '../scatter/CustomTooltip';


function processData(rawData) {
    let dataArr = rawData.map((p) => ({
        product: {
            heatNo: p.heat_no.slice(-3),
            // type: p.product.type
        },
        currentProcess: `${p.current_process.name} ${p.current_process.section}`,
        startDatetime: new Date(p.start_datetime).getTime(),
        endDatetime: new Date(p.end_datetime).getTime(),
        status: p.status
    }))

    return dataArr;
}

export default function ScheduleMonitor({ schedule }) {
    const processedSchedule = processData(schedule);

    // const billetArr = processedSchedule.filter((p) => p.product.type === 'billet');
    // const bloomArr = processedSchedule.filter((p) => p.product.type === 'bloom');

    const completedArr = processedSchedule.filter((p) => p.status === 'Completed');
    const inProgressArr = processedSchedule.filter((p) => p.status === 'In Process');
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
                        rectColor: "#0e7490"
                    })
                }
                {
                    Rect({
                        typeArr: inProgressArr,
                        rectColor: "#65a30d"
                    })
                }
            </ScatterChart>
        </>
    )
}
