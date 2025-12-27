import {
  DeleteOutlined,
  FavoriteBorderOutlined,
  ShareOutlined,
  Visibility,
  VisibilityOff,
  OpenInFull,
  CloseFullscreen,
} from "@mui/icons-material"
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined"
import {
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material"
import { useState } from "react"
import { API_CONFIG } from "../config/api_config"
import useAuth from "../contexts/AuthContextProvider"
import { KleppVideoFile, KleppVideoPatch } from "../models/KleppVideoModels"
import kleppVideoService from "../services/kleppvideoservice"
import KleppVideoPlayer from "./KleppVideoPlayer"
import { SnackbarMessage, useSnackbar, VariantType } from "notistack"

interface KleppVideoCardProps {
  datetime: string
  file: KleppVideoFile
  username?: string
  canDelete: boolean
  onDelete: (fileName: string) => void
  canHide: boolean
  isExpanded: boolean
  onExpand: () => void
}

function KleppVideoCard(props: KleppVideoCardProps) {
  const [isHidden, setIsHidden] = useState(props.file.hidden)
  const [likes, setLikes] = useState(props.file.likes)
  const { enqueueSnackbar } = useSnackbar()

  const { userName } = useAuth()

  function enqueueSnackbarVariant(
    message: SnackbarMessage,
    variant: VariantType,
  ) {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant })
  }

  function getVisibilityString(hidden: boolean) {
    return hidden ? "Show video" : "Hide video"
  }

  function copyToClipboard(uri: string) {
    navigator.clipboard
      .writeText(uri)
      .then(() => {
        enqueueSnackbarVariant("Copied link to clipboard", "success")
      })
      .catch(() => {
        enqueueSnackbarVariant("Could not copy link to clipboard", "warning")
      })
  }

  function deleteItem(file: string) {
    if (userName != null) {
      kleppVideoService
        .delete(file)
        .then(data => {
          props.onDelete(data.data.path)
          enqueueSnackbarVariant("File deleted", "success")
        })
        .catch(() => {
          enqueueSnackbarVariant("Could not delete file", "warning")
        })
    } else {
      enqueueSnackbarVariant("Could not delete file, try again", "warning")
    }
  }

  function toggleItemVisibility(isVisible: boolean, path: string) {
    if (userName != null) {
      const attrs: KleppVideoPatch = {
        path: path,
        hidden: !isVisible,
      }

      kleppVideoService
        .updateVideoAttrs(attrs)
        .then(data => {
          setIsHidden(data.data.hidden)
          enqueueSnackbarVariant("Visibility has been updated", "success")
        })
        .catch(() => {
          enqueueSnackbarVariant("Unable to update visibility", "warning")
        })
    }
  }

  function likeItem(path: string) {
    if (userName != null) {
      kleppVideoService
        .like(path)
        .then(data => {
          setLikes(data.data.likes)
        })
        .catch(() => {
          enqueueSnackbarVariant("Could not like video", "warning")
        })
    } else {
      enqueueSnackbarVariant("Log in to like video", "warning")
    }
  }

  function dislikeItem(path: string) {
    if (userName != null) {
      kleppVideoService
        .dislike(path)
        .then(data => {
          setLikes(data.data.likes)
        })
        .catch(() => {
          enqueueSnackbarVariant("Could not unlike video", "warning")
        })
    } else {
      enqueueSnackbarVariant("Log in to unlike video", "warning")
    }
  }

  function tooltipLikes(shouldLike: boolean) {
    const numLikes = likes.length
    switch (true) {
      case numLikes == 0:
        if (shouldLike) {
          return "Like video"
        } else {
          return "Dislike video"
        }
      case numLikes <= 5:
        return likes.map(like => like.name).join(", ")
      case numLikes > 5:
        return likes
          .map(like => like.name)
          .slice(0, 5)
          .push("++")
      default:
        return ""
    }
  }

  async function openVideoClicked() {
    window.location.assign(`${API_CONFIG.shareBaseUrl}?path=${props.file.path}`)
  }

  const iconButtonStyle = {
    width: 36,
    height: 36,
    bgcolor: "rgba(30, 41, 59, 0.6)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(148, 163, 184, 0.1)",
    "&:hover": {
      bgcolor: "rgba(16, 185, 129, 0.15)",
      borderColor: "rgba(16, 185, 129, 0.3)",
    },
    transition: "all 0.2s ease",
  }

  const iconStyle = {
    fontSize: 18,
    color: "#94a3b8",
    transition: "all 0.2s ease",
  }

  return (
    <Card
      elevation={0}
      key={props.datetime.toString()}
      sx={{
        maxWidth: props.isExpanded ? "50%" : "none",
        margin: props.isExpanded ? "0 auto" : 0,
        transition: "all 0.3s ease",
        bgcolor: "rgba(30, 41, 59, 0.5)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(148, 163, 184, 0.1)",
        borderRadius: 3,
        overflow: "hidden",
        "&:hover": {
          borderColor: "rgba(16, 185, 129, 0.2)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        },
      }}>
      <KleppVideoPlayer
        embedUrl={props.file.uri}
        thumbnailUri={encodeURI(props.file.thumbnail_uri)}
        isExpanded={props.isExpanded}
      />
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        {/* Title */}
        <Typography
          variant='body1'
          sx={{
            "&:hover": { cursor: "pointer", color: "#10b981" },
            color: "#f1f5f9",
            fontWeight: 600,
            fontSize: "1rem",
            lineHeight: 1.4,
            transition: "color 0.2s ease",
            mb: 1.5,
          }}
          noWrap
          onClick={() => openVideoClicked()}>
          {props.file.display_name}
        </Typography>

        {/* User info row */}
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          sx={{ mb: 2 }}>
          <Stack direction='row' alignItems='center' spacing={1}>
            <Avatar
              src={props.file.user.thumbnail_uri || undefined}
              sx={{
                width: 28,
                height: 28,
                bgcolor: props.file.user.thumbnail_uri
                  ? "transparent"
                  : "#1e293b",
                fontSize: 12,
                border: "2px solid rgba(16, 185, 129, 0.3)",
              }}>
              {!props.file.user.thumbnail_uri &&
                props.file.user.name.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography
                variant='body2'
                sx={{
                  color: "#10b981",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  lineHeight: 1.2,
                }}>
                {props.file.user.name}
              </Typography>
              <Typography
                variant='caption'
                sx={{ color: "#64748b", fontSize: "0.75rem" }}>
                {props.datetime}
              </Typography>
            </Box>
          </Stack>
        </Stack>

        {/* Action buttons */}
        <Stack
          direction='row'
          spacing={1}
          alignItems='center'
          sx={{
            pt: 1.5,
            borderTop: "1px solid rgba(148, 163, 184, 0.1)",
          }}>
          <Tooltip
            title={props.isExpanded ? "Exit theater mode" : "Theater mode"}>
            <IconButton onClick={props.onExpand} sx={iconButtonStyle}>
              {props.isExpanded ? (
                <CloseFullscreen sx={iconStyle} />
              ) : (
                <OpenInFull sx={iconStyle} />
              )}
            </IconButton>
          </Tooltip>

          {props.canDelete && (
            <Tooltip title='Delete video'>
              <IconButton
                onClick={() => deleteItem(props.file.path)}
                sx={{
                  ...iconButtonStyle,
                  "&:hover": {
                    bgcolor: "rgba(239, 68, 68, 0.15)",
                    borderColor: "rgba(239, 68, 68, 0.3)",
                    "& .MuiSvgIcon-root": {
                      color: "#ef4444",
                    },
                  },
                }}>
                <DeleteOutlined sx={iconStyle} />
              </IconButton>
            </Tooltip>
          )}

          <Box sx={{ flexGrow: 1 }} />

          {/* Like button with count */}
          <Tooltip
            title={tooltipLikes(
              !(
                userName &&
                likes.map(user => user.name).indexOf(userName) !== -1
              ),
            )}>
            <IconButton
              onClick={() =>
                userName &&
                likes.map(user => user.name).indexOf(userName) !== -1
                  ? dislikeItem(props.file.path)
                  : likeItem(props.file.path)
              }
              sx={{
                ...iconButtonStyle,
                gap: 0.5,
                width: "auto",
                px: 1.5,
                "&:hover": {
                  bgcolor: "rgba(16, 185, 129, 0.15)",
                  borderColor: "rgba(16, 185, 129, 0.3)",
                },
              }}>
              {userName &&
              likes.map(user => user.name).indexOf(userName) !== -1 ? (
                <FavoriteOutlinedIcon
                  sx={{ ...iconStyle, color: "#10b981", fontSize: 18 }}
                />
              ) : (
                <FavoriteBorderOutlined sx={iconStyle} />
              )}
              {likes.length > 0 && (
                <Typography
                  variant='caption'
                  sx={{
                    color:
                      userName &&
                      likes.map(user => user.name).indexOf(userName) !== -1
                        ? "#10b981"
                        : "#94a3b8",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                  }}>
                  {likes.length}
                </Typography>
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title='Share video'>
            <IconButton
              onClick={() =>
                copyToClipboard(
                  `${API_CONFIG.shareBaseUrl}?path=${props.file.path}`,
                )
              }
              sx={iconButtonStyle}>
              <ShareOutlined sx={iconStyle} />
            </IconButton>
          </Tooltip>

          {props.canHide && (
            <Tooltip title={getVisibilityString(isHidden)}>
              <IconButton
                onClick={() => toggleItemVisibility(isHidden, props.file.path)}
                sx={iconButtonStyle}>
                {!isHidden ? (
                  <VisibilityOff sx={iconStyle} />
                ) : (
                  <Visibility sx={iconStyle} />
                )}
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default KleppVideoCard
