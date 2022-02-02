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
import { AMPLIFY_CONFIG } from './config/amplify_config';
import useAuth from './contexts/AuthContextProvider';
import { Routes, Route, Link } from "react-router-dom";


Amplify.configure(AMPLIFY_CONFIG);

// You can get the current config object
const currentConfig = Auth.configure();

function App() {
  const { user, accessToken, showSignUp, signOut, signIn } = useAuth()

  if ((user && accessToken) || !showSignUp) {
    return (
      <ThemeProvider theme={theme}>
        <div className="App ">
          <Header />
          {user ? <Button onClick={signOut} color={'inherit'}>Logg ut</Button> : <Button onClick={signIn} color={'inherit'}>Logg inn</Button>}
          <KleppFrontPage logo="/assets/klepp_logo.png" title="Klepp.me" subtitle="Where minimovies come alive" />
          <KleppVideoGrid />
          {accessToken && <KleppVideoGrid accessToken={accessToken} /> }
        </div>
      </ThemeProvider>)
  } else {
    return (
      <Authenticator signUpAttributes={['email']}>
        {({ user, signOut }) => (<></>)}
      </Authenticator>
    );
  }
}

export default App;
