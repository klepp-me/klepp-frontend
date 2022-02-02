import { createTheme } from '@mui/material/styles';
import { red } from "@mui/material/colors";
import { palette } from '@mui/system';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FEECE9',
            light: '#CCD1E4',
            dark: '#FE7E6D'
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
