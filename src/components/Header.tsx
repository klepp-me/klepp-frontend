import React from 'react';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import { Typography } from '@mui/material';

interface HeaderProps { userName?: string }

export default class Header extends React.Component<HeaderProps> {
    constructor(props: HeaderProps) {
        super(props);
    }

    render() {
        return <AppBar position="static">
            <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                    Logget inn som: {this.props.userName}
                </Typography>
            </Toolbar>
        </AppBar>
    };
}
