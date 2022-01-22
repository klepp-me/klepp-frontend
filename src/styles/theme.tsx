import { createTheme } from '@mui/material/styles';
import { red } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: '#460088',
            light: '#7937b9',
            dark: '#0e005a'
        },
        secondary: {
            main: '#7cb342',
            light: '#aee571',
            dark: '#4b830d'
        },
        error: {
            main: red.A400
        }
    },
    typography: {
        fontFamily: [
            'Roboto'
        ].join(','),
    },
});

export default theme;
