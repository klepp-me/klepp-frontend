import { createTheme } from "@mui/material/styles"
import { orange, red } from "@mui/material/colors"

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#10b981", // Emerald green
      light: "#34d399",
      dark: "#059669",
    },
    secondary: {
      main: "#10b981",
      light: "#34d399",
      dark: "#059669",
    },
    background: {
      default: "#0f172a", // Slate 900
      paper: "#1e293b", // Slate 800
    },
    error: {
      main: red.A400,
    },
    warning: {
      main: orange.A700,
    },
    text: {
      primary: "#f1f5f9", // Slate 100
      secondary: "#94a3b8", // Slate 400
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: ["Inter", "Roboto", "sans-serif"].join(","),
    h4: {
      fontWeight: 600,
      letterSpacing: "-0.02em",
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: "linear-gradient(145deg, #1e293b 0%, #0f172a 100%)",
          borderRadius: 16,
          border: "1px solid rgba(148, 163, 184, 0.1)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          background: "transparent",
          color: "#f1f5f9",
          padding: "16px",
          "&:last-child": {
            paddingBottom: "16px",
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          background: "rgba(15, 23, 42, 0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
          color: "white",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "transparent",
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
          padding: "8px 16px",
          fontSize: "0.875rem",
        },
        contained: {
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
          "&:hover": {
            background: "linear-gradient(135deg, #34d399 0%, #10b981 100%)",
            boxShadow: "0 4px 12px rgba(16, 185, 129, 0.4)",
          },
          "&.Mui-disabled": {
            background: "#334155",
            color: "#64748b",
            boxShadow: "none",
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          [`&.MuiButton-root.Mui-disabled`]: {
            background: "#334155",
            color: "#64748b",
            opacity: 1,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(30, 41, 59, 0.5)",
            borderRadius: 12,
            transition: "all 0.2s ease",
            "& fieldset": {
              borderColor: "rgba(148, 163, 184, 0.2)",
              transition: "all 0.2s ease",
            },
            "&:hover fieldset": {
              borderColor: "rgba(16, 185, 129, 0.5)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#10b981",
              boxShadow: "0 0 0 3px rgba(16, 185, 129, 0.1)",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#94a3b8",
            "&.Mui-focused": {
              color: "#10b981",
            },
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1e293b",
          border: "1px solid rgba(148, 163, 184, 0.2)",
          borderRadius: 12,
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
        },
        option: {
          "&:hover": {
            backgroundColor: "rgba(16, 185, 129, 0.1)",
          },
          '&[aria-selected="true"]': {
            backgroundColor: "rgba(16, 185, 129, 0.2)",
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
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#1e293b",
          border: "1px solid rgba(148, 163, 184, 0.2)",
          borderRadius: 8,
          fontSize: "0.875rem",
          padding: "8px 12px",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(16, 185, 129, 0.15)",
          color: "#10b981",
          borderRadius: 8,
        },
      },
    },
  },
})

export default theme
