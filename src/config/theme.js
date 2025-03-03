import { createTheme } from "@mui/material/styles";
import "@fontsource/italianno"
import "typeface-barlow"

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
      sidebar: {
        bg: '#1E1E2D',       
        text: '#ffffff',      
        hover: 'rgba(255, 255, 255, 0.08)', 
        selected: 'rgba(255, 255, 255, 0.16)', 
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
      },
      footer: {
        fontFamily: "'Barlow', sans-serif",
        fontSize: "0.8rem",
        allVariants: {
          color: '#969BA0'
        }
      }
    }
  });
  
  export default theme;