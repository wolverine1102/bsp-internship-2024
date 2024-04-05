import { Label, YAxis } from 'recharts';


const process = [
  { stage: 'CONV', section: ['A', 'B', 'C'] },
  { stage: 'ARU', section: ['1', '2', '3'] },
  { stage: 'VAD', section: ['VD'] },
  { stage: 'LF', section: ['1', '2'] },
  { stage: 'RH', section: ['1', '2'] },
  { stage: 'MC', section: ['1', '2', '3', '4', '5', '6'] },
];

export default function PrimaryYAxis({ key }) {
  const yTicks = process.reduce((acc, current) => {
    const combinedSections = current.section.map(section => `${current.stage} ${section}`);
    acc.push(...combinedSections);
    return acc;
  }, []);

  return (
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
        dy: 12,
        fill: "#44403c",
      }}
      interval={0}
      dataKey={key}
      allowDuplicatedCategory={false}
      padding={{
        bottom: 12
      }}
      hide={true}
    >
      <Label
        value={"PROCESS"}
        position={"insideTopLeft"}
        dx={2}
        dy={-27}
        style={{
          fontSize: "15px",
          fill: "#334155",
          fontWeight: 780,
          letterSpacing: "1px",
        }}
      />
    </YAxis>
  );
};
