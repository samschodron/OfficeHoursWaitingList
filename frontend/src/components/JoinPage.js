import React from 'react';
import {Box, Button, TextField, Typography} from '@mui/material';

const JoinPage = () => {
    return (
        <Box>
            <rect className="background-rect">
                <Typography className="join-header" variant="h1" component="h1" style={{fontWeight: 'bold'}} gutterBottom>
                    Join a Room
                </Typography>
                <div className="textFieldW">
                    <TextField
                        label="Name"
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
                    />
                </div>
                <div className="textFieldW" style={{marginLeft: '2rem'}}>
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
                                    paddingLeft: '5.5%', // Adjust this value to move the input lower in the TextField
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