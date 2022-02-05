import { Card, CardContent, Typography } from "@mui/material";
import KleppVideoPlayer from "./KleppVideoPlayer";

interface KleppVideoCardProps {
    title: string,
    owner: string,
    uri: string,
    datetime: string
}

function KleppVideoCard(props: KleppVideoCardProps) {
    return (<Card square={true} elevation={2}>
        <KleppVideoPlayer embedUrl={props.uri} />
        <CardContent sx={{ '&:last-child': { paddingBottom: '16px' } }}>
            <Typography variant="body1" color='white' noWrap>{props.title.replace(/\.[^/.]+$/, "")}</Typography>
            <Typography variant="body2" color="white" sx={{ mt: 1 }}>{props.owner}</Typography>
            <Typography variant="caption" color="white">{props.datetime}</Typography>
        </CardContent>
    </Card>
    );
}

export default KleppVideoCard;