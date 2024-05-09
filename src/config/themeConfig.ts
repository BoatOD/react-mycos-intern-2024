import { createTheme } from "@mui/material";
import { brown, grey } from "@mui/material/colors";

export const themeConfig = createTheme({
  palette: {
    primary: {
      main: "#ffd205",
      contrastText: brown[700],
    },
    secondary: {
      main: grey[600],
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
  },
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif',
    ].join(','),
  }
});
