import { ScatterChart, YAxis } from 'recharts';


export default function SectionYAxis({ yTicks }) {
    return (
        <ScatterChart
            height={560}
            width={55}
        >
            <YAxis
                orientation="left"
                width={50}
                type="category"
                domain={yTicks}
                tickFormatter={(tick) => `${tick.section}`}
                reversed={true}
                tick={{
                    fontSize: "14px",
                    letterSpacing: "1px",
                    fontWeight: 700,
                    fill: "#44403c",
                    dy: 12
                }}
                interval={0}
                padding={{
                    top: 30,
                    bottom: 12
                }}
                tickMargin={5}
            />
        </ScatterChart>
    );
};
