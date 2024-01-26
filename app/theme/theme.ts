import { createTheme } from "@mui/material";

const defaultTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#078FFF",
    },
    secondary: {
      main: "#078FFF",
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
