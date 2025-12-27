import ReactPlayer from "react-player"

interface KleppVideoPlayerItem {
  embedUrl: string
  thumbnailUri: string
}

export default function KleppVideoPlayer({
  embedUrl,
  thumbnailUri,
}: KleppVideoPlayerItem) {
  return (
    <div className='klepp-videocontainer'>
      <ReactPlayer
        className='klepp-videoplayer'
        width='100%'
        height='100%'
        src={embedUrl}
        light={thumbnailUri}
        controls
      />
    </div>
  )
}
