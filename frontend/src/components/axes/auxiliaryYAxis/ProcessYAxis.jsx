import { ScatterChart, YAxis } from 'recharts';


const renderCustomAxisTick = ({ x, y, payload }) => {
    let h = 0;
    let height = 0;
    let rectY = 0;
    let textX = 0;
    let textY = 0;

    switch (payload.value) {
        case 'CONV':
            h = 1;
            height = 88 * h;
            rectY = y - 26;
            textX = x + 15;
            textY = y + 22;
            break;
        case 'ARU':
            h = 1;
            height = 88 * h;
            rectY = (y - 26) + 24;
            textX = x + 23;
            textY = y + 45;
            break;
        case 'VAD':
            h = 0.33;
            height = 88 * h;
            rectY = (y - 26) + 48;
            textX = x + 25;
            textY = y + 44;
            break;
        case 'LF':
            h = 0.67;
            height = 88 * h;
            rectY = (y - 26) + 13;
            textX = x + 33;
            textY = y + 20;
            break;
        case 'RH':
            h = 0.67;
            height = 88 * h;
            rectY = (y - 26) + 8;
            textX = x + 30;
            textY = y + 17;
            break;
        case 'MC':
            h = 2;
            height = 88 * h;
            rectY = (y - 26) + 3;
            textX = x + 30;
            textY = y + 65;
            break;
    }

    return (
        <g>
            <rect
                x={x}
                y={rectY}
                fill="#f59e0b"
                width={90}
                height={height}
                style={{
                    stroke: "#451a03",
                    strokeWidth: 0.5,
                }}
            />
            <text x={textX} y={textY}
                fill="#fafafa" letterSpacing={"1px"} fontSize={"18px"} fontWeight={500}>
                {`${payload.value}`}
            </text>
        </g>
    )
}

export default function ProcessYAxis({ yTicks }) {
    return (
        <ScatterChart
            height={560}
            width={100}
            data={yTicks}
        >
            <YAxis
                width={10}
                dataKey={"stage"}
                type="category"
                reversed={true}
                axisLine={false}
                tickLine={false}
                tick={renderCustomAxisTick}
                interval={0}
                padding={{
                    top: 35,
                    bottom: 118
                }}
                label={{
                    value: "PROCESS",
                    position: "insideTopLeft",
                    fontSize: "18px",
                    fill: "#334155",
                    fontWeight: 700,
                    letterSpacing: "1px",
                }}
            />
        </ScatterChart>
    );
};
