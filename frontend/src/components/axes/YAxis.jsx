import { YAxis } from 'recharts';


const process = [
  { stage: 'CONV', section: ['A', 'B', 'C'] },
  { stage: 'ARU', section: ['1', '2', '3'] },
  { stage: 'VAD', section: ['VD'] },
  { stage: 'LF', section: ['1', '2'] },
  { stage: 'RH', section: ['1', '2'] },
  { stage: 'MC', section: ['1', '2', '3', '4', '5', '6'] },
];

export default function CustomizedYAxis() {
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
      ticks={yTicks}
      tick={{
        fontSize: "13px"
      }}
      dataKey="current_process"
    />
  );
};


