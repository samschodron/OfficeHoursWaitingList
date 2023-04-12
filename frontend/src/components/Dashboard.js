import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

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
        <div>
            <h1>Dashboard</h1>
            <h1>You are currenly signed in as: </h1>
            {auth.currentUser ? <h1>Email: {auth.currentUser.email}</h1> : <h1>Not signed in</h1>}

            <div>
                <Link to="/join-page" className="shadow" style={{ textDecoration: 'none' }}>
                    <Button>
                        Join A List
                    </Button>
                </Link>
                <Link to="/create-list-page" className="" style={{ textDecoration: 'none' }}>
                    <Button>
                        Create A List
                    </Button>
                </Link>

                <Button onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </div>
    )
}

export default Dashboard