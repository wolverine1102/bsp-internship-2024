import { ScatterChart, YAxis } from 'recharts';


const process = [
    { stage: 'CONV', section: ['A', 'B', 'C'] },
    { stage: 'ARU', section: ['1', '2', '3'] },
    { stage: 'VAD', section: ['VD'] },
    { stage: 'LF', section: ['1', '2'] },
    { stage: 'RH', section: ['1', '2'] },
    { stage: 'MC', section: ['1', '2', '3', '4', '5', '6'] },
];

export default function AuxiliaryYAxis() {
    const yTicks = process.reduce((acc, current) => {
        const combinedSections = current.section.map(section => `${current.stage} ${section}`);
        acc.push(...combinedSections);
        return acc;
    }, []);

    return (
        <ScatterChart
            height={560}
            width={100}
        >
            <YAxis
                orientation="left"
                width={90}
                type="category"
                domain={yTicks}
                reversed={true}
                tick={{
                    fontSize: "14px",
                    letterSpacing: "1px",
                    fontWeight: 500,
                    fill: "#44403c",
                    dy: 12
                }}
                interval={0}
                allowDuplicatedCategory={false}
                label={{
                    value: "PROCESS",
                    position: "insideTopLeft",
                    fontSize: "18px",
                    fill: "#334155",
                    fontWeight: 780,
                    letterSpacing: "1px",
                    dx: -5
                }}
                padding={{
                    top: 33,
                    bottom: 12
                }}
            />
        </ScatterChart>
    );
};
