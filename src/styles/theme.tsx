import { createTheme } from '@mui/material/styles';
import { red } from "@mui/material/colors";
import { palette } from '@mui/system';

const theme = createTheme({
    palette: {
        primary: {
            main: '#3e2723',
            light: '#6a4f4b',
            dark: '#1b0000'
        },
        secondary: {
            main: '#263238',
            light: '#4f5b62',
            dark: '#000a12'
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
    components: {
        MuiCardContent: {
            styleOverrides: {
                root: {
                    background: '#000a12',
                    color: '#ffffff',
                    borderColor: '#ffffff00'
                }
            }
        }
    }
});

export default theme;
