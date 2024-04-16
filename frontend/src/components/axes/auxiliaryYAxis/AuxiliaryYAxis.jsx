import ProcessYAxis from "./ProcessYAxis";
import SectionYAxis from "./SectionYAxis";


const process = [
    { stage: 'CONV', section: ['A', 'B', 'C'] },
    { stage: 'ARU', section: ['1', '2', '3'] },
    { stage: 'VAD', section: ['VD'] },
    { stage: 'LF', section: ['1', '2'] },
    { stage: 'RH', section: ['1', '2'] },
    { stage: 'MC', section: ['1', '2', '3', '4', '5', '6'] },
];

const yTicks = process.reduce((acc, current) => {
    const combinedSections = current.section.map(section => {
        return ({
            stage: current.stage,
            section: section
        })
    });
    acc.push(...combinedSections);
    return acc;
}, []);

export default function AuxiliaryYAxis() {
    return (
        <div className='flex flex-row full h-full'>
            <ProcessYAxis yTicks={yTicks} />
            <SectionYAxis yTicks={yTicks} />
        </div>
    )
}