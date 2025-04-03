import { createContext, useEffect, useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import baseTheme from "../config/theme";

export const PublicThemeContext = createContext();

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

const normalizeTheme = (data) => {
  return createTheme({
    ...baseTheme,
    palette: {
      primary: { main: data.primaryColor },
      secondary: { main: data.secondaryColor },
      background: { default: data.backgroundColor },
      sidebar: {
        bg: data.secondaryColor,
        text: "#ffffff",
        hover: "#333333",
        selected: data.secondaryColor,
      },
      text: {
        primary: "#000000",
        secondary: "#333333",
      },
    },
    typography: {
      fontFamily: data.bodyFont,
      h1: { fontFamily: data.headerFont },
      h2: { fontFamily: data.headerFont },
      body1: { fontFamily: data.bodyFont },
      body2: { fontFamily: data.paragraphFont },
    },
    logo: data.logo,
    logoSmall: data.logoSmall,
  });
};

export const PublicThemeProvider = ({ children }) => {
  const [themeData, setThemeData] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/theming/public-theme/default_theme`)
      .then((res) => res.json())
      .then((data) => {
        if (data.bodyFont) loadFontInDOM(data.bodyFont);
        setThemeData(data);
      })
      .catch((e) => console.error("Error cargando tema público:", e));
  }, []);

  const theme = useMemo(() => {
    return themeData ? normalizeTheme(themeData) : baseTheme;
  }, [themeData]);

  if (!themeData) return null; // o tu loader

  return (
    <PublicThemeContext.Provider value={{ theme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </PublicThemeContext.Provider>
  );
};
