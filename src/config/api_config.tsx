export class API_CONFIG {
  static readonly apiVersion = "v2"
  static readonly baseUrl = `https://api.klepp.me/api/${API_CONFIG.apiVersion}/`
  static readonly webBaseUrl = "https://klepp.me/"
  static readonly fileBaseUrl = "https://gg.klepp.me/"

  // Endpoints
  static readonly filesPath = "files"
  static readonly hideFilePath = "hide"
  static readonly showFilePath = "show"
  static readonly likePath = "like"
  static readonly usersPath = "users"
  static readonly tagsPath = "tags"
}
