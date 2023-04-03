import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const WaitingList = () => {
    const { state } = useLocation()
    const { firstName, lastName, roomName } = state.formInput
    const roomCode = state.roomCode

    const [studentList, setStudentList] = useState([])

    const updateList = () => {
        if (roomCode) {
            let url = `http://localhost:4000/waitingRoom/getAllStudentsInWaitingRoom/?roomCode=${roomCode}`
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
    }

    useEffect(() => {
        updateList()

        const interval = setInterval(() => {
            updateList();
        }, 30000);

        return () => clearInterval(interval);
    }, [roomCode, studentList]);

    return (
        <div>
            <h1>Waiting List</h1>
            <button onClick={updateList}>call api</button>
            <h1>TA: {firstName} {lastName}</h1>
            <h1>Room name: {roomName}</h1>
            <h1>Room Code: {roomCode}</h1>
            {studentList.map(student => <h3>{student["student_first_name"]} {student["student_last_name"]}</h3>)}
        </div>
    )
}

export default WaitingList;