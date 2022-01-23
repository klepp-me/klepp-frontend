import './App.css';
import Header from './components/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import theme from './styles/theme';
import KleppVideoGrid from './components/KleppVideoGrid';
import KleppFrontPage from './components/KleppFrontPage';
import Amplify, { Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Button } from '@mui/material';


Amplify.configure({
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
});

// You can get the current config object
const currentConfig = Auth.configure();

function App() {
  return (
    <Authenticator signUpAttributes={['email']}>
      {({ user, signOut }) => (
        <ThemeProvider theme={theme}>
          <div className="App ">
            <Header userName={user.username} />
            <Button onClick={signOut} color={'inherit'}>Logg ut</Button>
            <KleppFrontPage logo="/assets/klepp_logo.png" title="Klepp.me" subtitle="Where minimovies come alive" />
            <KleppVideoGrid />
          </div>
          )
        </ThemeProvider>)}
    </Authenticator>
  );
}

export default App;
