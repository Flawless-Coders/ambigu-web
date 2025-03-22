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
        bg: themeData?.sidebarBg || baseTheme.palette.sidebar.bg,
        text: baseTheme.palette.sidebar.text,
        hover: themeData?.sidebarHover || baseTheme.palette.sidebar.hover,
        selected: themeData?.sidebarSelected || baseTheme.palette.sidebar.selected,
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
      },
      footer: {
        fontFamily: themeData?.footerFont || baseTheme.typography.footer.fontFamily,
      }
    },
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
