import {
  Alert,
  Button,
  Container,
  Grid,
  LinearProgress,
  Snackbar,
  ThemeProvider,
  Typography,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { API_CONFIG } from "../config/api_config"
import useAuth from "../contexts/AuthContextProvider"
import kleppVideoService from "../services/kleppvideoservice"
import KleppVideoCard from "./KleppVideoCard"

import theme from "../styles/theme"
import Header from "./Header"
import { KleppVideoFile } from "../models/KleppVideoModels"

function UploadFile() {
  const { user, accessToken } = useAuth()
  const [selectedFile, setSelectedFile] = useState<FileList | null>()
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [alertText, setAlertText] = useState("")
  const [open, setOpen] = useState(false)
  const [video, setVideo] = useState<null | KleppVideoFile>(null)

  return (
    <Container maxWidth='xl'>
      <ThemeProvider theme={theme}>
        <Header />
        <div style={{ marginTop: 24, marginLeft: 24, marginRight: 24 }}>
          <div>
            <Typography variant='h4' color={"white"} sx={{ mb: 2 }}>
              Last opp video
            </Typography>
            <label htmlFor='contained-button-file' className='uploadLabel'>
              <input
                accept='.mp4'
                id='contained-button-file'
                type='file'
                onChange={selectFile}
                color='white'
              />
            </label>
          </div>
          <div style={{ marginTop: 32 }}>
            {user && accessToken ? (
              <Button
                variant='contained'
                color='secondary'
                onClick={uploadSelectedFile}
                disabled={isUploading || !selectedFile}
                sx={{
                  "&:hover": {
                    color: "#39796b",
                    cursor: "pointer",
                    display: "block",
                  },
                }}>
                Upload video
              </Button>
            ) : (
              <p>Logg inn for å laste opp filer</p>
            )}
            {progress > 0 && (
              <LinearProgress
                variant='determinate'
                color={"secondary"}
                value={progress}
                sx={{ mt: 2, width: 1 / 4, height: 12 }}
              />
            )}
            {message && (
              <Typography variant='body1' color={"white"} sx={{ mt: 2 }}>
                {message}
              </Typography>
            )}
          </div>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={() => toggleAlert(false)}>
            <Alert
              onClose={() => toggleAlert(false)}
              severity='success'
              sx={{ width: "100%" }}>
              {alertText}
            </Alert>
          </Snackbar>
          {video && (
            <Grid
              item={true}
              key={video.path}
              sx={{ minWidth: 200, maxWidth: 600 }}>
              <KleppVideoCard
                file={video}
                username={video.user.name}
                datetime={new Date(video.uploaded_at).toLocaleDateString(
                  "nb-NO",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                )}
                canDelete={true}
                canHide={true}
                onDelete={() => deleteVideo()}
              />
            </Grid>
          )}
        </div>
      </ThemeProvider>
    </Container>
  )

  function deleteVideo() {
    setVideo(null)
    setMessage("")
  }

  function uploadSelectedFile() {
    if (selectedFile && selectedFile[0] && accessToken) {
      setProgress(0)
      setIsUploading(true)
      kleppVideoService
        .upload(
          selectedFile[0],
          accessToken,
          (event: ProgressEvent<EventTarget>) => {
            setProgress(Math.round((100 * event.loaded) / event.total))
            setMessage("") // In case they had an error on first attempt, clear the error
          }
        )
        .then(res => {
          setProgress(0)
          copyToClipboard(`${API_CONFIG.webBaseUrl}#/video?uri=${res.data.uri}`)
          setVideo(res.data)
          setMessage("Upload complete. It will now appear on the front page.")
          setIsUploading(false)
        })
        .catch(e => {
          setProgress(0)
          setMessage(`Could not upload file. ${e.response.data.detail}`)
          setSelectedFile(null)
          setIsUploading(false)
        })
    }
  }

  function selectFile(event: React.FormEvent<HTMLInputElement>) {
    if (event.currentTarget.files && event.currentTarget.files.length > 0) {
      setSelectedFile(event.currentTarget.files)
    } else {
      setSelectedFile(null)
    }
  }

  function copyToClipboard(uri: string) {
    navigator.clipboard
      .writeText(uri)
      .then(() => {
        setAlertText("Copied video-URL to clipboard!")
      })
      .catch(() => {
        setAlertText("Kunne ikke kopiere")
      })
      .finally(() => {
        toggleAlert(true)
      })
  }

  function toggleAlert(open: boolean) {
    setOpen(open)
  }
}

export default UploadFile
