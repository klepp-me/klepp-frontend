import { Button, LinearProgress, ThemeProvider, Typography } from "@mui/material";
import { useState } from "react";
import useAuth from "../contexts/AuthContextProvider";
import uploadVideoService from "../services/upload-video-service";
import theme from "../styles/theme";
import Header from "./Header";

function UploadFile() {

    const { user, accessToken } = useAuth()
    
    const [selectedFile, setSelectedFile] = useState<any>();
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    return (
        <ThemeProvider theme={theme}>
            <Header />
            <div style={{ marginTop: 24, marginLeft: 24, marginRight: 24 }}>
                <div>
                    <Typography variant="h4" color={"white"} sx={{ mb: 2 }}>Last opp video</Typography>
                    <label htmlFor="contained-button-file" className="uploadLabel">
                        <input accept=".mp4" id="contained-button-file" type="file" onChange={selectFile} color="white" />
                    </label>
                </div>
                <div style={{ marginTop: 32 }}>
                    {user && accessToken ? <Button variant="contained" color="secondary" onClick={uploadSelectedFile} disabled={isUploading || !selectedFile} sx={{ "&:hover": { 'color': '#39796b', 'cursor': 'pointer', display: "block" } }}>Upload video</Button> : <p>Logg inn for å laste opp filer</p>}
                    {progress > 0 && <LinearProgress variant="determinate" color={"secondary"} value={progress} sx={{ mt: 2, width: 1 / 4, height: 12 }} />}
                    {message && <Typography variant="body1" color={"white"} sx={{ mt: 2 }}>{message}</Typography>}
                </div>
            </div>
        </ThemeProvider>
    );

    function uploadSelectedFile() {
        if (selectedFile[0] && accessToken) {
            setProgress(0)
            setIsUploading(true)
            uploadVideoService.upload(selectedFile[0], accessToken, (event: ProgressEvent<EventTarget>) => {
                setProgress(Math.round((100 * event.loaded) / event.total))
            }).then((res) => {
                setProgress(0)
                setMessage("Upload complete, check it out on the frontpage!");
                setIsUploading(false)
            }).catch(() => {
                setProgress(0)
                setMessage("Could not upload file")
                setSelectedFile(null)
                setIsUploading(false)
            });
        }
    }

    function selectFile(event: React.FormEvent<HTMLInputElement>) {
        if (event.currentTarget.files && event.currentTarget.files.length > 0 == true) {
            setSelectedFile(event.currentTarget.files)
        } else {
            setSelectedFile(null)
        }
    }
}

export default UploadFile;