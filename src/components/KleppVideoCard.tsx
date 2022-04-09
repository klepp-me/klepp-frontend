import { DeleteOutlined, FavoriteBorderOutlined, ShareOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { Alert, Card, CardContent, Snackbar, Stack, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { API_CONFIG } from "../config/api_config";
import useAuth from "../contexts/AuthContextProvider";
import { KleppUser, KleppVideoLike } from "../models/KleppVideoModels";
import kleppVideoService from "../services/kleppvideoservice";
import KleppVideoPlayer from "./KleppVideoPlayer";

interface KleppVideoCardProps {
    title: string,
    owner: string,
    uri: string,
    fileName: string,
    datetime: string,
    likes: KleppUser[],
    username?: string,
    canDelete: boolean,
    thumbnailUri: string,
    onDelete: (fileName: string) => void,
    isHidden: boolean,
    overrideHidden: boolean,
}

interface KleppVideoDeleteResponse {
    data: {
        fileName: string
    }
}

function KleppVideoCard(props: KleppVideoCardProps) {
    const [open, setOpen] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [isHidden, setIsHidden] = useState(props.isHidden)
    const [likes, setLikes] = useState(props.likes)

    const { accessToken } = useAuth();

    function getVisibilityString(hidden: boolean) {
        return hidden ? "Vis video" : "Skjul video"
    }

    function copyToClipboard(uri: string) {
        navigator.clipboard.writeText(uri)
            .then(() => { setAlertText("Copied to clipboard!") })
            .catch(() => {
                setAlertText("Kunne ikke kopiere")
            })
            .finally(() => {
                openAlertClicked()
            });
    }

    function deleteItem(file: string) {
        if (accessToken != null) {
            kleppVideoService.delete<any, KleppVideoDeleteResponse>(file, accessToken).then((data) => {
                props.onDelete(data.data.fileName)
                setAlertText("File deleted!")
            }).catch(() => {
                setAlertText("Could not delete file")
            }).finally(() => {
                openAlertClicked()
            });
        } else {
            setAlertText("Could not delete file, try again")
            openAlertClicked()
        }
    }

    function toggleItemVisibility(isVisible: boolean, fileName: string) {
        if (accessToken != null) {
            kleppVideoService.hide(!isVisible, fileName, accessToken).then(() => {
                setIsHidden(!isVisible)
            }).catch((err) => {
                setAlertText("Could not update visibility")
                openAlertClicked()
            }).finally(() => {
            })
        }
    }

    function likeItem(path: string) {
        if (accessToken != null) {
            kleppVideoService.like(path, accessToken).then((data) => {
                setLikes(data.data.likes)
            }).catch((err) => {
                setAlertText("Could not like video")
                openAlertClicked()
                console.log(err)
            })
        }
    }

    function dislikeItem(path: string) {
        if (accessToken != null) {
            kleppVideoService.dislike(path, accessToken).then((data) => {
                setLikes(data.data.likes)
            }).catch((err) => {
                setAlertText("Could not like video")
                openAlertClicked()
                console.log(err)
            })
        }
    }

    function openAlertClicked() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    function renderLike() {
        if (accessToken == null) {
            return null
        } else if (props.username && likes.map((user) => user.name).indexOf(props.username) !== -1) {
            console.log("does have like")
            return <Tooltip title="Unlike video">
                <FavoriteOutlinedIcon sx={{ "&:hover": { 'cursor': 'pointer', color: '#39796b' }, mb: 1, color: '#004d40' }} onClick={() => dislikeItem(props.fileName)} />
            </Tooltip>
        } else {
            console.log("does not have like")
            return <Tooltip title="Like video">
                <FavoriteBorderOutlined sx={{ "&:hover": { 'cursor': 'pointer', color: '#39796b' }, mb: 1, color: '#004d40' }} onClick={() => likeItem(props.fileName)} />
            </Tooltip>
        }
    }

    return (<Card square={true} elevation={2} key={props.datetime.toString()}>
        <KleppVideoPlayer embedUrl={props.uri} thumbnailUri={props.thumbnailUri} />
        <CardContent sx={{ '&:last-child': { paddingBottom: '16px' }, paddingTop: 1 }}>
            <Stack direction="row" spacing={2} justifyContent="flex-end" >
                {props.canDelete && <Tooltip title="Slett video">
                    <DeleteOutlined sx={{ "&:hover": { 'cursor': 'pointer', color: '#39796b' }, mb: 1, color: '#004d40' }} onClick={() => deleteItem(props.fileName)} />
                </Tooltip>}
                {renderLike()}
                <Tooltip title="Del video">
                    <ShareOutlined sx={{ "&:hover": { 'cursor': 'pointer', color: '#39796b' }, mb: 1, color: '#004d40' }} onClick={() => copyToClipboard(`${API_CONFIG.webBaseUrl}#/video?uri=${props.uri}`)} />
                </Tooltip>
                {!props.overrideHidden && <Tooltip title={getVisibilityString(isHidden)}>
                    {!isHidden ? <VisibilityOff sx={{ "&:hover": { 'cursor': 'pointer', color: '#39796b' }, mb: 1, color: '#004d40' }} onClick={() => toggleItemVisibility(isHidden, props.fileName)} /> : <Visibility sx={{ "&:hover": { 'cursor': 'pointer', color: '#39796b' }, mb: 1, color: '#004d40' }} onClick={() => toggleItemVisibility(isHidden, props.fileName)} />}
                </Tooltip>}
            </Stack>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {alertText}
                </Alert>
            </Snackbar>
            <Typography variant="body1" color='white' noWrap>{props.title.replace(/\.[^/.]+$/, "")}</Typography>
            <Typography variant="body2" color="white" sx={{ mt: 1 }}>{props.owner}</Typography>
            <Typography variant="caption" color="white">{props.datetime}</Typography>
            {props.likes && props.likes.map((user) => <Typography variant="caption">{user.name}</Typography>)}
        </CardContent>
    </Card>
    );
}

export default KleppVideoCard;
