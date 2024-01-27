import { createTheme } from "@mui/material";

const defaultTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#078FFF",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FF8C00",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#00B200",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#FF0000",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#FFC400",
      contrastText: "#FFFFFF",
    },
    text: {
      primary: "#2E2E2E",
      secondary: "#71747D",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorInherit: {
          backgroundColor: "#fff",
        },
      },
      defaultProps: {
        color: "inherit",
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) =>
          theme.unstable_sx({
            borderRadius: 30,
          }),
      },
    },
    MuiDialogContent: {
      styleOverrides: { root: ({ theme }) => theme.unstable_sx({ paddingTop: `${theme.spacing(2)} !important` }) },
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
    fontFamily: "poppins",
  },
});

export default defaultTheme;
