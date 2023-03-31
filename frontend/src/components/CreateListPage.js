import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const CreateListPage = () => {
    const [formInput, setFormInput] = useState({
        firstName: "",
        lastName: "",
        roomCode: ""
    })

    const handleFormInputChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        setFormInput({ ...formInput, [inputName]: inputValue })
    }

    const formValidation = () => {

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
                <Box className="button-join" onClick={formValidation}>
                    <Link to="/waiting-list" state={formInput} className="shadow" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" className="shadow" sx={{
                            color: 'white', borderRadius: '30px', minWidth: '35%',
                            minHeight: '3rem', background: '#000000', '&:hover': { background: '#000000', opacity: 0.7, transition: '.2s' }
                        }}>
                            Join
                        </Button>
                    </Link>
                </Box>
            </rect>
        </Box>
    );
};

export default CreateListPage;
