import { Typography } from "@mui/material";
import React from "react"

// TODO: Refactor to functional component?

interface KleppFrontPageProps {
    logo: string
    title: string
    subtitle: string
}

export default class KleppFrontPage extends React.Component<KleppFrontPageProps> {
    constructor(props: KleppFrontPageProps) {
        super(props);
    }

    render() {
        return (
            <div className="frontPage" style={{ paddingTop: 20 }}>
                <Typography variant="h2" color="white">{this.props.title}</Typography>
                <Typography variant="h4" color="white">{this.props.subtitle}</Typography>
                <img src={this.props.logo} alt="klepp-frontend-logo" width="200" height="200" />
            </div>
        )
    }
}
