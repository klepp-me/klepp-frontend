import http from "../http-common";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { API_CONFIG } from "../config/api_config";
import { KleppVideoFile } from "../models/KleppVideoModels";

class KleppVideoService {
    upload<T = any, R = AxiosResponse<T>>(file: any, accessToken: string, onUploadProgress: (event: ProgressEvent<EventTarget>) => void) {
        let formData = new FormData();
        formData.append("file", file);
        return http.post<T, R>("/files", formData, {
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
                "path": fileName
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

    like<T = any, R = AxiosResponse<KleppVideoFile>>(path: string, accessToken: string) {
        const config: AxiosRequestConfig = {
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${accessToken}`,
            }
        };

        const data = {
            "path": path
        };

        const pathComponent = API_CONFIG.likePath

        return axios.post<T, R>(`${API_CONFIG.baseUrl}${pathComponent}`, data, config)
    }

    dislike<T = any, R = AxiosResponse<KleppVideoFile>>(path: string, accessToken: string) {
        const config: AxiosRequestConfig = {
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${accessToken}`,
            },
            data: {
                "path": path
            }
        };

        const pathComponent = API_CONFIG.likePath

        return axios.delete<T, R>(`${API_CONFIG.baseUrl}${pathComponent}`, config)
    }
}

export default new KleppVideoService();
