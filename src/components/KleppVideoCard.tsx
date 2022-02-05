import { Card, CardContent, Typography } from "@mui/material";
import KleppVideoPlayer from "./KleppVideoPlayer";

interface KleppVideoCardProps {
    title: string,
    owner: string,
    uri: string,
    datetime: string
}

function KleppVideoCard(props: KleppVideoCardProps) {
    return (<Card style={{ marginTop: 0 }} square={true} elevation={2}>
        <KleppVideoPlayer embedUrl={props.uri} />
        <CardContent>
            <Typography variant="body1" color='white' noWrap>{props.title.replace(/\.[^/.]+$/, "")}</Typography>
            <Typography variant="caption" color="white">{props.owner}</Typography>
            <Typography variant="caption" color="white">{props.datetime}</Typography>
        </CardContent>
    </Card>
    );
}

export default KleppVideoCard;