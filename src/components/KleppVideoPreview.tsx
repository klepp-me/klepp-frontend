import ReactPlayer from "react-player"
import { useSearchParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import React, { useEffect, useState } from "react"
import kleppVideoService from "../services/kleppvideoservice"
import { KleppVideoFile } from "../models/KleppVideoModels"

function KleppVideoPlayer() {
  const [searchParams] = useSearchParams()
  const [video, setVideo] = useState<KleppVideoFile | null>(null)

  useEffect(() => {
    getVideo()
  }, [searchParams])

  function getVideo() {
    if (`${searchParams.get("path")}` != null) {
      kleppVideoService
        .getFiles(`?path=${searchParams.get("path")}`)
        .then(res => {
          if (res.data.response) {
            setVideo(res.data.response[0])
          } else {
            setVideo(null)
          }
        })
    }
  }

  return (
    <div>
      <Helmet>
        <meta property='og:title' content='Klepp' />
        <meta property='og:type' content='video' />
        <meta property='og:url' content={video?.uri} />
        <meta property='og:image' content={video?.thumbnail_uri} />
      </Helmet>

      <div className='klepp-videopreview-container'>
        <ReactPlayer
          className='klepp-videoplayer'
          width='100%'
          height='100%'
          url={video?.uri}
          light={false}
          config={{
            file: {
              forceVideo: true,
              attributes: {
                controls: true,
              },
            },
          }}
        />
      </div>
    </div>
  )
}

export default KleppVideoPlayer
