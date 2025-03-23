import { createContext, useContext, useMemo, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "./AuthContext";
import baseTheme from "../config/theme";

const loadFontInDOM = (font) => {
  const fontId = `font-${font.replace(/ /g, "-")}`;
  if (!document.getElementById(fontId)) {
    const link = document.createElement("link");
    link.id = fontId;
    link.href = `https://fonts.googleapis.com/css?family=${font.replace(/ /g, "+")}`;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
};


const normalizeTheme = (themeData) => {
  const darkenColor = (color, amount) => {
    let usePound = false;
    if (color[0] === "#") {
      color = color.slice(1);
      usePound = true;
    }
    const num = parseInt(color, 16);
    let r = (num >> 16) - amount;
    let b = ((num >> 8) & 0x00FF) - amount;
    let g = (num & 0x0000FF) - amount;
    r = r < 0 ? 0 : r;
    b = b < 0 ? 0 : b;
    g = g < 0 ? 0 : g;
    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
  };

  return createTheme({
    ...baseTheme,
    palette: {
      primary: {
        main: themeData?.primaryColor || baseTheme.palette.primary.main,
      },
      secondary: {
        main: themeData?.secondaryColor || baseTheme.palette.secondary.main,
      },
      background: {
        default: themeData?.backgroundColor || baseTheme.palette.background.default,
      },
      sidebar: {
        bg: themeData?.secondaryColor || baseTheme.palette.sidebar.bg,
        text: baseTheme.palette.sidebar.text,
        hover: themeData?.sidebarHover || baseTheme.palette.sidebar.hover,
        selected: themeData?.secondaryColor,
      },
      text: {
        primary: themeData?.textPrimary || baseTheme.palette.text.primary,
        secondary: themeData?.textSecondary || baseTheme.palette.text.secondary,
      },
    },
    typography: {
      fontFamily: themeData?.bodyFont || baseTheme.typography.fontFamily,
      h1: {
        fontFamily: themeData?.headerFont || baseTheme.typography.h1.fontFamily,
      },
      h2: {
        fontFamily: themeData?.headerFont || baseTheme.typography.h2.fontFamily,
      },
      h3: {
        fontFamily: themeData?.headerFont || baseTheme.typography.h3.fontFamily,
      },
      body1: {
        fontFamily: themeData?.bodyFont || baseTheme.typography.body1.fontFamily,
      },
      body2: {
        fontFamily: themeData?.paragraphFont || baseTheme.typography.body2.fontFamily,
      },
      logo: {
        fontFamily: themeData?.logoFont || baseTheme.typography.logo.fontFamily,
        fontSize: baseTheme.typography.logo.fontSize,
      },
      footer: {
        fontFamily: themeData?.footerFont || baseTheme.typography.footer.fontFamily,
        fontSize: baseTheme.typography.footer.fontSize,
      }
    },
    logo: themeData?.logo,
    logoSmall: themeData?.logoSmall
  });
};

export const ThemeContext = createContext();

export const ThemeProviderComponent = ({ children }) => {
  const { themeData } = useContext(AuthContext);

  // Cargar la fuente dinámica cuando themeData.bodyFont cambie
  useEffect(() => {
    if (themeData?.bodyFont) {
      loadFontInDOM(themeData.bodyFont);
    }
  }, [themeData?.bodyFont]);

  // Normalizar y aplicar el tema
  const theme = useMemo(() => normalizeTheme(themeData), [themeData]);

  return (
    <ThemeContext.Provider value={{ theme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
