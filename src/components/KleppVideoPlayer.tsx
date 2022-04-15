import React from "react"
import ReactPlayer from "react-player"
import { Helmet, HelmetProvider } from "react-helmet-async"

interface KleppVideoPlayerItem {
  embedUrl: string
  thumbnailUri: string
}

export default class KleppVideoPlayer extends React.Component<KleppVideoPlayerItem> {
  constructor(props: KleppVideoPlayerItem) {
    super(props)
  }

  render() {
    return (
      <div className='klepp-videocontainer'>
        <ReactPlayer
          className='klepp-videoplayer'
          width='100%'
          height='100%'
          url={this.props.embedUrl}
          light={this.props.thumbnailUri}
          config={{
            // Set light to true to prevent prefetching of all videos. Instead show a thumbnail.
            file: {
              forceVideo: true,
              attributes: {
                controls: true,
              },
            },
          }}
        />
      </div>
    )
  }
}
