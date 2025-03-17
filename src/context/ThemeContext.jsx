import { createContext, useContext, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "./AuthContext";
import baseTheme from "../config/theme";

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
        text: themeData?.sidebarText || baseTheme.palette.sidebar.text,
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
    },
  });
};

export const ThemeContext = createContext();

export const ThemeProviderComponent = ({ children }) => {
  const { themeData } = useContext(AuthContext);

  // Normalizar y aplicar el tema
  const theme = useMemo(() => normalizeTheme(themeData), [themeData]);

  return (
    <ThemeContext.Provider value={{ theme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
