import { useState } from 'react';
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
        grade: p.grade,
        tundishNo: p.tundish_no,
        tundishLife: p.tundish_life,
        mouldNo: p.mould_no,
        mouldLife: p.mould_life,
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

    const [hoveredHeatNo, setHoveredHeatNo] = useState(null);

    function handleOnClick() {
        setHoveredHeatNo(null);
    }

    return (
        <>
            <ScatterChart
                width={3500}
                height={565}
                onClick={handleOnClick}
            >
                <CartesianGrid
                    strokeDasharray="1 0"
                    width="2500px"
                    horizontalPoints={[139, 229, 259, 319, 379, 559]}
                    style={{
                        stroke: "#431407",
                        strokeWidth: 0.65
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
                    content={<CustomTooltip
                        hoveredHeatNo={hoveredHeatNo}
                    />}
                    cursor={hoveredHeatNo}
                    coordinate={{
                        x: 200,
                        y: 200
                    }}
                />
                {
                    Rect({
                        scheduleArr: processedSchedule,
                        hoveredHeatNo: hoveredHeatNo,
                        setHoveredHeatNo: setHoveredHeatNo
                    })
                }
            </ScatterChart>
        </>
    )
}
