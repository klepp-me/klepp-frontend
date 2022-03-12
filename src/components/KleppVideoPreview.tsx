import ReactPlayer from "react-player";
import { useSearchParams } from 'react-router-dom';
import { API_CONFIG } from "../config/api_config";


function KleppVideoPlayer() {
    const [searchParams] = useSearchParams();

    function getValidUri() {
        if (`${searchParams.get("uri")}` != null && `${searchParams.get("uri")}`.startsWith(`${API_CONFIG.fileBaseUrl}`)) {
            return `${searchParams.get("uri")}`;
        } else {
            throw new Error("Unsupported uri path");
        }
    }

    return (
        <div className='klepp-videopreview-container'>  
            <ReactPlayer className='klepp-videoplayer' width='100%' height='100%' url={getValidUri()} light={false} config={{
                file: {
                    forceVideo: true,
                    attributes: {
                        controls: true
                    }
                }
            }} />
        </div >
    )
};

export default KleppVideoPlayer;
