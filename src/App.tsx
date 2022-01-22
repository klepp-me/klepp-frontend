import './App.css';
import Header from './components/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import theme from './styles/theme';
import KleppVideoPlayer from './components/KleppVideoPlayer';
import KleppVideoGrid from './components/KleppVideoGrid';
import KleppFrontPage from './components/KleppFrontPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App ">
        {/* <Header isLoggedIn={true} /> */}
        <KleppFrontPage logo="/assets/klepp_logo.png" title="Klepp.me" subtitle="Where minimovies come alive"/> 
        <KleppVideoGrid />
      </div>
    </ThemeProvider>
  );
}

export default App;
