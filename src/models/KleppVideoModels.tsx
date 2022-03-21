
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
