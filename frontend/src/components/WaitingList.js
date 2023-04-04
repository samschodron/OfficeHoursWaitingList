import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

const WaitingList = () => {
    const navigate = useNavigate();
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
        <div className="waiting-list-view">
            <h1>Room name: {roomName}</h1>
            <h1>TA: {firstName} {lastName}</h1>
            <h1>Room Code: {roomCode}</h1>
            <h1>Waiting List</h1>
            {studentList.length === 0 ? <Typography>waiting for students to join...</Typography> :
                <List className="waiting-list-names-container">
                    {studentList.map(student =>
                        <ListItem className="waiting-list-item">
                            <ListItemText>{student["student_first_name"]} {student["student_last_name"]}</ListItemText>
                        </ListItem>
                    )}
                </List>
            }
            {/* TODO: give delete waiting list the functionality */}
            <Box style={{ marginTop: '50px' }} onClick={() => navigate("/")}>
                <Button variant="contained" className="shadow" sx={{
                    color: 'white', borderRadius: '30px', minWidth: '35%',
                    minHeight: '3rem', background: 'red', '&:hover': { background: '#000000', opacity: 0.7, transition: '.2s' }
                }}>
                    delete waiting list
                </Button>
            </Box>
        </div >
    )
}

export default WaitingList;