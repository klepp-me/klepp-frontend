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
            <div className="frontPage" style={{ paddingTop: 16 }}>
            </div>
        )
    }
}
