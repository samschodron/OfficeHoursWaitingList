import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateListPage = () => {
    const navigate = useNavigate();
    const [formInput, setFormInput] = useState({
        firstName: "",
        lastName: "",
        roomName: "",
        roomCode: ""
    })

    const handleFormInputChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        setFormInput({ ...formInput, [inputName]: inputValue })
    }

    const isEmpty = (str) => {
        return (!str || str.trim().length === 0);
    }

    const createWaitingListApi = () => {
        console.log('inside create list api')
        let url = `http://localhost:4000/waitingRoom/createWaitingRoom`
        return fetch(url, {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({
                teaching_assistant_first_name: formInput["firstName"],
                teaching_assistant_last_name: formInput["lastName"],
                waiting_room_name: formInput["roomName"]
            }),
        })
            .then(res => res.json())
            .then(data => {
                let uniqueRoomCode = data['room_code']
                console.log('room code', data['room_code'])
                setFormInput({ ...formInput, roomCode: uniqueRoomCode })
                console.log(formInput)
            })
    }

    const formIsValid = async () => {
        console.log('inside form is valid')
        for (const property in formInput) {
            if (isEmpty(formInput[property]) && property !== "roomCode") {
                console.log('form is not valid')
                return false;
            }
        }
        const response = await createWaitingListApi()
        console.log('response', response)
        navigate('/waiting-list', { state: formInput });
        return true;
    }

    return (
        <Box>
            <rect className="background-rect">
                <Typography className="join-header" variant="h1" component="h1" style={{ fontWeight: 'bold' }} gutterBottom>
                    Create a List
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
                <div className="textFieldW" style={{ marginLeft: '2rem' }}>
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
                    <Button variant="contained" className="shadow" sx={{
                        color: 'white', borderRadius: '30px', minWidth: '35%',
                        minHeight: '3rem', background: '#000000', '&:hover': { background: '#000000', opacity: 0.7, transition: '.2s' }
                    }}>
                        Join
                    </Button>
                </Box>
            </rect >
        </Box >
    );
};

export default CreateListPage;
