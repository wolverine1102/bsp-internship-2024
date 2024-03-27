import { BarChart, Bar, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CustomizedXAxis from './axes/XAxis';
import CustomizedYAxis from './axes/YAxis';


function processData(rawData) {

}

export default function ScheduleMonitor({ schedule }) {
    const data = [
        {
            "product": {
                "id": 123,
                "type": "billet"
            },
            "current_process": "CONV A",

            "duration": [new Date("2024-03-27T08:30"), new Date("2024-03-27T15:45")]
        },
        {
            "product": {
                "id": 456,
                "type": "bloom"
            },
            "current_process": "ARU 2",

            "duration": [new Date("2024-03-27T11:15"), new Date("2024-03-27T18:30")]
        },
        {
            "product": {
                "id": 111,
                "type": "billet"
            },
            "current_process": "CONV A",

            "duration": [new Date("2024-03-28T02:15"), new Date("2024-03-28T09:30")]
        }
    ]

    return (
        <ResponsiveContainer width="100%" height="60%">
            <BarChart
                data={data}
                layout="vertical"
            >
                <CartesianGrid
                    strokeDasharray="1 1"
                   
                />
                {
                    CustomizedXAxis()
                }
                {
                    CustomizedYAxis()
                }
                <Bar
                    dataKey="duration"
                    barSize={35}
                />
            </BarChart>
        </ResponsiveContainer>
    )
}
