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
                <video id="video_el" src={this.props.embedUrl} preload="metadata" height="400px;"
                    width="400px;" controls/>
            </div>
        )
    };
}
