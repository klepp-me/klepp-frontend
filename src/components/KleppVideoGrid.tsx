import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import axios from "axios";
import React from "react"
import KleppVideoPlayer from "./KleppVideoPlayer";

interface KleppVideoGridItemsProps { }

interface KleppVideoGridItemsState {
    items: KleppVideoFile[]
}

interface KleppVideoFile {
    file_name: string;
    uri: string;
}

interface KleppVideoResponse {
    files: KleppVideoFile[]
}

export default class KleppVideoGrid extends React.Component<KleppVideoGridItemsProps, KleppVideoGridItemsState> {

    constructor(props: KleppVideoGridItemsProps) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        axios.get<KleppVideoResponse>("testfiles.json").then(res => {
            this.setState({
                items: res.data.files
            })
        })
    }

    renderItems() {
        return this.state.items
            .filter(item => item.uri.endsWith(".mp4")) // Add more extensions if needed.
            .slice(0, 6) // Remove this to show all items, to save bandwith in debugging..
            .map((item, index) => {
                return (
                    <Grid item={true} xs={2} sm={4}>
                        <Card style={{ marginTop: 10 }} square={true}>
                            <CardContent>
                                <Typography variant="body1">{item.file_name}</Typography>
                            </CardContent>
                            <KleppVideoPlayer embedUrl={item.uri} />
                        </Card>
                    </Grid>
                )
            })
    };

    render() {
        return (
            <div>
                <div className="videoGrid" style={{ padding: 10, marginTop: 20, marginLeft: 10, marginRight: 10 }}>
                    {this.state.items &&
                        <Grid direction="row" container spacing={2} columns={16}>
                            {this.renderItems()}
                        </Grid >
                    }
                </div>
            </div>
        );
    }
}
