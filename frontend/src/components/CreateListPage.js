import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import createGraphic from '../images/create-graphic.jpg';
import smLogo from '../images/AOWL_SM.png';
import { auth } from "../firebase"

const CreateListPage = () => {
    const navigate = useNavigate();
    const [formInput, setFormInput] = useState({
        firstName: "",
        lastName: "",
        roomName: "",
    })

    const handleFormInputChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        setFormInput({ ...formInput, [inputName]: inputValue })
    }

    const isEmpty = (str) => {
        return (!str || str.trim().length === 0);
    }

    const createWaitingListApi = async () => {
        const user = auth.currentUser;
        const token = user && (await user.getIdToken());
        console.log('create waiting list - token: ', token)

        let url = `http://localhost:4000/waitingRoom/createWaitingRoom`
        let response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                teaching_assistant_first_name: formInput["firstName"],
                teaching_assistant_last_name: formInput["lastName"],
                waiting_room_name: formInput["roomName"]
            }),
        })
        let jsonResponse = await response.json()
        let roomCode = jsonResponse["room_code"]

        return roomCode
    }

    const formIsValid = async () => {
        for (const property in formInput) {
            if (isEmpty(formInput[property]) && property !== "roomCode") {
                return false;
            }
        }
        const roomCode = await createWaitingListApi()
        navigate('/waiting-list', { state: { formInput: formInput, roomCode: roomCode } });
        return true;
    }

    return (
        <Box>
            <img src={createGraphic} alt="Computer graphic" className="create-graphic" />
            <rect className="background-rect">
                <img src={smLogo} alt="Small logo" className="create-logo" />
                <Typography className="create-header" variant="h5" component="h5" gutterBottom>
                    Create a List
                </Typography>
                <div className="textFieldW" style={{ marginLeft: '2rem' }}>
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
                                transform: 'translate(15%, .3%) scale(0.75)',
                            },
                        }}
                        InputProps={{
                            notched: false,
                        }}
                        onChange={handleFormInputChange}
                    />
                </div>
                <div className="textFieldW" style={{ marginLeft: '2rem' }}>
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
                                transform: 'translate(15%, .3%) scale(0.75)',
                            },
                        }}
                        InputProps={{
                            notched: false,
                        }}
                        onChange={handleFormInputChange}
                    />
                </div>
                <div className="textFieldW" style={{ marginLeft: '2rem', marginTop: '2rem', width: '85%' }}>
                    <TextField
                        name="roomName"
                        label="Room Name"
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
                    <Button variant="contained" className="shadow" sx={{
                        color: 'white', borderRadius: '30px', minWidth: '35%',
                        minHeight: '3rem', background: '#000000', '&:hover': { background: '#000000', opacity: 0.7, transition: '.2s' }
                    }}>
                        Create
                    </Button>
                </Box>
            </rect >
        </Box >
    );
};

export default CreateListPage;
