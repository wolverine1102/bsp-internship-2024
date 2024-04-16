import { Scatter } from 'recharts';


export default function Rect({ typeArr, rectColor }) {
    const renderCustomBar = (props) => {
        let width = props.xAxis.scale(props.payload.endDatetime) - props.xAxis.scale(props.payload.startDatetime);

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
                    fill='#fafafa' fontSize={"13px"} letterSpacing={"1px"} fontWeight={600}
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