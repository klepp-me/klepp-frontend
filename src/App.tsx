import './App.css';
import Header from './components/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import theme from './styles/theme';
import KleppVideoPlayer from './components/KleppVideoPlayer';
import KleppVideoGrid from './components/KleppVideoGrid';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header isLoggedIn={true} />
        <KleppVideoGrid />
      </div>
    </ThemeProvider>
  );
}

export default App;
