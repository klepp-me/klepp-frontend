
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
    total_count: number,
    response: KleppVideoFile[]
}

export interface KleppUser {
    name: string,
    thumbnail_uri: string
}

export interface KleppVideoTag {
    name: string
}

export interface KleppVideoTags {
    total_count: number,
    response: KleppVideoTag[]
}

export interface KleppVideoPatch {
    path: string,
    display_name?: string,
    hidden?: boolean,
    tags?: KleppVideoTag[]
}

export interface VideoLike {
    path: string
}
