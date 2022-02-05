import React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import { Box, Button, Typography } from '@mui/material';

import useAuth from '../contexts/AuthContextProvider';
import { useNavigate } from 'react-router-dom';

function Header() {
    const { user, signOut } = useAuth()

    function navigateToLogin() {
        navigate('/login', { replace: false });
    }

    const navigate = useNavigate();
    if (user) {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" elevation={4}>
                    <Toolbar variant="regular">
                        <Typography variant="h6" color="inherit" component="div" sx={{  textAlign: 'left', flexGrow: 1 }}>
                            Klepp
                        </Typography>
                        <Typography variant="h6" color="inherit" component="div" noWrap sx={{ display: { xs: 'none', sm: 'block' }, mr: 2 }}>
                            Logget inn som: {user.username}
                        </Typography>
                        {user ? <Button onClick={signOut} color={'inherit'} variant="contained">Logg ut</Button> : <Button onClick={navigateToLogin} color={'inherit'}>Logg inn</Button>}
                    </Toolbar>
                </AppBar>
            </Box >
        );
    } else {
        return (
            <AppBar position="static" elevation={4}>
                <Toolbar variant="regular">
                    <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
                        Klepp
                    </Typography>
                    <Typography variant="h6" color="inherit" component="div">
                        Logget ut
                    </Typography>
                    {user ? <Button onClick={signOut} color={'inherit'} variant="outlined">Logg ut</Button> : <Button onClick={navigateToLogin} color={'inherit'}>Logg inn</Button>}
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;
