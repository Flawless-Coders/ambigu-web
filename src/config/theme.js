import { createTheme } from "@mui/material/styles";
import "@fontsource/italianno"

const theme = createTheme({
    palette: {
      primary: {
        main: "#15A752",
        light: "#5FCF88",
        dark: "#0E7A3F",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#6C63FF", 
        light: "#A09CFF",
        dark: "#4842B7",
        contrastText: "#FFFFFF",
      },
      background: {
        default: "#F4F4F4", 
        paper: "#FFFFFF", 
      },
      text: {
        primary: "#333333",
        secondary: "#555555",
      },
    },
    typography: {
      fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
      h1: { fontSize: "2.5rem", fontWeight: 600 },
      h2: { fontSize: "2rem", fontWeight: 500 },
      h3: { fontSize: "1.75rem", fontWeight: 500 },
      button: { textTransform: "none", fontWeight: 600 },
      logo: {
        fontFamily: "'Italianno', cursive",
        fontSize: "2.5rem",
      }
    },
  });
  
  export default theme;