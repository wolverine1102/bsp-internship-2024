import { ScatterChart, CartesianGrid, Tooltip } from 'recharts';
import CustomizedXAxis from '../axes/XAxis';
import PrimaryYAxis from '../axes/PrimaryYAxis';
import Rect from '../scatter/Rect';
import CustomTooltip from '../scatter/CustomTooltip';


function processData(rawData) {
    let dataArr = rawData.map((p) => ({
        heatNo: p.heat_no,
        currentProcess: `${p.current_process.name} ${p.current_process.section}`,
        startDatetime: new Date(p.start_datetime).getTime(),
        endDatetime: new Date(p.end_datetime).getTime(),
        status: p.status
    }))

    return dataArr;
}

export default function GnattChart({ schedule }) {
    const processedSchedule = processData(schedule);

    processedSchedule.forEach(p => {
        if (p.status === 'Completed') {
            p.rectColor = "#0e7490"
            p.textFill = '#fafafa'
        }
        else if (p.status === 'In Process') {
            p.rectColor = "#fbbf24"
            p.textFill = '#334155'
        }
        else if (p.status === 'Planned') {
            p.rectColor = "#d6d3d1"
            p.textFill = '#0f172a'
        }
    });

    return (
        <>
            <ScatterChart
                width={6000}
                height={560}
            >
                <CartesianGrid
                    strokeDasharray="1 0"
                    width="2500px"
                    horizontalPoints={[139, 229, 259, 319, 379, 554]}
                    style={{
                        stroke: "#64748b",
                        strokeWidth: 0.5
                    }}
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
                        scheduleArr: processedSchedule,
                    })
                }
            </ScatterChart>
        </>
    )
}
