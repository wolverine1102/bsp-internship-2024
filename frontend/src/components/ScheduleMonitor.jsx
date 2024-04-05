import { ScatterChart, CartesianGrid, Tooltip, YAxis } from 'recharts';
import CustomizedXAxis from './axes/XAxis';
import PrimaryYAxis from './axes/PrimaryYAxis';
import Rect from './scatter/Rect';
import CustomTooltip from './scatter/CustomTooltip';


function processData(rawData) {
    let dataArr = rawData.map((p) => ({
        product: {
            id: p.product.id,
            type: p.product.type
        },
        current_process: `${p.current_process.name} ${p.current_process.section}`,
        start_datetime: new Date(p.start_date_time).getTime(),
        end_datetime: new Date(p.end_date_time).getTime()
    }))

    return dataArr;
}

export default function ScheduleMonitor({ schedule }) {
    const processedSchedule = processData(schedule);

    const billetArr = processedSchedule.filter((p) => p.product.type === 'billet');
    const bloomArr = processedSchedule.filter((p) => p.product.type === 'bloom');

    return (
        <>
            <ScatterChart
                width={1800}
                height={560}
            >
                <CartesianGrid
                    strokeDasharray="1 0"
                    width="2500px"
                />
                {
                    CustomizedXAxis({
                        key: "start_datetime"
                    })
                }
                {
                    PrimaryYAxis({
                        key: "current_process",
                    })
                }
                <Tooltip
                    content={<CustomTooltip />}
                />
                {
                    Rect({
                        typeArr: billetArr,
                        rectColor: "#155e75"
                    })
                }
                {
                    Rect({
                        typeArr: bloomArr,
                        rectColor: "#fbbf24"
                    })
                }
            </ScatterChart>
        </>
    )
}
