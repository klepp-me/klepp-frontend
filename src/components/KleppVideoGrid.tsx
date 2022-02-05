import { Card, CardContent, CardMedia, Divider, Grid, Typography } from "@mui/material";
import axios from "axios";
import React from "react"
import KleppVideoCard from "./KleppVideoCard";
import KleppVideoPlayer from "./KleppVideoPlayer";

interface KleppVideoGridItemsProps {
    accessToken?: string,
    userName?: string
}

interface KleppVideoGridItemsState {
    items: KleppVideoFile[],
    hiddenItems: KleppVideoFile[]
}

interface KleppVideoFile {
    fileName: string;
    uri: string;
    datetime: string;
    username: string
}

interface KleppVideoResponse {
    files: KleppVideoFile[],
    hiddenFiles: KleppVideoFile[]
}

export default class KleppVideoGrid extends React.Component<KleppVideoGridItemsProps, KleppVideoGridItemsState> {
    constructor(props: KleppVideoGridItemsProps) {
        super(props);
        this.state = {
            items: [],
            hiddenItems: []
        }
    }

    componentDidMount() {
        const config = {
            headers: { Authorization: `Bearer ${this.props.accessToken}` }
        };

        axios.get<KleppVideoResponse>("https://api.klepp.me/api/v1/files", config).then(res => {
            this.setState({
                items: res.data.files,
                hiddenItems: res.data.hiddenFiles
            })
        })
    }


    renderItems() {
        return this.state.items
            .filter(item => item.uri.endsWith(".mp4")) // Done in aws
            .sort((a, b) => Date.parse(a.datetime) - Date.parse(b.datetime)).reverse()
            .slice(0, 8)
            .map((item, index) => {
                return (
                    <Grid item={true} xs={2} sm={4} >
                        <KleppVideoCard
                            title={item.fileName.split("/").pop()!}
                            owner={item.username}
                            uri={item.uri}
                            datetime={new Date(item.datetime).toLocaleDateString('nb-NO', { day: 'numeric', month: 'short', year: 'numeric' })} />
                    </Grid>
                )
            })
    };

    renderOwnItems() {
        return this.state.items
            .filter(item => item.uri.endsWith(".mp4") && item.fileName.includes(this.props.userName!))
            .sort((a, b) => Date.parse(a.datetime) - Date.parse(b.datetime)).reverse()
            .slice(0, 8)
            .map((item, index) => {
                return (
                    <Grid item={true} xs={2} sm={4}>
                        <KleppVideoCard
                            title={item.fileName.split("/").pop()!}
                            owner={item.username}
                            uri={item.uri}
                            datetime={new Date(item.datetime).toLocaleDateString('nb-NO', { day: 'numeric', month: 'short', year: 'numeric' })} />
                    </Grid>
                )
            })
    };

    renderHiddenItems() {
        return this.state.hiddenItems
            .filter(item => item.uri.endsWith(".mp4"))
            .sort((a, b) => Date.parse(a.datetime) - Date.parse(b.datetime)).reverse()
            .slice(0, 8) // Remove this to show all items, to save bandwith in debugging..
            .map((item, index) => {
                return (
                    <Grid item={true} xs={2} sm={4}>
                        <KleppVideoCard
                            title={item.fileName.split("/").pop()!}
                            owner={item.username}
                            uri={item.uri}
                            datetime={new Date(item.datetime).toLocaleDateString('nb-NO', { day: 'numeric', month: 'short', year: 'numeric' })} />
                    </Grid>
                )
            })
    };

    render() {
        if (!this.props.accessToken || !this.props.userName) return (
            <div style={{ marginTop: 24, paddingBottom: 16 }}>
                <Typography variant="h4" color="white" sx={{ mt: 2, textAlign: 'left', ml: 2 }}>Nyeste videoer</Typography>
                <div className="videoGrid" style={{ marginTop: 12, marginLeft: 16, marginRight: 16 }}>
                    {this.state.items &&
                        <Grid direction="row" container spacing={2} columns={16}>
                            {this.renderItems()}
                        </Grid >
                    }
                </div>
            </div>
        )
        else return (
            <div style={{ paddingBottom: 8 }}>
                <div style={{ marginTop: 16, paddingBottom: 16 }}>
                    <Divider variant="middle" sx={{ height: 12, borderBottomWidth: 2 }} />
                    <Typography variant="h4" color="white" sx={{ mt: 2, textAlign: 'left', ml: 2 }}>Mine videoer</Typography>
                    <div className="privateVideoGrid" style={{ marginTop: 12, marginLeft: 16, marginRight: 16 }}>
                        {this.state.items &&
                            <Grid direction="row" container spacing={2} columns={16}>
                                {this.renderOwnItems()}
                            </Grid >
                        }
                    </div>
                </div>
                <div style={{ marginTop: 16, paddingBottom: 16 }}>
                    <Divider variant="middle" sx={{ height: 12, borderBottomWidth: 2 }} />
                    <Typography variant="h4" color="white" sx={{ mt: 2, textAlign: 'left', ml: 2 }}>Mine private videoer</Typography>
                    <div className="privateHiddenVideoGrid" style={{ marginTop: 12, marginLeft: 16, marginRight: 16 }}>
                        {this.state.hiddenItems &&
                            <Grid direction="row" container spacing={2} columns={16}>
                                {this.renderHiddenItems()}
                            </Grid >
                        }
                    </div>
                </div>
            </div>
        )
    }
}
