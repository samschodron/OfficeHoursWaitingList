import React, {useState} from 'react';
import {Box, Button, TextField, Typography, Grid} from '@mui/material';
import joinGraphic from '../images/join_graphic.jpg';
import {useNavigate} from 'react-router-dom';
import {auth} from "../firebase"
import logo from "../images/AOWL.png";

const JoinPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('')
    const [studentID, setStudentID] = useState([])
    const [formInput, setFormInput] = useState({
        firstName: "",
        lastName: "",
        roomCode: "",
    })

    const handleFormInputChange = (event) => {
        setFormInput({...formInput, [event.target.name]: event.target.value})
    }

    const isEmpty = (str) => {
        return (!str || str.trim().length === 0);
    }

    const joinWaitingListApi = async () => {
        const user = auth.currentUser;
        const token = user && (await user.getIdToken());

        let url = `http://localhost:4000/student/joinWaitingRoom`
        let response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                student_first_name: formInput["firstName"].trim(),
                student_last_name: formInput["lastName"].trim(),
                room_code: formInput["roomCode"].trim()
            }),
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                setStudentID(data)
            })
    }

    const formIsValid = async () => {
        for (const property in formInput) {
            if (isEmpty(formInput[property]) && property !== "studentID") {
                return false;
            }
            if (hasWhiteSpace(formInput[property].trim())) {
                setError('Error: Input cannot contain whitespace')
                return false;
            }
        }
        joinWaitingListApi();
        console.log(studentID);
        navigate('/student-view', {state: {formInput: formInput, studentID: studentID}});
        return true;
    }

    const hasWhiteSpace = (s) => {
        return /\s/g.test(s);
    };

    return (
        <Grid container>
            <Grid item xs={12} sm={6}>
                <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
                    <img src={joinGraphic} alt="Computer graphic" style={{maxWidth: '90%', maxHeight: '90%'}}/>
                </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundImage: 'linear-gradient(to bottom, #7b50f2, #b792de)', // Add the gradient background here
            }}>
                <Box height="100vh" bgcolor="gradient.linear(to-r, #2D7DD2, #0FA3B1)" display="flex"
                     flexDirection="column" justifyContent="center" alignItems="center">
                    <img src={logo} alt="Logo" className={"join-logo"} />
                    <Box
                        sx={{
                            background: 'white',
                            borderRadius: 2,
                            width: '180%',
                            padding: 5,
                            boxShadow: 3,
                        }}
                    >
                        <Typography variant="h4" component="h4" gutterBottom sx={{fontWeight: 'bold', color: 'black', marginBottom: '2rem', textAlign: 'left'}}>
                            Join a Room
                        </Typography>
                        <TextField
                            name="firstName"
                            label="First Name"
                            variant="outlined"
                            value={formInput.firstName}
                            fullWidth
                            onChange={handleFormInputChange}
                        />
                        <Box mt={2}>
                            <TextField
                                name="lastName"
                                label="Last Name"
                                variant="outlined"
                                value={formInput.lastName}
                                fullWidth
                                onChange={handleFormInputChange}
                            />
                        </Box>
                        <Box mt={2}>
                            <TextField
                                name="roomCode"
                                label="Room Code"
                                variant="outlined"
                                value={formInput.roomCode}
                                fullWidth
                                onChange={handleFormInputChange}
                            />
                        </Box>
                        <Button onClick={formIsValid} variant="contained" sx={{
                            marginTop: '20px',
                            color: 'white',
                            borderRadius: '30px',
                            minWidth: '100%',
                            minHeight: '3rem',
                            background: '#000000',
                            '&:hover': {background: '#000000', opacity: 0.7, transition: '.2s'}
                        }}>
                            Join
                        </Button>
                    </Box>
                    <Box width="80%" mb={2}>
                        {error && <Typography color="error">{error}</Typography>}
                    </Box>

                </Box>
            </Grid>
        </Grid>
    );
};

export default JoinPage;

