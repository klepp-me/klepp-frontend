import { SnackbarProvider } from "notistack"
import { styled } from "@mui/material"
import theme from "../../styles/theme"

const StyledSnackbarProvider = styled(SnackbarProvider)`
  &.SnackbarItem-variantSuccess {
    background-color: ${theme.palette.secondary.main};
  }
  &.SnackbarItem-variantWarning {
    background-color: ${theme.palette.warning.main};
  }
  &.SnackbarItem-variantError {
    background-color: ${theme.palette.error.main};
  }
`
export default StyledSnackbarProvider
