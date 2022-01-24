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


Amplify.configure(AMPLIFY_CONFIG);

// You can get the current config object
const currentConfig = Auth.configure();

function App() {
  const { user, accessToken } = useAuth()

  if (user && accessToken) {
    return (
      <ThemeProvider theme={theme}>
        <div className="App ">
          <Header />
          <KleppFrontPage logo="/assets/klepp_logo.png" title="Klepp.me" subtitle="Where minimovies come alive" />
          <KleppVideoGrid accessToken={accessToken} />
        </div>
      </ThemeProvider>)
  } else {
    return (
      <Authenticator signUpAttributes={['email']}>
        {({ user, signOut }) => (
          <ThemeProvider theme={theme}>
            <div className="App ">
              <Header />
              <Button onClick={signOut} color={'inherit'}>Logg ut</Button>
              <KleppFrontPage logo="/assets/klepp_logo.png" title="Klepp.me" subtitle="Where minimovies come alive" />
              <KleppVideoGrid />
            </div>
          </ThemeProvider>)}
      </Authenticator>
    );
  }
}


export default App;
