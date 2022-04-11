import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { API_CONFIG } from "../config/api_config"
import http from "../http-common"
import {
  KleppVideoFile,
  KleppVideoPatch,
  KleppVideoDeleteResponse,
  KleppVideoFilesResponse,
  KleppUser,
  KleppUserResponse,
  KleppVideoTag,
  KleppVideoTagsResponse,
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

  getFiles(
    query: string,
    accessToken?: string
  ): Promise<AxiosResponse<KleppVideoFilesResponse>> {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }

    console.log(`${API_CONFIG.baseUrl}${API_CONFIG.filesPath}${query}`)

    return axios.get<KleppVideoFilesResponse>(
      `${API_CONFIG.baseUrl}${API_CONFIG.filesPath}${query}`,
      config
    )
  }

  getUsers(accessToken?: string): Promise<AxiosResponse<KleppUserResponse>> {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }

    return axios.get<KleppUserResponse>(
      `${API_CONFIG.baseUrl}${API_CONFIG.usersPath}`,
      config
    )
  }

  getTags(
    accessToken?: string
  ): Promise<AxiosResponse<KleppVideoTagsResponse>> {
    const config = this.getDefaultHeaders(accessToken)

    return axios.get<KleppVideoTagsResponse>(
      `${API_CONFIG.baseUrl}${API_CONFIG.tagsPath}`,
      config
    )
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

  getDefaultHeaders(accessToken?: string) {
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  }
}

export default new KleppVideoService()
