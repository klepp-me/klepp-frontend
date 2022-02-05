import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Box, IconButton, Typography } from '@mui/material';
import useAuth from '../contexts/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import { LoginOutlined, LogoutOutlined } from '@mui/icons-material';
import HideOnScroll from './utils/HideOnScroll';

function Header() {
    const { user, signOut } = useAuth()

    function navigateToLogin() {
        navigate('/login', { replace: false });
    }

    const navigate = useNavigate();
    if (user) {
        return (
            <Box sx={{ flexGrow: 1 }} >
                <HideOnScroll>
                    <AppBar position="fixed" elevation={4}>
                        <Toolbar variant="regular">
                            <Typography variant="h6" color="inherit" component="div" sx={{ textAlign: 'left', flexGrow: 1 }}>
                                Klepp
                            </Typography>
                            <Typography variant="h6" color="inherit" component="div" noWrap sx={{ display: { xs: 'none', sm: 'block' }, mr: 2 }}>
                                {user.username}
                            </Typography>
                            <LogoutOutlined onClick={signOut} color="secondary" sx={{ "&:hover": { 'color': '#39796b', 'cursor': 'pointer' } }} />
                        </Toolbar>
                    </AppBar>
                </HideOnScroll>
                <Toolbar sx={{ background: '#ffffff00' }} />
            </Box >
        );
    } else {
        return (
            <Box sx={{ flexGrow: 1 }} >
                <HideOnScroll>
                    <AppBar position="fixed" elevation={4}>
                        <Toolbar variant="regular">
                            <Typography variant="h6" color="inherit" component="div" sx={{ textAlign: 'left', flexGrow: 1 }}>
                                Klepp
                            </Typography>
                            <IconButton onClick={navigateToLogin} color="secondary" sx={{ "&:hover": { 'color': '#39796b', 'cursor': 'pointer' } }}> <LoginOutlined />
                                <Typography variant="h6" color="inherit" component="div" sx={{ textAlign: 'left', flexGrow: 1, ml: 1 }}>
                                    Logg inn
                                </Typography>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </HideOnScroll>
                <Toolbar sx={{ background: '#ffffff00' }} />
            </Box>
        );
    }
}

export default Header;
