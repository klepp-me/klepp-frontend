import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { API_CONFIG } from "../config/api_config";
import http from "../http-common";
import { KleppVideoFile, KleppVideoPatch } from "../models/KleppVideoModels";

interface patchData {
    [key: string]: any
}

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

    updateVideoAttrs<T = any, R = AxiosResponse<KleppVideoFile>>(accessToken: string, attrs: KleppVideoPatch) {
        const config: AxiosRequestConfig = {
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${accessToken}`,
            }
        };

        var data: patchData = {};

        data["path"] = attrs.path

        if (attrs.hidden != null) {
            data["hidden"] = attrs.hidden
        }

        if (attrs.display_name != null) {
            data["display_name"] = attrs.display_name
        }

        if (attrs.tags != null) {
            data["tags"] = attrs.tags
        }

        const pathComponent = API_CONFIG.filesPath

        return axios.patch<T, R>(`${API_CONFIG.baseUrl}${pathComponent}`, data, config)
    }
}

export default new KleppVideoService();
