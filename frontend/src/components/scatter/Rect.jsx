import { Scatter } from 'recharts';


export default function Rect({ typeArr, rectColor }) {
    const renderCustomBar = (props) => {
        let endDatetimeScaling = new Date (props.payload.endDatetime + 5 * 60 * 1000).getTime(); // Add 5 mins to endDatetime
        let width = (props.xAxis.scale(endDatetimeScaling) - props.xAxis.scale(props.payload.startDatetime));

        return (
            <svg>
                <rect
                    x={props.cx}
                    y={props.cy + 5.5}
                    fill={rectColor}
                    width={width}
                    height={19}
                    style={{
                        stroke: "#9ca3af",
                        strokeWidth: 1,
                    }}
                />
                <text x={props.cx + (width / 2)} y={props.cy + 19}
                    fill='#fafafa' fontSize={"11px"} letterSpacing={"1px"} fontWeight={700}
                    textAnchor={"middle"}
                >
                    {`${props.payload.product.heatNo}`}
                </text>
            </svg>
        )
    }

    return (
        <Scatter
            data={typeArr}
            shape={renderCustomBar}
        >
        </Scatter>
    )
}