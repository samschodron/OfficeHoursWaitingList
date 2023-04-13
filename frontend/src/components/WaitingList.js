import {
    AppBar,
    Avatar,
    Box,
    Button,
    IconButton,
    ListItemAvatar,
    ListItemSecondaryAction,
    TextField, Toolbar,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from "@mui/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Header from "./Header";
import logo from "../images/AOWL.png";
import { auth } from "../firebase"

const useStyles = makeStyles({
    container: {
        width: '100%',
        maxWidth: 600,
        margin: '0 auto',
        padding: '1rem',
    },
    title: {
        textAlign: 'center',
        fontSize: '2rem',
        fontWeight: 500,
        color: '#444',
        marginBottom: '1rem',
    },
});

const WaitingList = () => {
    const classes = useStyles();

    const navigate = useNavigate();
    const { state } = useLocation()
    const { firstName, lastName, roomName } = state.formInput
    const roomCode = state.roomCode

    const [studentList, setStudentList] = useState([])

    const updateList = async () => {

        const user = auth.currentUser;
        const token = user && (await user.getIdToken());
        console.log('getting all students in waiting list - token: ', token)

        if (roomCode) {
            let url = `http://localhost:4000/waitingRoom/getAllStudentsInWaitingRoom/?roomCode=${roomCode}`
            fetch(url, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(res => res.json())
                .then(data => {
                    let students = data["query_result"]
                    setStudentList(students)
                })
        }
    }


    const removeStudent = async (studentID) => {
        const user = auth.currentUser;
        const token = user && (await user.getIdToken());
        console.log('remove student - token: ', token)

        console.log(studentID);
        let url = `http://localhost:4000/student/leaveWaitingRoom`
        let response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                studentID_pk: studentID
            }),
        })
        console.log(response)
    }

    useEffect(() => {
        updateList()

        const interval = setInterval(() => {
            updateList();
        }, 2000);

        return () => clearInterval(interval);
    }, [roomCode, studentList]);

    return (
        <div className="waiting-list-view">
            <AppBar position="static">
                <Toolbar>
                    <img src={logo} alt="Logo" className="header-logo" />
                    <Typography variant="h4" component="h4" className="waiting-room-name" style={{ fontWeight: 'bold' }}>
                        {roomName}
                    </Typography>
                    <Typography variant="h4" component="h4" className="waiting-room-ta" style={{ fontWeight: 'bold' }}>
                        TA: {firstName} {lastName}
                    </Typography>
                </Toolbar>
            </AppBar>

            <div className={classes.container}>
                <Typography variant="h4" className={classes.title} style={{ color: 'black', fontWeight: 'bold' }}>
                    Waiting List
                </Typography>
                <List>
                    {studentList.map(item => (
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>{item["student_first_name"][0]}{item["student_last_name"][0]}</Avatar>
                            </ListItemAvatar>
                            <ListItemText>
                                {item["student_first_name"]} {item["student_last_name"]}
                            </ListItemText>
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="more">
                                    <MoreVertIcon />
                                </IconButton>
                                <Button onClick={() => removeStudent(item["studentID_pk"])}>Remove</Button>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </div>
            {/* TODO: give delete waiting list the functionality */}
            <Box style={{ marginTop: '50px' }} onClick={() => navigate("/")}>
                <Button variant="contained" className="shadow" sx={{
                    color: 'white', borderRadius: '30px', minWidth: '35%',
                    minHeight: '3rem', background: 'red', '&:hover': { background: '#000000', opacity: 0.7, transition: '.2s' }
                }}>
                    End Room
                </Button>
            </Box>

            <div className="room-code-container">
                <div className="room-code">Room Code: {roomCode}</div>
            </div>

        </div >
    )
}

export default WaitingList;