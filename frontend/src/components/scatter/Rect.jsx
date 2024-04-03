import { Scatter, LabelList } from 'recharts';


export default function Rect({ typeArr, rectColor }) {
    return (
        <Scatter
            data={typeArr}
            shape={(props) => {
                return (
                    <rect
                        x={props.cx}
                        y={props.cy + 6.5}
                        fill={rectColor}
                        width={
                            props.xAxis.scale(props.payload.end_datetime) -
                            props.xAxis.scale(props.payload.start_datetime)
                        }
                        height={17}
                        style={{
                            stroke: "#d6d3d1",
                            strokeWidth: 2,
                        }}
                    />
                );
            }}
        >
            <LabelList
                dataKey="product.id"
                position="center"
                dx={100}
                dy={15}
                fill='#f9fafb'
                style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    letterSpacing: "1px"
                }}
            />
        </Scatter>
    )
}