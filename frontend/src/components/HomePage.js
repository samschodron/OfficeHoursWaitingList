import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import homepageImage from '../images/Background.png';
import logo from '../images/AOWL.png';
import template from '../images/phonetemp.png';

const HomePage = () => {
    return (
        <Box className="image-container">
            {/*Background image*/}
            <img src={homepageImage} alt="Homepage" className="fullscreen-image" />

            <Container maxWidth="sm">
                <img src={logo} alt="Logo" className={"logo-image"} />
                <img src={template} alt="phone mockup" className={"mockup-image"} />

                <Box className="middle-left content">
                    <Typography variant="h3" component="h1" gutterBottom>
                        The Office Hour Waitlist for Teachers and Students.
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Create and join waitlists as educators and learners.
                    </Typography>

                    <Box className="button-home">
                        <Link to="/join-page" className="shadow" style={{ textDecoration: 'none' }}>
                            <Button variant="contained" className="shadow" sx={{
                                borderRadius: '30px', minWidth: '35%',
                                minHeight: '3rem', background: 'linear-gradient(to right, #BE50F2, #3888FF)', '&:hover': { opacity: 0.5, transition: '.2s' }
                            }}>
                                Join A List
                            </Button>
                        </Link>
                        <Link to="/create-list-page" className="" style={{ textDecoration: 'none' }}>
                            <Button color="buttWhite" variant="contained" className="shadow" sx={{ marginLeft: '2rem', borderRadius: '30px', minWidth: '35%', height: '3rem' }}>
                                Create A List
                            </Button>
                        </Link>
                    </Box>

                </Box>
            </Container>
        </Box>
    );
};

export default HomePage;
