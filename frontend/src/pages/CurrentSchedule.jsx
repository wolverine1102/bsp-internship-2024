import axios from 'axios';
import { useState, useEffect } from "react";
import ScheduleMonitor from '../components/ScheduleMonitor';
import CustomizedYAxis from '../assets/YAxis';


const baseURL = "http://localhost:3000/schedule";

export default function CurrentSchedule() {
    const [schedule, setSchedule] = useState([]);

    // You can set up an interval to fetch real-time updates if needed
    useEffect(() => {
        let ignore = false;

        axios.get(baseURL)
            .then((response) => {
                if (!ignore) {
                    setSchedule(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });

        return (() => {
            ignore = true;
        })
    }, []);

    const handleScroll = (e) => {
        let yAxis = document.getElementsByClassName("recharts-yAxis")[0];
        yAxis.style = "transform: translateX(" + e.target.scrollLeft + "px);";
    }

    return (
        <div className='flex flex-row mt-5 w-full h-screen gap-x-0.5'>
            <div className='w-[157px]'>
                <CustomizedYAxis />
            </div>
            <div className='overflow-x-auto'>
                <ScheduleMonitor
                    schedule={schedule}
                />
            </div>
        </div>
    )
}

