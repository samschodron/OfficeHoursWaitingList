import React, { useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

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

            <div>
                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Dashboard