import axios from 'axios';
import { useState, useEffect } from "react";
import XAxis from '../components/axes/XAxis';


const baseURL = "http://localhost:3000/schedule";

export default function CurrentSchedule() {
    const [schedule, setSchedule] = useState([]);

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
        <>
            <XAxis />
        </>
    )
}