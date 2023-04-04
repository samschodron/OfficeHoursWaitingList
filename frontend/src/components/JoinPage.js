import React from 'react';
import {Box, Button, TextField, Typography} from '@mui/material';
import joinGraphic from '../images/join_graphic.jpg';
import smLogo from '../images/AOWL_SM.png';

const JoinPage = () => {
    return (
        <Box>
            <img src={joinGraphic} alt="Computer graphic" className="join-graphic" />
            <rect className="background-rect">
                <img src={smLogo} alt="Small logo" className="join-logo" />
                <Typography className="join-header" variant="h5" component="h5" style={{fontWeight: ''}} gutterBottom>
                    Join a Room
                </Typography>
                <div className="textFieldW" style={{marginRight: '1rem'}}>
                    <TextField
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
                            '& .MuiOutlinedInput-input': {
                                paddingLeft: '4%', // Adjust this value to move the input lower in the TextField
                            },
                        }}
                        InputProps={{
                            notched: false,
                        }}
                    />
                </div>
                <div className="textFieldW" style={{marginLeft: '1rem'}}>
                    <TextField
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
                            '& .MuiOutlinedInput-input': {
                                paddingLeft: '4%', // Adjust this value to move the input lower in the TextField
                            },
                        }}
                        InputProps={{
                            notched: false,
                        }}
                    />
                </div>
                <div className="textFieldW" style={{marginTop: '1rem', width:'85%'}}>
                        <TextField
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
                                    paddingLeft: '3%', // Adjust this value to move the input lower in the TextField
                                },
                            }}
                            InputProps={{
                                notched: false,
                            }}
                        />
                    </div>
                <Box className="button-join">
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
