import { Scatter, LabelList } from 'recharts';


export default function Rect({ typeArr, rectColor }) {
    return (
        <Scatter
            data={typeArr}
            shape={(props) => {
                return (
                    <rect
                        x={props.cx}
                        y={props.cy + 5.5}
                        fill={rectColor}
                        width={
                            props.xAxis.scale(props.payload.endDatetime) -
                            props.xAxis.scale(props.payload.startDatetime)
                        }
                        height={19}
                        style={{
                            stroke: "#d6d3d1",
                            strokeWidth: 1,
                        }}
                    />
                );
            }}
        >
            <LabelList
                dataKey="product.heatNo"
                position="center"
                dx={85}
                dy={15}
                fill='#f9fafb'
                style={{
                    fontSize: "13px",
                    letterSpacing: "1px",
                }}
            />
        </Scatter>
    )
}