import React from "react"

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
                <img src={this.props.logo} alt="klepp-frontend-logo" width="239" height="230" />
            </div>
        )
    }
}
