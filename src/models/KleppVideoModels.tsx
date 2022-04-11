export interface KleppVideoFile {
  display_name: string
  expire_at: string
  hidden: boolean
  likes: KleppUser[]
  thumbnail_uri: string
  user: KleppUser
  uri: string
  path: string
  uploaded_at: string
  tags: KleppVideoTag[]
}

export interface KleppVideoResponse {
  total_count: number
  response: KleppVideoFile[]
}

export interface KleppUser {
  name: string
  thumbnail_uri: string
}

export interface KleppUserResponse {
  total_count: number
  response: KleppUser[]
}

export interface KleppVideoTag {
  name: string
}

export interface KleppVideoPatch {
  path: string
  display_name?: string
  hidden?: boolean
  tags?: KleppVideoTag[]
}

export interface KleppVideoLike {
  path: string
}

export interface KleppVideoDeleteResponse {
  path: string
}

export interface KleppVideoFilesResponse {
  total_count: number
  response: KleppVideoFile[]
}

export interface KleppVideoTagsResponse {
  total_count: number
  response: KleppVideoTag[]
}
