import http from "../http-common";

class UploadFilesService {
    upload(file: any, accessToken: string, onUploadProgress: (event: ProgressEvent<EventTarget>) => void )  {
        let formData = new FormData();
        formData.append("file", file);
        return http.post("/files", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${accessToken}`
            },
            onUploadProgress,
        });
    }

    // TODO Add get / delete operations here 
}

export default new UploadFilesService();
