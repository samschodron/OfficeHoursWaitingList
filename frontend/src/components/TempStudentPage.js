import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

const TempStudentPage = () => {
    const { state } = useLocation();
    const studentID = state.studentID;

    const navigate = useNavigate();

    const removeStudent = async (studentID) => {
        const user = auth.currentUser;
        const token = user && (await user.getIdToken());

        console.log(studentID);
        let url = `http://localhost:4000/student/leaveWaitingRoom`
        let response = fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                studentID_pk: studentID
            }),
        })
        navigate('/dashboard')
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

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" component="h4" className="waiting-room-code" style={{ fontWeight: 'bold' }}>
                        You are now in the waiting room.
            </Typography>
            <Button onClick={() => removeStudent(studentID)}>Leave Room</Button>
            <Box style={{ marginTop: '50px' }} onClick={() => navigate("/dashboard")}>
                <Button variant="contained" className="shadow" sx={{
                    color: 'white', borderRadius: '30px', minWidth: '35%',
                    minHeight: '3rem', background: 'black', '&:hover': { background: '#000000', opacity: 0.7, transition: '.2s' }
                }}>
                    Back to Dashboard
                </Button>
            </Box>
        </Container>
        
    )
}

export default TempStudentPage;