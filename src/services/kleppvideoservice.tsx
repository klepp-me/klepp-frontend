import axios, {
  AxiosProgressEvent,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios"
import { API_CONFIG } from "../config/api_config"

import {
  KleppVideoFile,
  KleppVideoPatch,
  KleppVideoDeleteResponse,
  KleppVideoFilesResponse,
  KleppUserResponse,
  KleppVideoTagsResponse,
} from "../models/KleppVideoModels"
import { fetchAuthSession } from "aws-amplify/auth"

type VideoResponse = Promise<AxiosResponse<KleppVideoFile>>

const onRequest = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  config.headers.set("accept", "application/json")
  if (config.headers.get("Content-Type") !== "multipart/form-data") {
    config.headers.set("Content-Type", "application/json")
  }

  try {
    const session = await fetchAuthSession()
    const jwtToken = session.tokens?.accessToken?.toString()
    if (jwtToken) {
      config.headers.set("Authorization", `Bearer ${jwtToken}`)
    }
  } catch {
    // User is not authenticated, continue without token
  }

  return config
}

axios.interceptors.request.use(onRequest)

class KleppVideoService {
  upload(
    file: File,
    onUploadProgress: (event: AxiosProgressEvent) => void
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
