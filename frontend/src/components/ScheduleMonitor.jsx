import { ScatterChart, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useState } from "react";
import CustomizedXAxis from './axes/XAxis';
import CustomizedYAxis from './axes/YAxis';
import Rect from './scatter/Rect';


function processData(rawData) {
    let dataArr = rawData.map((p) => ({
        product: {
            id: p.product.id,
            type: p.product.type
        },
        current_process: `${p.current_process.name} ${p.current_process.section}`,
        start_datetime: new Date(p.start_datetime).valueOf(),
        end_datetime: new Date(p.end_datetime).valueOf()
    }))

    return dataArr;
}

export default function ScheduleMonitor({ schedule }) {
    // const [bloom, setBloom]= useState([]);
    // const [billet, setBillet] = useState([]);

    // processData(schedule).forEach(p => {
    //     p.product.type === 'billet' ? setBillet([...billet, p]) : setBloom([...bloom, p]);
    // });

    const processedSchedule = processData(schedule);

    const billet = processedSchedule.filter((p) => p.product.type === 'billet');
    const bloom = processedSchedule.filter((p) => p.product.type === 'bloom');

    return (
        <ResponsiveContainer width="100%" height="80%">
            <ScatterChart>
                <CartesianGrid
                    strokeDasharray="1 1"
                />
                {
                    CustomizedXAxis({
                        key: "start_datetime"
                    })
                }
                {
                    CustomizedYAxis({
                        key: "current_process"
                    })
                }
                {
                    Rect({
                        type: billet,
                        rectColor: "#155e75"
                    })
                }
                {
                    Rect({
                        type: bloom,
                        rectColor: "#fbbf24"
                    })
                }
            </ScatterChart>
        </ResponsiveContainer >
    )
}
