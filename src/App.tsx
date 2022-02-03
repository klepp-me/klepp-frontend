import './App.css';
import Header from './components/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import theme from './styles/theme';
import KleppVideoGrid from './components/KleppVideoGrid';
import KleppFrontPage from './components/KleppFrontPage';
import Amplify, { Auth } from 'aws-amplify';
import { Authenticator, Image, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Button, Typography } from '@mui/material';
import { AMPLIFY_CONFIG } from './config/amplify_config';
import useAuth from './contexts/AuthContextProvider';
import { Routes, Route, Link } from "react-router-dom";
import { FRONTPAGE_TEXT } from './enums/AppTextTypes';
import { useTheme } from '@emotion/react';


Amplify.configure(AMPLIFY_CONFIG);

// You can get the current config object
const currentConfig = Auth.configure();

function App() {
  const { user, accessToken, showSignUp, signOut, signIn, userName } = useAuth()

  if ((user && accessToken && userName) || !showSignUp) {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header />
          {user ? <Button onClick={signOut} color={'inherit'}>Logg ut</Button> : <Button onClick={signIn} color={'inherit'}>Logg inn</Button>}
          <KleppFrontPage logo="/assets/klepp_logo_boge_small.png" title={FRONTPAGE_TEXT.TITLE} subtitle={FRONTPAGE_TEXT.SUBTITLE} />
          <KleppVideoGrid />
          {accessToken && userName && <KleppVideoGrid accessToken={accessToken} userName={userName} />}
        </div>
      </ThemeProvider>)
  } else {
    return (
      <ThemeProvider theme={theme}>
        <div style={{ margin: 20 }} className="AuthContainer">
          <Authenticator signUpAttributes={['email']} components={authComponents} >
            {({ user, signOut }) => (<></>)}
          </Authenticator>
        </div>
      </ThemeProvider>);
  }
}

const authComponents = {
  Header() {
    return (
      <View textAlign="center" padding="20">
        <Image
          alt="Amplify logo"
          src="/assets/klepp_logo_boge_small.png"
          width={200}
          height={200}
          margin={20}
        />
      </View>
    );
  },

  Footer() {
    return (
      <View textAlign="center">
        <Typography variant='subtitle1' color='white' sx={{ mt: 2 }}>© Laget med kjærlighet av de tre vise menn</Typography>
      </View>
    )
  }
}

export default App;
