import axios from 'axios';
import { useState, useEffect } from "react";
import ScheduleMonitor from '../components/ScheduleMonitor';
import AuxiliaryYAxis from '../components/axes/AuxiliaryYAxis';


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
        <div className='flex flex-row mt-6 w-full h-screen'>
            <div className='shrink'>
                <AuxiliaryYAxis />
            </div>
            <div className='overflow-x-auto shrink'>
                <ScheduleMonitor
                    schedule={schedule}
                />
            </div>
        </div>
    )
}

