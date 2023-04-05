import React, { useState } from 'react';
import {Box, Button, TextField, Typography} from '@mui/material';
import joinGraphic from '../images/join_graphic.jpg';
import smLogo from '../images/AOWL_SM.png';
import { useNavigate } from 'react-router-dom';

const JoinPage = () => {
    const navigate = useNavigate();
    const [formInput, setFormInput] = useState({
        firstName: "",
        lastName: "",
        roomCode: "",
    })

    const handleFormInputChange = (event) => {
        setFormInput({ ...formInput, [event.target.name]: event.target.value })
    }

    const isEmpty = (str) => {
        return (!str || str.trim().length === 0);
    }

    const joinWaitingListApi = async () => {
        let url = `http://localhost:4000/student/joinWaitingRoom`
        let response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({
                student_first_name: formInput["firstName"],
                student_last_name: formInput["lastName"],
                room_code: formInput["roomCode"]
            }),
        })
        let jsonResponse = await response.json()
        let studentID = jsonResponse["studentID_pk"]

        // return studentID
    }

    const formIsValid = async () => {
        for (const property in formInput) {
            if (isEmpty(formInput[property]) && property !== "studentID") {
                return false;
            }
        }
        // const studentID = await joinWaitingListApi()
        await joinWaitingListApi()
        navigate('/join-list', { state: { formInput: formInput/*, studentID: studentID*/ } });
        return true;
    }

    return (
        <Box>
            <img src={joinGraphic} alt="Computer graphic" className="join-graphic" />
            <rect className="background-rect">
                <img src={smLogo} alt="Small logo" className="join-logo" />
                <Typography className="join-header" variant="h5" component="h5" gutterBottom>Join a Room</Typography>
                <div className="textFieldW" style={{marginRight: '1rem'}}>
                    <TextField
                        name="firstName"
                        label="First Name"
                        variant="outlined"
                        value={formInput.firstName}
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '15px',
                            },
                            '& .MuiInputLabel-shrink': {
                                transform: 'translate(15%, .3%) scale(0.75)',
                            },
                            '& .MuiOutlinedInput-input': {
                                paddingLeft: '4%', // Adjust this value to move the input lower in the TextField
                            },
                        }}
                        InputProps={{
                            notched: false,
                        }}
                        onChange={handleFormInputChange}
                    />
                </div>
                <div className="textFieldW" style={{marginLeft: '1rem'}}>
                    <TextField
                        name="lastName"
                        label="Last Name"
                        variant="outlined"
                        value={formInput.lastName}
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '15px',
                            },
                            '& .MuiInputLabel-shrink': {
                                transform: 'translate(15%, .3%) scale(0.75)',
                            },
                            '& .MuiOutlinedInput-input': {
                            paddingLeft: '4%', // Adjust this value to move the input lower in the TextField
                            },
                        }}
                        InputProps={{
                            notched: false,
                        }}
                        onChange={handleFormInputChange}
                    />
                </div>
                <div className="textFieldW" style={{marginTop: '1rem', width:'85%'}}>
                        <TextField
                            name="roomCode"
                            label="Room Code"
                            variant="outlined"
                            value={formInput.roomCode}
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '15px',
                                },
                                '& .MuiInputLabel-shrink': {
                                    transform: 'translate(20%, .3%) scale(0.75)',
                                },
                                '& .MuiOutlinedInput-input': {
                                    paddingLeft: '3%', // Adjust this value to move the input lower in the TextField
                                },
                            }}
                            InputProps={{
                                notched: false,
                            }}
                            onChange={handleFormInputChange}
                        />
                    </div>
                <Box onClick={formIsValid} className="button-join">
                    <Button variant="contained" className="shadow" sx={{ color: 'white', borderRadius: '30px', minWidth: '35%',
                        minHeight: '3rem', background: '#000000', '&:hover': {background: '#000000', opacity: 0.7, transition: '.2s'}}}>
                        Join
                    </Button>
                </Box>
            </rect>
        </Box>
    );
};

export default JoinPage;
