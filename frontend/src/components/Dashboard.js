import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {

    const navigate = useNavigate();
    const [openWaitingLists, setOpenWaitingLists] = useState([])
    const [joinedWaitingLists, setJoinedWaitingLists] = useState([])

    const getAllOpenWaitingLists = async () => {
        const user = auth.currentUser;
        const token = user && (await user.getIdToken());

        let url = `http://localhost:4000/dashboard/get-all-open-waiting-lists`
        fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                let openWaitingLists = data["query_result"]
                setOpenWaitingLists(openWaitingLists)
                console.log('all waiting lists: ', openWaitingLists)
            })
    }
    
    const getAllJoinedWaitingLists = async () => {
        const user = auth.currentUser;
        const token = user && (await user.getIdToken());

        let url = `http://localhost:4000/dashboard/getAllJoinedWaitingRooms`
        fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                let joinedWaitingLists = data["query_result"]
                setJoinedWaitingLists(joinedWaitingLists)
                console.log(joinedWaitingLists)
                console.log('all joined lists: ', openWaitingLists)
            })
    }

    useEffect(() => {
        getAllJoinedWaitingLists()

        const interval = setInterval(() => {
            getAllJoinedWaitingLists();
        }, 5000);

        return () => clearInterval(interval);
    }, [joinedWaitingLists])

    useEffect(() => {
        getAllOpenWaitingLists()

        const interval = setInterval(() => {
            getAllOpenWaitingLists();
        }, 5000);

        return () => clearInterval(interval);
    }, [openWaitingLists])

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/login");
            console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
        });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log("SIGNED IN - uid: ", uid)
            } else {
                console.log("LOGGED OUT")
            }
        });

    }, [])

    const navigateToWaitingListPage = (firstName, lastName, roomName, roomCode) => {
        let formInput = {
            firstName: firstName,
            lastName: lastName,
            roomName: roomName
        }
        navigate('/waiting-list', { state: { formInput: formInput, roomCode: roomCode } })
    }

    const navigateToJoinedListPage = (firstName, lastName, studentID) => {
        let formInput = {
            firstName: firstName,
            lastName: lastName
        }
        navigate('/student-view', { state: { formInput: formInput, studentID: studentID} });
    }

    return (
        <Container maxWidth="lg">
            <Box mt={4}>
                <Typography variant="h3" sx={{ fontWeight: "bold" }} gutterBottom>
                    Dashboard
                </Typography>

                <Typography variant="h5" gutterBottom>
                    You are currently signed in as:
                </Typography>

                {auth.currentUser ? (
                    <Typography variant="h6" gutterBottom>
                        <strong>Email:</strong> {auth.currentUser.email}
                    </Typography>
                ) : (
                    <Typography variant="h6" gutterBottom>
                        Not signed in
                    </Typography>
                )}

                <Grid container spacing={2} mt={2}>
                    <Grid item xs={12} sm={6}>
                        <Button
                            component={Link}
                            to="/join-page"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ fontSize: "30px", fontWeight: "bold", borderRadius: 1, paddingY: 20 }}
                        >
                            Join A List
                        </Button>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Button
                            component={Link}
                            to="/create-list-page"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ fontSize: "30px", fontWeight: "bold", borderRadius: 1, paddingY: 20 }}
                        >
                            Create A List
                        </Button>
                    </Grid>
                </Grid>

                <Box mt={2}>
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={handleLogout}
                        sx={{ fontWeight: "bold", borderRadius: 1, paddingY: 2 }}
                    >
                        Logout
                    </Button>
                </Box>
            </Box>
            <Typography variant="h3">All open waiting lists:</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                <Typography variant="h5" gutterBottom >
                    {openWaitingLists.map(waitingList => {
                        let firstName = waitingList["teaching_assistant_first_name"]
                        let lastName = waitingList["teaching_assistant_last_name"]
                        let roomName = waitingList["waiting_room_name"]
                        let roomCode = waitingList["room_code_pk"]

                        return (
                            <Box sx={{ border: '3px solid black', margin: '5px', borderRadius: '10px', minWidth: '600px' }}>
                                <h3>TA name: {firstName} {lastName}</h3>
                                <h3>room name: {roomName}</h3>
                                <h3>room code: {roomCode}</h3>
                                <Box onClick={() => navigateToWaitingListPage(firstName, lastName, roomName, roomCode)}
                                >
                                    <Button variant="contained" className="shadow" sx={{
                                        color: 'white', borderRadius: '30px', minWidth: '35%',
                                        minHeight: '3rem', background: 'primary', '&:hover': { background: '#000000', opacity: 0.7, transition: '.2s' }
                                    }}>
                                        Enter this waitlist
                                    </Button>
                                </Box>
                            </Box>)
                    })}
                </Typography>
            </Box>
            <Typography variant="h3">All joined waiting lists:</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                <Typography variant="h5" gutterBottom >
                    {joinedWaitingLists.map(joinedList => {
                        let firstName = joinedList["student_first_name"]
                        let lastName = joinedList["student_last_name"]
                        let roomCode = joinedList["room_code_pk"]
                        let studentID = joinedList["studentID_pk"]

                        return (
                            <Box sx={{ border: '3px solid black', margin: '5px', borderRadius: '10px', minWidth: '600px' }}>
                                <h3>Your name: {firstName} {lastName}</h3>
                                <h3>room code: {roomCode}</h3>
                                <Box onClick={() => navigateToJoinedListPage(firstName, lastName, studentID)}
                                >
                                    <Button variant="contained" className="shadow" sx={{
                                        color: 'white', borderRadius: '30px', minWidth: '35%',
                                        minHeight: '3rem', background: 'primary', '&:hover': { background: '#000000', opacity: 0.7, transition: '.2s' }
                                    }}>
                                        Enter this waitlist
                                    </Button>
                                </Box>
                            </Box>)
                    })}
                </Typography>
            </Box>
        </Container >
    );
};

export default Dashboard;