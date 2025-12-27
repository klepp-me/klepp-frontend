import ReactPlayer from "react-player"

interface KleppVideoPlayerItem {
  embedUrl: string
  thumbnailUri: string
  isExpanded: boolean
}

export default function KleppVideoPlayer({
  embedUrl,
  thumbnailUri,
  isExpanded,
}: KleppVideoPlayerItem) {
  return (
    <div
      className={`klepp-videocontainer ${
        isExpanded ? "klepp-videocontainer-expanded" : ""
      }`}>
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
