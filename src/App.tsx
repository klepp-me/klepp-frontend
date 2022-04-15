import "./App.css"
import Header from "./components/Header"
import { ThemeProvider } from "@mui/material/styles"
import theme from "./styles/theme"
import KleppVideoGrid from "./components/KleppVideoGrid"
import KleppFrontPage from "./components/KleppFrontPage"
import { Amplify as Amplify } from "aws-amplify"
import "@aws-amplify/ui-react/styles.css"
import { AMPLIFY_CONFIG } from "./config/amplify_config"
import { Routes, Route, HashRouter } from "react-router-dom"
import { FRONTPAGE_TEXT } from "./enums/AppTextTypes"
import Login from "./components/Login"
import UploadFile from "./components/UploadFile"
import KleppVideoPreview from "./components/KleppVideoPreview"
import { Container } from "@mui/material"

import { Helmet, HelmetProvider } from "react-helmet-async"

Amplify.configure(AMPLIFY_CONFIG)

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        {/*Defaults*/}
        <meta charSet='utf-8' />
        <link rel='icon' href={`${process.env.PUBLIC_URL}/favicon.ico`} />
        <link rel='manifest' href={`${process.env.PUBLIC_URL}/manifest.json`} />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#000000' />
        <meta property='og:description' content="Klepp it like it's hot" />
        <meta property='og:title' content='Klepp' />
        <title>Klepp</title>

        {/*Override these*/}
        {/*<meta property='og:type' content='video' />*/}
        {/*<meta*/}
        {/*  property='og:url'*/}
        {/*  content='https://klepp.me/#/video?uri=https://gg.klepp.me/hotfix/13.mp4'*/}
        {/*/>*/}
        {/*<meta property='og:image' content='https://gg.klepp.me/hotfix/13.png' />*/}
      </Helmet>
      <HashRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/upload' element={<UploadFile />} />
          <Route path='/video' element={<KleppVideoPreview />} />
        </Routes>
      </HashRouter>
    </HelmetProvider>
  )
}

function Main() {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Header />
        <KleppFrontPage
          logo='assets/kleppwhite.png'
          title={FRONTPAGE_TEXT.TITLE}
          subtitle={FRONTPAGE_TEXT.SUBTITLE}
        />
        <Container maxWidth='xl'>
          <KleppVideoGrid />
        </Container>
      </div>
    </ThemeProvider>
  )
}

export default App
