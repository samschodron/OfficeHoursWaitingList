import React, { useEffect, useState } from 'react';

const WaitingList = () => {
    const [studentList, setStudentList] = useState([])
    const queryParams = {
        room_code_pk: "12345abcde"
    }

    const updateList = () => {
        console.log('inside get data func')
        let url = `http://localhost:31415/waitingRoom/getAllStudentsInWaitingRoom/?roomCode=${queryParams["room_code_pk"]}`
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
        const interval = setInterval(() => {
            updateList();
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>Waiting List</h1>
            <button onClick={updateList}>test api</button>
            <h1>List of students</h1>
            {studentList.map(student => <h3>{student["student_first_name"]} {student["student_last_name"]}</h3>)}
        </div>
    )
}

export default WaitingList;