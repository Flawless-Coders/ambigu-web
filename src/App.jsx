import { CssBaseline } from "@mui/material"
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./navigation/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProviderComponent } from "./context/ThemeContext";

function App() {

  return (
    <AuthProvider>
      <ThemeProviderComponent>
        <CssBaseline />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        <CssBaseline />
      </ThemeProviderComponent>
    </AuthProvider>
  );
}

export default App
