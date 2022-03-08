import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import useAuth from '../contexts/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import { LoginOutlined, LogoutOutlined, UploadOutlined } from '@mui/icons-material';
import HideOnScroll from './utils/HideOnScroll';

function Header() {
    const { user, signOut } = useAuth()

    function navigateToLogin() {
        navigate('/login', { replace: false });
    }

    function navigateToUpload() {
        navigate('/upload', { replace: false });
    }

    function navigateToHome() {
        navigate('/', { replace: true })
    }

    const navigate = useNavigate();
    if (user) {
        return (
            <Box sx={{ flexGrow: 1 }} >
                <HideOnScroll>
                    <AppBar position="fixed" elevation={4}>
                        <Toolbar variant="regular">
                            <Typography variant="h6" color="inherit" component="div" sx={{ textAlign: 'left', flexGrow: 1, "&:hover": { 'cursor': 'pointer' } }} onClick={navigateToHome}>
                                Klepp
                            </Typography>
                            <Tooltip title="Last opp fil">
                                <IconButton onClick={navigateToUpload} color="secondary" sx={{ "&:hover": { 'color': '#39796b', 'cursor': 'pointer' } }}> <UploadOutlined />
                                    <Typography variant="h6" color="white" component="div" sx={{ textAlign: 'left', flexGrow: 1, ml: 1 }}>
                                        Nytt klepp
                                    </Typography>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Logg ut">
                                <IconButton onClick={signOut} color="secondary" sx={{ "&:hover": { 'color': '#39796b', 'cursor': 'pointer' } }}> <LogoutOutlined />
                                    <Typography variant="h6" color="white" component="div" sx={{ textAlign: 'left', flexGrow: 1, ml: 1 }}>
                                        {user.username}
                                    </Typography>
                                </IconButton>
                            </Tooltip>
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
                            <Typography variant="h6" color="inherit" component="div" onClick={navigateToHome} sx={{ textAlign: 'left', flexGrow: 1, "&:hover": { 'cursor': 'pointer' } }}>
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
