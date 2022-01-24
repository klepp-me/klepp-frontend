export const  AMPLIFY_CONFIG = {
    Auth: {
      region: 'eu-north-1',
  
      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: 'eu-north-1_GbN3olElt',
  
      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: '1ok12ajpbbvbbkbgs4ma6l5v5l',
  
      // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
      mandatorySignIn: false,
  
      // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
      authenticationFlowType: 'USER_PASSWORD_AUTH',
  
  
      // OPTIONAL - Hosted UI configuration
      oauth: {
        domain: 'auth.Klepp.me',
        scope: ['openid'],
        redirectSignIn: 'http://localhost:3000/',
        redirectSignOut: 'http://localhost:3000/',
        responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
      }
    }
  };
  