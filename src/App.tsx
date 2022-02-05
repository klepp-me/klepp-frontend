import './App.css';
import Header from './components/Header';
import { ThemeProvider } from '@mui/material/styles'
import theme from './styles/theme';
import KleppVideoGrid from './components/KleppVideoGrid';
import KleppFrontPage from './components/KleppFrontPage';
import Amplify, { Auth } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { AMPLIFY_CONFIG } from './config/amplify_config';
import useAuth from './contexts/AuthContextProvider';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { FRONTPAGE_TEXT } from './enums/AppTextTypes';
import Login from './components/Login';

Amplify.configure(AMPLIFY_CONFIG);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

function Main() {
  const { user, accessToken, signOut, userName } = useAuth()
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <KleppFrontPage logo="/assets/klepp_logo_boge_small.png" title={FRONTPAGE_TEXT.TITLE} subtitle={FRONTPAGE_TEXT.SUBTITLE} />
        <KleppVideoGrid />
        {accessToken && userName && <KleppVideoGrid accessToken={accessToken} userName={userName} />}
      </div>
    </ThemeProvider>)
}

export default App;
