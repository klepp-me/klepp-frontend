import { LoginOutlined, LogoutOutlined, UploadOutlined } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
import useAuth from '../contexts/AuthContextProvider';
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
                            <Typography variant="h6" color="inherit" flexGrow="1" component="div" sx={{ textAlign: 'left', "&:hover": { 'cursor': 'pointer' } }} onClick={navigateToHome}>
                                <div className="frontPage" style={{ paddingTop: 16, paddingBottom: 16, display: 'flex', 'alignItems': 'center' }}>
                                    <img src="../assets/kleppwhite.png" alt="klepp-frontend-logo" width="40" height="44" style={{ marginRight: '16px', marginTop: 'auto' }} />
                                    <span>Klepp</span>
                                </div>
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
