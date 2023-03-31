import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const WaitingList = () => {
    const location = useLocation()
    const { firstName, lastName, roomCode } = location.state
    const [studentList, setStudentList] = useState([])

    // can test with roomCode: 12345abcde
    const updateList = () => {
        let url = `http://localhost:31415/waitingRoom/getAllStudentsInWaitingRoom/?roomCode=${roomCode}`
        fetch(url, {
            method: "GET",
            headers: {
                'Content-type': "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                let students = data["query_result"]
                setStudentList(students)
                console.log(data)
            })
    }

    useEffect(() => {
        updateList()

        const interval = setInterval(() => {
            updateList();
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>Waiting List</h1>
            <button onClick={updateList}>call api</button>
            <h1>{firstName} {lastName}'s Waiting List</h1>
            <h1>Room Code: {roomCode}</h1>
            {studentList.map(student => <h3>{student["student_first_name"]} {student["student_last_name"]}</h3>)}
        </div>
    )
}

export default WaitingList;