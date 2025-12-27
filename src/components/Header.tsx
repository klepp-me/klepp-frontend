import {
  LoginOutlined,
  LogoutOutlined,
  UploadOutlined,
  PhotoCamera,
} from "@mui/icons-material"
import {
  Avatar,
  Box,
  IconButton,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useSnackbar } from "notistack"
import useAuth from "../contexts/AuthContextProvider"
import HideOnScroll from "./utils/HideOnScroll"
import kleppVideoService from "../services/kleppvideoservice"

function Header() {
  const { user, signOut } = useAuth()
  const [userThumbnail, setUserThumbnail] = useState<string | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { enqueueSnackbar } = useSnackbar()
  const menuOpen = Boolean(anchorEl)

  useEffect(() => {
    if (user?.username) {
      kleppVideoService
        .getUsers()
        .then(response => {
          const currentUser = response.data.response.find(
            u => u.name === user.username,
          )
          if (currentUser?.thumbnail_uri) {
            setUserThumbnail(currentUser.thumbnail_uri)
          }
        })
        .catch(() => {})
    }
  }, [user?.username])

  function handleMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget)
  }

  function handleMenuClose() {
    setAnchorEl(null)
  }

  function handleProfilePictureClick() {
    fileInputRef.current?.click()
    handleMenuClose()
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      kleppVideoService
        .uploadProfileThumbnail(file)
        .then(response => {
          setUserThumbnail(response.data.thumbnail_uri)
          enqueueSnackbar("Profile picture updated", { variant: "success" })
        })
        .catch(() => {
          enqueueSnackbar("Could not update profile picture", {
            variant: "error",
          })
        })
    }
    event.target.value = ""
  }

  function handleSignOut() {
    handleMenuClose()
    signOut()
  }

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
                  src='/assets/kleppwhite.png'
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
                <Tooltip title='Upload file'>
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
                      New klepp
                    </Typography>
                  </IconButton>
                </Tooltip>
                <Tooltip title='Profile'>
                  <IconButton onClick={handleMenuOpen} sx={headerButtonSx}>
                    <Avatar
                      src={userThumbnail || undefined}
                      sx={{
                        width: 28,
                        height: 28,
                        mr: 0.5,
                        bgcolor: userThumbnail ? "transparent" : "#1e293b",
                        fontSize: 14,
                      }}>
                      {!userThumbnail && user.username?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography
                      variant='body2'
                      sx={{ color: "#94a3b8", fontWeight: 500 }}>
                      {user.username}
                    </Typography>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  PaperProps={{
                    sx: {
                      bgcolor: "#1e293b",
                      border: "1px solid #334155",
                      mt: 1,
                    },
                  }}>
                  <MenuItem onClick={handleProfilePictureClick}>
                    <ListItemIcon>
                      <PhotoCamera sx={{ color: "#94a3b8" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary='Change profile picture'
                      sx={{ color: "#f1f5f9" }}
                    />
                  </MenuItem>
                  <MenuItem onClick={handleSignOut}>
                    <ListItemIcon>
                      <LogoutOutlined sx={{ color: "#94a3b8" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary='Sign out'
                      sx={{ color: "#f1f5f9" }}
                    />
                  </MenuItem>
                </Menu>
                <input
                  type='file'
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept='image/*'
                  style={{ display: "none" }}
                />
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
                  Sign in
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
