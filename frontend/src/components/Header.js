import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../images/AOWL.png";


const Header = (roomName, taFirst, taLast) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <img src={logo} alt="Logo" className="header-logo" />
                <h1 className="Waiting-room-name">Room name: {roomName}</h1>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
