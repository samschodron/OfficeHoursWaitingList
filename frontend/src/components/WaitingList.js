import React, { useEffect, useState } from 'react';

const WaitingList = () => {
    const [studentList, setStudentList] = useState([])
    const queryParams = {
        room_code_pk: "12345abcde"
    }

    const getData = () => {
        let url = `/waitingRoom/getAllStudentsInWaitingRoom/?roomCode=${queryParams["room_code_pk"]}`
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
            })
    }

    return (
        <div>
            <h1>Waiting List</h1>
            <button onClick={getData}>test api</button>
            {studentList.map(student => <h3>{student["student_first_name"]} {student["student_last_name"]}</h3>)}
        </div>
    )
}

export default WaitingList;