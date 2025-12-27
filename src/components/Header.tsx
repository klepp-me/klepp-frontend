import {
  LoginOutlined,
  LogoutOutlined,
  UploadOutlined,
} from "@mui/icons-material"
import { Box, IconButton, Tooltip, Typography } from "@mui/material"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import { useNavigate } from "react-router-dom"
import useAuth from "../contexts/AuthContextProvider"
import HideOnScroll from "./utils/HideOnScroll"

function Header() {
  const { user, signOut } = useAuth()

  function navigateToLogin() {
    navigate("/login", { replace: false })
  }

  function navigateToUpload() {
    navigate("/upload", { replace: false })
  }

  function navigateToHome() {
    navigate("/", { replace: true })
  }

  const navigate = useNavigate()

  const headerButtonSx = {
    borderRadius: 1.5,
    px: 1.5,
    py: 0.75,
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      color: "#10b981",
    },
  }

  if (user) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <HideOnScroll>
          <AppBar position='fixed' elevation={0}>
            <Toolbar variant='regular' sx={{ px: { xs: 2, md: 4 } }}>
              <Box
                onClick={navigateToHome}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexGrow: 1,
                  cursor: "pointer",
                  py: 1.5,
                  "&:hover": {
                    "& .logo-text": {
                      color: "#10b981",
                    },
                  },
                }}>
                <img
                  src='../assets/kleppwhite.png'
                  alt='klepp-frontend-logo'
                  width='36'
                  height='40'
                  style={{ marginRight: "12px" }}
                />
                <Typography
                  className='logo-text'
                  variant='h6'
                  sx={{
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    transition: "color 0.2s ease",
                  }}>
                  Klepp
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Tooltip title='Last opp fil'>
                  <IconButton
                    onClick={navigateToUpload}
                    sx={{
                      ...headerButtonSx,
                      background:
                        "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      color: "white",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #34d399 0%, #10b981 100%)",
                        boxShadow: "0 2px 8px rgba(16, 185, 129, 0.4)",
                      },
                    }}>
                    <UploadOutlined sx={{ mr: 0.5, fontSize: 18 }} />
                    <Typography variant='body2' sx={{ fontWeight: 600 }}>
                      Nytt klepp
                    </Typography>
                  </IconButton>
                </Tooltip>
                <Tooltip title='Logg ut'>
                  <IconButton onClick={signOut} sx={headerButtonSx}>
                    <LogoutOutlined
                      sx={{ mr: 0.5, fontSize: 18, color: "#94a3b8" }}
                    />
                    <Typography
                      variant='body2'
                      sx={{ color: "#94a3b8", fontWeight: 500 }}>
                      {user.username}
                    </Typography>
                  </IconButton>
                </Tooltip>
              </Box>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Toolbar sx={{ background: "transparent" }} />
      </Box>
    )
  } else {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <HideOnScroll>
          <AppBar position='fixed' elevation={0}>
            <Toolbar variant='regular' sx={{ px: { xs: 2, md: 4 } }}>
              <Box
                onClick={navigateToHome}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexGrow: 1,
                  cursor: "pointer",
                  py: 1.5,
                  "&:hover": {
                    "& .logo-text": {
                      color: "#10b981",
                    },
                  },
                }}>
                <Typography
                  className='logo-text'
                  variant='h6'
                  sx={{
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    transition: "color 0.2s ease",
                  }}>
                  Klepp
                </Typography>
              </Box>
              <IconButton onClick={navigateToLogin} sx={headerButtonSx}>
                <LoginOutlined
                  sx={{ mr: 0.5, fontSize: 18, color: "#10b981" }}
                />
                <Typography
                  variant='body2'
                  sx={{ color: "#f1f5f9", fontWeight: 500 }}>
                  Logg inn
                </Typography>
              </IconButton>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Toolbar sx={{ background: "transparent" }} />
      </Box>
    )
  }
}

export default Header
