import { Card, Grid, Typography } from "@mui/material";
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
                    <Card style={{ margin: 10, padding: 10 }} variant="outlined">
                        <Typography variant="body1" style={{ margin: 10, padding: 10 }}>{item.file_name} </Typography>
                        <KleppVideoPlayer embedUrl={item.uri} />
                    </Card>
                )
            }
            )
    };

    render() {
        return (
            <div>
                <div className="row">
                    {this.state.items &&
                        <Grid container style={{ padding: 10 }} spacing={2} columns={16}>
                            {this.renderItems()}
                        </Grid >
                    }
                </div>
            </div>
        );
    }
}
