import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",

    background: {
      default: "rgba(255, 255, 255, 0)",
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",

    primary: {
      light: "#B287FF",
      main: "#9155FD",
      dark: "#6D3DCB",
    },

    secondary: {
      light: "#C8D6FF",
      main: "#87B2FF",
      dark: "#4F79FF",
    },

    background: {
      default: "#f5f5f5",
      paper: "#FFFFFF",
      paperLight: "rgba(58, 53, 65, 0.05)",
    },

    text: {
      primary: "#6f6f7a",
      secondary: "#8e8e9c",
    },

    divider: "rgba(0, 0, 0, 0.12)",
  },
});