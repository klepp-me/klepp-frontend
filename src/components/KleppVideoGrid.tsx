import { Divider, Grid, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { API_CONFIG } from "../config/api_config";
import { KleppVideoFile } from "../models/KleppVideoModels";
import KleppVideoCard from "./KleppVideoCard";

interface KleppVideoGridItemsProps {
    accessToken?: string,
    userName?: string
}

interface KleppVideoGridItemsState {
    items: KleppVideoFile[],
    hiddenItems: KleppVideoFile[]
}

interface KleppVideoFilesResponse {
    total_count: number,
    response: KleppVideoFile[]
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

        axios.get<KleppVideoFilesResponse>(`${API_CONFIG.baseUrl}${API_CONFIG.filesPath}`, config).then(res => {
            this.setState({
                items: res.data.response,
                hiddenItems: []
            })
        }).catch(e => {
            console.error(e);
        })
    }

    itemDeleted = (fileName: string) => {
        this.setState(prevState => ({
            items: prevState.items.filter(item => item.path !== fileName),
            hiddenItems: prevState.hiddenItems.filter(item => item.path !== fileName)
        }))
    };


    renderItems() {
        return this.state.items
            .filter(item => item.uri.endsWith(".mp4")) // Done in aws
            //.sort((a, b) => Date.parse(a.uploaded_at) - Date.parse(b.uploaded_at)).reverse() # Done server-side
            .slice(0, 12)
            .map((item, index, key) => {
                return (
                    <Grid item={true} xs={2} sm={4} key={item.path} sx={{ minWidth: 200 }}>
                        <KleppVideoCard
                            file={item}
                            username={this.props.userName}
                            datetime={new Date(item.uploaded_at).toLocaleDateString('nb-NO', { day: 'numeric', month: 'short', year: 'numeric' })}
                            canDelete={(this.props.userName != null && item.uploaded_at === this.props.userName)}
                            overrideHidden={true}
                            onDelete={() => this.itemDeleted(item.path)}
                        />
                    </Grid>
                )
            })
    };

    renderOwnItems() {
        return this.state.items
            .filter(item => item.uri.endsWith(".mp4") && item.path.includes(this.props.userName!))
            //.sort((a, b) => Date.parse(a.uploaded_at) - Date.parse(b.uploaded_at)).reverse() # Done server-side
            .slice(0, 8)
            .map((item, index) => {
                return (
                    <Grid item={true} xs={2} sm={4} sx={{ minWidth: 200 }} key={item.path}>
                        <KleppVideoCard
                            file={item}
                            username={this.props.userName}
                            datetime={new Date(item.uploaded_at).toLocaleDateString('nb-NO', { day: 'numeric', month: 'short', year: 'numeric' })}
                            canDelete={true}
                            overrideHidden={false}
                            onDelete={this.itemDeleted} />
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
                        <Grid direction="row" container spacing={2} columns={16} key={"gridone"}>
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
                            <Grid direction="row" container spacing={2} columns={16} key={"gridtwo"}>
                                {this.renderOwnItems()}
                            </Grid >
                        }
                    </div>
                </div>
            </div>
        )
    }
}
