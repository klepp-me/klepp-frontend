import { Divider, Grid, Typography } from "@mui/material";
import axios from "axios";
import React from "react"
import { API_CONFIG } from "../config/api_config";
import KleppVideoCard from "./KleppVideoCard";

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

         axios.get<KleppVideoResponse>(`${API_CONFIG.baseUrl}files`, config).then(res => {
            this.setState({
                items: res.data.files,
                hiddenItems: res.data.hiddenFiles
            })
        }).catch(e => {
            console.error(e);
        })
    }

    itemDeleted = (fileName: string) => {
        this.setState(prevState => ({
            items: prevState.items.filter(item => item.fileName !== fileName),
            hiddenItems: prevState.hiddenItems.filter(item => item.fileName !== fileName)
        }))
    };


    renderItems() {
        return this.state.items
            .filter(item => item.uri.endsWith(".mp4")) // Done in aws
            .sort((a, b) => Date.parse(a.datetime) - Date.parse(b.datetime)).reverse()
            .slice(0, 12) // For development, so we dont have to load 100x videos every time ¯\_(ツ)_/¯ 
            .map((item, index, key) => {
                return (
                    <Grid item={true} xs={2} sm={4} key={item.fileName}>
                        <KleppVideoCard key={item.datetime}
                            title={item.fileName.split("/").pop()!}
                            owner={item.username}
                            uri={item.uri}
                            fileName={item.fileName}
                            datetime={new Date(item.datetime).toLocaleDateString('nb-NO', { day: 'numeric', month: 'short', year: 'numeric' })}
                            canDelete={(this.props.userName != null && item.username === this.props.userName)}
                            isHidden={false}
                            overrideHidden={true}
                            onDelete={() => this.itemDeleted(item.fileName)}
                        />
                    </Grid>
                )
            })
    };

    renderOwnItems() {
        return this.state.items
            .filter(item => item.uri.endsWith(".mp4") && item.fileName.includes(this.props.userName!))
            .sort((a, b) => Date.parse(a.datetime) - Date.parse(b.datetime)).reverse()
            .slice(0, 4)
            .map((item, index) => {
                return (
                    <Grid item={true} xs={2} sm={4}>
                        <KleppVideoCard
                            title={item.fileName.split("/").pop()!}
                            owner={item.username}
                            uri={item.uri}
                            fileName={item.fileName}
                            datetime={new Date(item.datetime).toLocaleDateString('nb-NO', { day: 'numeric', month: 'short', year: 'numeric' })}
                            isHidden={this.state.hiddenItems.find(privateItem => item.fileName === privateItem.fileName) != null}
                            canDelete={true}
                            overrideHidden={false}
                            onDelete={this.itemDeleted} />
                    </Grid>
                )
            })
    };

    renderHiddenItems() {
        return this.state.hiddenItems
            .filter(item => item.uri.endsWith(".mp4"))
            .sort((a, b) => Date.parse(a.datetime) - Date.parse(b.datetime)).reverse()
            .slice(0, 4) // Remove this to show all items, to save bandwith in debugging..
            .map((item, index) => {
                return (
                    <Grid item={true} xs={2} sm={4} key={item.fileName}>
                        <KleppVideoCard
                            title={item.fileName.split("/").pop()!}
                            owner={item.username}
                            uri={item.uri}
                            fileName={item.fileName}
                            datetime={new Date(item.datetime).toLocaleDateString('nb-NO', { day: 'numeric', month: 'short', year: 'numeric' })}
                            isHidden={true}
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
            {/*     {this.state.hiddenItems.length > 0 && <div style={{ marginTop: 16, paddingBottom: 16 }}>
                    <Divider variant="middle" sx={{ height: 12, borderBottomWidth: 2 }} />
                    <Typography variant="h4" color="white" sx={{ mt: 2, textAlign: 'left', ml: 2 }}>Mine private videoer</Typography>
                    <div className="privateHiddenVideoGrid" style={{ marginTop: 12, marginLeft: 16, marginRight: 16 }}>
                        {this.state.hiddenItems &&
                            <Grid direction="row" container spacing={2} columns={16} key={"gridthree"}>
                                {this.renderHiddenItems()}
                            </Grid >
                        }
                    </div>
                </div>
                } */}
            </div>
        )
    }
}
