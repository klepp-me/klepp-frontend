import ReactPlayer from "react-player"
import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import kleppVideoService from "../services/kleppvideoservice"
import { KleppVideoFile } from "../models/KleppVideoModels"

function KleppVideoPreview() {
  const [searchParams] = useSearchParams()
  const [video, setVideo] = useState<KleppVideoFile | null>(null)

  useEffect(() => {
    const path = searchParams.get("path")
    if (path != null) {
      kleppVideoService.getFiles(`?path=${path}`).then(res => {
        if (res.data.response) {
          setVideo(res.data.response[0])
        } else {
          setVideo(null)
        }
      })
    }
  }, [searchParams])

  return (
    <div>
      <div className='klepp-videopreview-container'>
        <ReactPlayer
          className='klepp-videoplayer'
          width='100%'
          height='100%'
          src={video?.uri}
          light={false}
          controls
        />
      </div>
    </div>
  )
}

export default KleppVideoPreview
