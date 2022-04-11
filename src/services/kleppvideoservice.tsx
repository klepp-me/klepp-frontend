import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { API_CONFIG } from "../config/api_config"
import http from "../http-common"
import {
  KleppVideoFile,
  KleppVideoPatch,
  KleppVideoDeleteResponse,
} from "../models/KleppVideoModels"

type VideoResponse = Promise<AxiosResponse<KleppVideoFile>>

class KleppVideoService {
  upload(
    file: File,
    accessToken: string,
    onUploadProgress: (event: ProgressEvent<EventTarget>) => void
  ): VideoResponse {
    const formData = new FormData()
    formData.append("file", file)
    return http.post<KleppVideoFile>("/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
      onUploadProgress,
    })
  }

  delete(
    fileName: string,
    accessToken: string
  ): Promise<AxiosResponse<KleppVideoDeleteResponse>> {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        path: fileName,
      },
    }

    return axios.delete<KleppVideoDeleteResponse>(
      `${API_CONFIG.baseUrl}${API_CONFIG.filesPath}`,
      config
    )
  }

  like(path: string, accessToken: string): VideoResponse {
    const config: AxiosRequestConfig = {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }

    const data = {
      path: path,
    }

    const pathComponent = API_CONFIG.likePath

    return axios.post<KleppVideoFile>(
      `${API_CONFIG.baseUrl}${pathComponent}`,
      data,
      config
    )
  }

  dislike(path: string, accessToken: string): VideoResponse {
    const config: AxiosRequestConfig = {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        path: path,
      },
    }

    const pathComponent = API_CONFIG.likePath

    return axios.delete<KleppVideoFile>(
      `${API_CONFIG.baseUrl}${pathComponent}`,
      config
    )
  }

  updateVideoAttrs(accessToken: string, attrs: KleppVideoPatch): VideoResponse {
    const config: AxiosRequestConfig = {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }

    const pathComponent = API_CONFIG.filesPath

    return axios.patch<KleppVideoFile>(
      `${API_CONFIG.baseUrl}${pathComponent}`,
      attrs,
      config
    )
  }
}

export default new KleppVideoService()
