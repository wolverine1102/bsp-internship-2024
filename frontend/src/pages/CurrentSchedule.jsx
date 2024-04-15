import axios from 'axios';
import { useState, useEffect } from "react";
import ScheduleMonitor from '../components/ScheduleMonitor';
import AuxiliaryYAxis from '../components/axes/AuxiliaryYAxis';


const baseURL = "http://127.0.0.1:8000/schedule/";  

export default function CurrentSchedule() {
    const [schedule, setSchedule] = useState([]);

    // You can set up an interval to fetch real-time updates if needed
    useEffect(() => {    
        const fetchData = async () => {
            try {
                const response = await axios.get(baseURL);
                setSchedule(response.data);
            }
            catch (error) {
                alert('Internal Server Error')
                console.log(error);
            }
        }

        fetchData();

        // Set up an interval to fetch data every 5 minutes
        const intervalId = setInterval(fetchData, 300000); 

        return (() => {
            clearInterval(intervalId);
        })

    }, []);
    
    return (
        <div className='flex flex-row mt-6 w-full h-full'>
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

