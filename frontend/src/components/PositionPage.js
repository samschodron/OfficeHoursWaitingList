import React from 'react';
import { Box, Button, Typography,Toolbar,AppBar } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../images/AOWL.png';
import { makeStyles } from "@mui/styles";
import Header from "./Header";
import { useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
    title: {
        textAlign: 'center',
        fontSize: '4rem',
        fontWeight: 500,
        color: '#444',
        marginBottom: '1rem',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '82vh',
    },
    upperSection: {
        background: 'linear-gradient(to bottom, #BE50F2, #3888FF)',
        width: '100%',
    },
    leftpart: {
        alignItems: 'left',
    },

});

const PositionPage = () =>{
    const classes = useStyles();
    const navigate = useNavigate();
    const { state } = useLocation()
    const { firstName, lastName } = state.formInput
    const roomCode= state.roomCode;
    const studentID = state.studentID;

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


    return (
        <Box>
            <AppBar position="static" sx={{ background: 'linear-gradient(to bottom, #BE50F2, #3888FF)' }}>
                <Toolbar>
                    <img src={logo} alt="Logo" className="header-logo" />
                    <Typography variant="h4" component="h4"  style={{ fontWeight: 'bold' }}>
                        
                    </Typography>
                    <Typography variant="h4" component="h4" className="waiting-room-ta" style={{ fontWeight: 'bold' }}>
                        TA: 
                    </Typography>
                </Toolbar>
                </AppBar>


            <Box className={classes.container}>     
                <div className={classes.title}>
                    <Typography  variant="h3">
                        <b>Your Position</b>
                    </Typography>     
                    <Typography  fontSize={200}>
                        <b>3</b>
                    </Typography>            
                </div>
            <Box style={{ marginTop: '50px' }} onClick={() => navigate("/dashboard")}>
                <Button onClick={() => removeStudent(studentID)} variant="contained" className="shadow" sx={{
                    color: 'white', borderRadius: '30px', minWidth: '35%',
                    minHeight: '3rem', background: 'red', '&:hover': { background: '#000000', opacity: 0.7, transition: '.2s' }
                }}>
                    Leave Room
                </Button>
            </Box>
            <Box style={{ marginTop: '50px' }} onClick={() => navigate("/dashboard")}>
                <Button variant="contained" className="shadow" sx={{
                    color: 'white', borderRadius: '30px', minWidth: '35%',
                    minHeight: '3rem', background: 'black', '&:hover': { background: '#000000', opacity: 0.7, transition: '.2s' }
                }}>
                    Back to Dashboard
                </Button>
            </Box>
            </Box>
                <Box display="flex" >
                    <Typography variant="h4"  className={classes.leftpart}>
                        &nbsp;<b>Name: {firstName} {lastName}</b>
                    </Typography>
                    <div className="room-code-container">
                        <div className="room-code"sx={{ background: 'linear-gradient(to bottom, #BE50F2, #3888FF)' }}>Room Code: {roomCode}</div>
                    </div>
                </Box>
                
            </Box> 
    );
}

export default PositionPage;

