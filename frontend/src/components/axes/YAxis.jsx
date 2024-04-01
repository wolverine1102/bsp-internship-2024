import { Label, YAxis } from 'recharts';


const process = [
  { stage: 'CONV', section: ['A', 'B', 'C'] },
  { stage: 'ARU', section: ['1', '2', '3'] },
  { stage: 'VAD', section: ['VD'] },
  { stage: 'LF', section: ['1', '2'] },
  { stage: 'RH', section: ['1', '2'] },
  { stage: 'MC', section: ['1', '2', '3', '4', '5', '6'] },
];

// const CustomizedAxisTicks = (({ x, y, payload }) => {
//   return (
//     <g transform={`translate(${x - 100},${y})`}>
//       <text orientation="left" width="90" height="112" stroke="none"
//         font-size="13px" letter-spacing="1px" font-weight="500"
//         x={0} y={0} textAnchor="end" fill="#666">
//         <tspan x="87" dy={18}>{payload.value}</tspan>
//       </text>
//     </g>
//   )
// });

export default function CustomizedYAxis({ key }) {
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
        fontSize: "13px",
        letterSpacing: "1px",
        fontWeight: 500,
        dy: 12
      }}
      interval={0}
      dataKey={key}
      allowDuplicatedCategory={false}
      padding={{
        bottom: 12
      }}
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
          letterSpacing: "1px"
        }}
      />
    </YAxis>
  );
};
