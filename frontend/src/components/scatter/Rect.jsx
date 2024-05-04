import { useState } from 'react';
import { Scatter } from 'recharts';


export default function Rect({ scheduleArr, hoveredHeatNo, setHoveredHeatNo }) {
    function handleMouseEnter(point, event) {
        setHoveredHeatNo(point.heatNo);
    }
         
    function handleMouseLeave() {
        setHoveredHeatNo(null);
    }

    const renderCustomBar = (props) => {
        let endDatetimeScaling = new Date(props.payload.endDatetime + 5 * 60 * 1000).getTime(); // Add 5 mins to endDatetime
        let width = (props.xAxis.scale(endDatetimeScaling) - props.xAxis.scale(props.payload.startDatetime));
        let isHovered = props.payload.heatNo === hoveredHeatNo;

        return (
            <svg>
                <rect
                    x={props.cx}
                    y={props.cy + 6}
                    fill={props.payload.rectColor}
                    width={width}
                    height={17}
                    style={{
                        stroke: isHovered ? '#ea580c' : '#374151',
                        strokeWidth: isHovered ? 6 : 1,
                    }}
                />
                <text x={props.cx + (width / 2)} y={props.cy + 18}
                    fill={props.payload.textFill} fontSize={"10px"} letterSpacing={"1px"} fontWeight={700}
                    textAnchor={"middle"}
                >
                    {`${props.payload.heatNo.slice(-3)}`}
                </text>
            </svg>
        )
    }

    return (
        <Scatter
            data={scheduleArr}
            shape={renderCustomBar}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
        </Scatter>
    )
}