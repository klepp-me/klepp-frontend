export class API_CONFIG  {
    static readonly baseUrl = "https://api.klepp.me/api/v1/"
    static readonly webBaseUrl = `${process.env.PUBLIC_URL}`

    // Endpoints
    static readonly filesPath = "files"
    static readonly hideFilePath = "hide"
    static readonly showFilePath = "show"
};
