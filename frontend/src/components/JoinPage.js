import React, { useState } from 'react';
import {Box, Button, TextField, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const JoinPage = () => {
    const navigate = useNavigate();
    const [formInput, setFormInput] = useState({
        firstName: "",
        lastName: "",
        roomCode: "",
    })

    const handleFormInputChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        setFormInput({ ...formInput, [inputName]: inputValue })
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

        return studentID
    }

    const formIsValid = async () => {
        for (const property in formInput) {
            if (isEmpty(formInput[property]) && property !== "studentID") {
                return false;
            }
        }
        const studentID = await joinWaitingListApi()
        navigate('/join-list', { state: { formInput: formInput, studentID: studentID } });
        return true;
    }

    return (
        <Box>
            <rect className="background-rect">
                <Typography className="join-header" variant="h1" component="h1" style={{fontWeight: 'bold'}} gutterBottom>
                    Join a Room
                </Typography>
                <div className="textFieldW">
                    <TextField
                        name="firstName"
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '15px',
                            },
                            '& .MuiInputLabel-shrink': {
                                transform: 'translate(35%, .3%) scale(0.75)',
                            },
                        }}
                        InputProps={{
                            notched: false,
                        }}
                        onChange={handleFormInputChange}
                    />
                </div>
                <div className="textFieldW">
                    <TextField
                        name="lastName"
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '15px',
                            },
                            '& .MuiInputLabel-shrink': {
                                transform: 'translate(35%, .3%) scale(0.75)',
                            },
                        }}
                        InputProps={{
                            notched: false,
                        }}
                        onChange={handleFormInputChange}
                    />
                </div>
                <div className="textFieldW" style={{marginLeft: '2rem'}}>
                        <TextField
                            name="roomCode"
                            label="Room Code"
                            variant="outlined"
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '15px',
                                },
                                '& .MuiInputLabel-shrink': {
                                    transform: 'translate(20%, .3%) scale(0.75)',
                                },
                                '& .MuiOutlinedInput-input': {
                                    paddingLeft: '5.5%', // Adjust this value to move the input lower in the TextField
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
