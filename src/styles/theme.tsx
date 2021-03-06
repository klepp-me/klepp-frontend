import { createTheme } from "@mui/material/styles"
import { orange, red } from "@mui/material/colors"

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FEECE9",
      light: "#CCD1E4",
      dark: "#FE7E6D",
    },
    secondary: {
      main: "#004d40",
      light: "#39796b",
      dark: "#00251a",
    },
    error: {
      main: red.A400,
    },
    warning: {
      main: orange.A700,
    },
  },
  typography: {
    fontFamily: ["Roboto"].join(","),
  },
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          background: "#000a12",
          color: "#ffffff",
          borderColor: "#ffffff00",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          background: "#0f2027",
          color: "white",
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          [`&.MuiButton-root.Mui-disabled`]: {
            opacity: "0.3",
            color: "black",
            backgroundColor: "grey",
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          display: "flex",
        },
      },
    },
  },
})

export default theme
