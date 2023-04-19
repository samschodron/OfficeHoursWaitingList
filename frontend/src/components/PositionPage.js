import React from 'react';
import { Box, Button, Typography,Toolbar,AppBar } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../images/AOWL.png';
import { makeStyles } from "@mui/styles";
import Header from "./Header";
import { useLocation } from 'react-router-dom';

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
    const { state } = useLocation()
    const { firstName, lastName, roomCode } = state.formInput
    const roomName= state.roomName
    const taFirst= state.taFirst
    const taLast= state.taLast


    return (
        <Box>
            <AppBar position="static" sx={{ background: 'linear-gradient(to bottom, #BE50F2, #3888FF)' }}>
                <Toolbar>
                    <img src={logo} alt="Logo" className="header-logo" />
                    <Typography variant="h4" component="h4"  style={{ fontWeight: 'bold' }}>
                        {roomName}
                    </Typography>
                    <Typography variant="h4" component="h4" className="waiting-room-ta" style={{ fontWeight: 'bold' }}>
                        TA: {taFirst}{taFirst}
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
                <Box className="container">
                    <Link to="/dashboard" className="" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" className="button-leave" sx={{
                            color: 'white', borderRadius: '30px', minWidth: '15rem',
                            minHeight: '3rem', background: '#000000', '&:hover': { background: '#000000', opacity: 0.7, transition: '.2s' }
                        }}>Leave Room
                        </Button>
                    </Link>
                </Box>
            </Box>
                <Box display="flex" >
                    <Typography variant="h4"  className={classes.leftpart}>
                        &nbsp;<b>Name:{firstName} {lastName}</b>
                    </Typography>
                    <div className="room-code-container">
                        <div className="room-code"sx={{ background: 'linear-gradient(to bottom, #BE50F2, #3888FF)' }}>Room Code: {roomCode}</div>
                    </div>

                </Box>
                
            </Box> 
    );
}

export default PositionPage;

