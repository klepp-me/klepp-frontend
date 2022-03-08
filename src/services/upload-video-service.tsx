import http from "../http-common";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { API_CONFIG } from "../config/api_config";

class UploadFilesService {

    upload(file: any, accessToken: string, onUploadProgress: (event: ProgressEvent<EventTarget>) => void) {
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

    delete<T = any, R = AxiosResponse<T>>(fileName: string, accessToken: string) {
        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                "fileName": fileName
            }
        };

        return axios.delete<T, R>(`${API_CONFIG.baseUrl}${API_CONFIG.filesPath}`, config);
    }

    hide<T = any, R = AxiosResponse<T>>(hide: boolean, fileName: string, accessToken: string) {
        const fileNameArr = fileName.split("/");
        if (!hide) {
            fileName = `${fileNameArr[0]}/hidden/${fileNameArr[2]}`
            console.log(fileName)
        }

        const config: AxiosRequestConfig = {
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${accessToken}`,
            }
        };

        const data = {
            "fileName": fileName
        };

        const pathComponent = hide ? API_CONFIG.hideFilePath : API_CONFIG.showFilePath
    
        return axios.post<T, R>(`${API_CONFIG.baseUrl}${pathComponent}`, data, config);
    }
}

export default new UploadFilesService();
