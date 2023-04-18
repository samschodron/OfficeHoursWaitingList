import React, {useEffect} from 'react';
import {onAuthStateChanged} from "firebase/auth";
import {signOut} from "firebase/auth";
import {auth} from '../firebase';
import {useNavigate} from 'react-router-dom';
import {Container, Typography, Box, Button, Grid} from '@mui/material';
import {Link} from 'react-router-dom';

const Dashboard = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/login");
            console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
        });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log("SIGNED IN - uid: ", uid)
            } else {
                console.log("LOGGED OUT")
            }
        });

    }, [])

    return (
        <Container maxWidth="lg">
            <Box mt={4}>
                <Typography variant="h3" sx={{fontWeight: "bold"}} gutterBottom>
                    Dashboard
                </Typography>

                <Typography variant="h5" gutterBottom>
                    You are currently signed in as:
                </Typography>

                {auth.currentUser ? (
                    <Typography variant="h6" gutterBottom>
                        <strong>Email:</strong> {auth.currentUser.email}
                    </Typography>
                ) : (
                    <Typography variant="h6" gutterBottom>
                        Not signed in
                    </Typography>
                )}

                <Grid container spacing={2} mt={2}>
                    <Grid item xs={12} sm={6}>
                        <Button
                            component={Link}
                            to="/join-page"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{fontSize: "30px", fontWeight: "bold", borderRadius: 1, paddingY: 20 }}
                        >
                            Join A List
                        </Button>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Button
                            component={Link}
                            to="/create-list-page"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{fontSize: "30px", fontWeight: "bold", borderRadius: 1, paddingY: 20 }}
                        >
                            Create A List
                        </Button>
                    </Grid>
                </Grid>

                <Box mt={2}>
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={handleLogout}
                        sx={{fontWeight: "bold", borderRadius: 1, paddingY: 2 }}
                    >
                        Logout
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Dashboard;