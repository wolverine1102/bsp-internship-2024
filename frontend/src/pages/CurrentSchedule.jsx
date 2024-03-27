import axios from 'axios';
import { useState, useEffect } from "react";
import ScheduleMonitor from '../components/ScheduleMonitor';


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

    return (
        <div className='container-lg mx-auto my-5 w-screen h-screen overflow-x-scroll'>
            <ScheduleMonitor
                schedule={schedule}
            />
        </div>
    )
}

