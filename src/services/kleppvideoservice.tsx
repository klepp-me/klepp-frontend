import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { API_CONFIG } from "../config/api_config"

import {
  KleppVideoFile,
  KleppVideoPatch,
  KleppVideoDeleteResponse,
  KleppVideoFilesResponse,
  KleppUserResponse,
  KleppVideoTagsResponse,
} from "../models/KleppVideoModels"
import { Auth } from "aws-amplify"

type VideoResponse = Promise<AxiosResponse<KleppVideoFile>>

const onRequest = (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  // If the user is authenticated, inject the bearer token
  // If the user is anonymous, return default config
  config = {
    ...config,
    headers: {
      ...config.headers,
      accept: "application/json",
      "Content-Type":
        config.headers &&
        config.headers["Content-Type"] === "multipart/form-data"
          ? "multipart/form-data"
          : "application/json",
    },
  }
  return Auth.currentSession()
    .then(session => {
      const jwtToken = session.getAccessToken().getJwtToken()
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    })
    .catch(() => {
      return config
    })
}

axios.interceptors.request.use(onRequest)

class KleppVideoService {
  upload(
    file: File,
    onUploadProgress: (event: ProgressEvent<EventTarget>) => void
  ): VideoResponse {
    const formData = new FormData()
    formData.append("file", file)
    return axios.post(
      `${API_CONFIG.baseUrl}${API_CONFIG.filesPath}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        // https://github.com/axios/axios/issues/4406 - Bug in current axios version
        transformRequest: formData => formData, // TODO: Remove when bug is fixed
        onUploadProgress,
      }
    )
  }

  getFiles(query: string): Promise<AxiosResponse<KleppVideoFilesResponse>> {
    console.log(`${API_CONFIG.baseUrl}${API_CONFIG.filesPath}${query}`)

    return axios.get<KleppVideoFilesResponse>(
      `${API_CONFIG.baseUrl}${API_CONFIG.filesPath}${query}`
    )
  }

  getUsers(): Promise<AxiosResponse<KleppUserResponse>> {
    return axios.get<KleppUserResponse>(
      `${API_CONFIG.baseUrl}${API_CONFIG.usersPath}`
    )
  }

  getTags(): Promise<AxiosResponse<KleppVideoTagsResponse>> {
    return axios.get<KleppVideoTagsResponse>(
      `${API_CONFIG.baseUrl}${API_CONFIG.tagsPath}`
    )
  }

  delete(fileName: string): Promise<AxiosResponse<KleppVideoDeleteResponse>> {
    const config = {
      data: {
        path: fileName,
      },
    }

    return axios.delete<KleppVideoDeleteResponse>(
      `${API_CONFIG.baseUrl}${API_CONFIG.filesPath}`,
      config
    )
  }

  like(path: string): VideoResponse {
    const data = {
      path: path,
    }
    const pathComponent = API_CONFIG.likePath

    return axios.post<KleppVideoFile>(
      `${API_CONFIG.baseUrl}${pathComponent}`,
      data
    )
  }

  dislike(path: string): VideoResponse {
    const config: AxiosRequestConfig = {
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

  updateVideoAttrs(attrs: KleppVideoPatch): VideoResponse {
    const pathComponent = API_CONFIG.filesPath

    return axios.patch<KleppVideoFile>(
      `${API_CONFIG.baseUrl}${pathComponent}`,
      attrs
    )
  }
}

export default new KleppVideoService()
