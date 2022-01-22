import React from 'react';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'


import {
    Link
} from 'react-router-dom';
import { Typography } from '@mui/material';

type HeaderState = {
    isLoggedIn: Boolean
}

export default class Header extends React.Component<HeaderState> {
    state: HeaderState = {
        isLoggedIn: false
    };

    render() {
        return <AppBar position="static">
            <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                    Klepp
                </Typography>
            </Toolbar>
        </AppBar>
    };
}
