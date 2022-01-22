import React from "react"

interface KleppVideoPlayerItem {
    embedUrl: string
}


export default class KleppVideoPlayer extends React.Component<KleppVideoPlayerItem> {

    constructor(props: KleppVideoPlayerItem) {
        super(props);
    }

    render() {
        return (
            <div className="VideoPlayer">
                <video id={this.props.embedUrl} src={this.props.embedUrl} preload="metadata" height="320"
                    width="100%" controls/>
            </div>
        )
    };
}
