import React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import { Typography } from '@mui/material';

import useAuth from '../contexts/AuthContextProvider';

function Header() {
    const { user } = useAuth()
    if (user) {
        return (
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit" component="div">
                        Logget inn som: {user.username}
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    } else {
        return (
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit" component="div">
                        Logget ut
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;
