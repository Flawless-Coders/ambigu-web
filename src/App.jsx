import { ThemeProvider, CssBaseline } from "@mui/material"
import theme from "./config/theme"
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./navigation/AppRoutes";

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
