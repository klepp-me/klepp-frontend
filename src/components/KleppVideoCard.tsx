import {
  DeleteOutlined,
  FavoriteBorderOutlined,
  ShareOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material"
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined"
import { Card, CardContent, Stack, Tooltip, Typography } from "@mui/material"
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
}

function KleppVideoCard(props: KleppVideoCardProps) {
  const [isHidden, setIsHidden] = useState(props.file.hidden)
  const [likes, setLikes] = useState(props.file.likes)
  const { enqueueSnackbar } = useSnackbar()

  const { userName } = useAuth()

  function enqueueSnackbarVariant(
    message: SnackbarMessage,
    variant: VariantType
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

  function likeCounter() {
    switch (likes.length) {
      case 0:
        return null
      default:
        return (
          <Typography variant='subtitle1' color='white' noWrap>
            {likes.length}
          </Typography>
        )
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

  function renderLike() {
    if (userName && likes.map(user => user.name).indexOf(userName) !== -1) {
      return (
        <Stack direction='row' spacing={0.5} justifyContent='flex-end'>
          <Tooltip title={tooltipLikes(false)}>
            <FavoriteOutlinedIcon
              sx={{
                "&:hover": { cursor: "pointer", color: "#39796b" },
                mb: 1,
                color: "#ffffff",
              }}
              onClick={() => dislikeItem(props.file.path)}
            />
          </Tooltip>
          {likeCounter()}
        </Stack>
      )
    } else {
      return (
        <Stack direction='row' spacing={0.5} justifyContent='flex-end'>
          <Tooltip title={tooltipLikes(true)}>
            <FavoriteBorderOutlined
              sx={{
                "&:hover": { cursor: "pointer", color: "#39796b" },
                mb: 1,
                color: "#ffffff",
              }}
              onClick={() => likeItem(props.file.path)}
            />
          </Tooltip>
          {likeCounter()}
        </Stack>
      )
    }
  }

  return (
    <Card square={true} elevation={2} key={props.datetime.toString()}>
      <KleppVideoPlayer
        embedUrl={props.file.uri}
        thumbnailUri={encodeURI(props.file.thumbnail_uri)}
      />
      <CardContent
        sx={{ "&:last-child": { paddingBottom: "16px" }, paddingTop: 1 }}>
        <Stack direction='row' spacing={2} justifyContent='flex-end'>
          {props.canDelete && (
            <Tooltip title='Slett video'>
              <DeleteOutlined
                sx={{
                  "&:hover": { cursor: "pointer", color: "#39796b" },
                  mb: 1,
                  color: "#004d40",
                }}
                onClick={() => deleteItem(props.file.path)}
              />
            </Tooltip>
          )}
          {renderLike()}
          <Tooltip title='Del video'>
            <ShareOutlined
              sx={{
                "&:hover": { cursor: "pointer", color: "#39796b" },
                mb: 1,
                color: "#004d40",
              }}
              onClick={() =>
                copyToClipboard(
                  `${API_CONFIG.shareBaseUrl}?path=${props.file.path}`
                )
              }
            />
          </Tooltip>
          {props.canHide && (
            <Tooltip title={getVisibilityString(isHidden)}>
              {!isHidden ? (
                <VisibilityOff
                  sx={{
                    "&:hover": { cursor: "pointer", color: "#39796b" },
                    mb: 1,
                    color: "#004d40",
                  }}
                  onClick={() =>
                    toggleItemVisibility(isHidden, props.file.path)
                  }
                />
              ) : (
                <Visibility
                  sx={{
                    "&:hover": { cursor: "pointer", color: "#39796b" },
                    mb: 1,
                    color: "#004d40",
                  }}
                  onClick={() =>
                    toggleItemVisibility(isHidden, props.file.path)
                  }
                />
              )}
            </Tooltip>
          )}
        </Stack>
        <Typography
          variant='body1'
          color='white'
          sx={{
            "&:hover": { cursor: "pointer", color: "#39796b" },
            mb: 1,
            color: "#ffffff",
          }}
          noWrap
          onClick={() => openVideoClicked()}>
          {props.file.display_name}
        </Typography>
        <Typography variant='body2' color='white' sx={{ mt: 1 }}>
          {props.file.user.name}
        </Typography>
        <Typography variant='caption' color='white'>
          {props.datetime}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default KleppVideoCard
