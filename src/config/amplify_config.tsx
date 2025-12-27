import { ResourcesConfig } from "aws-amplify"

export const AMPLIFY_CONFIG: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: "eu-north-1_GbN3olElt",
      userPoolClientId: "1ok12ajpbbvbbkbgs4ma6l5v5l",
      loginWith: {
        oauth: {
          domain: "auth.Klepp.me",
          scopes: ["openid"],
          redirectSignIn: ["http://localhost:3000/"],
          redirectSignOut: ["http://localhost:3000/"],
          responseType: "code",
        },
      },
    },
  },
}
