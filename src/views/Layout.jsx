import Sidebar from "../kernel/Sidebar";
import { Outlet, useLocation } from "react-router-dom"
import { Box, Snackbar, Alert } from "@mui/material"
import Navbar from "../kernel/Navbar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Layout = ({ onLogout }) => {
  const { user } = useContext(AuthContext); 
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/dashboard" || location.pathname === "/profile" || location.pathname === "/customization") {
      setShowSearch(false);
    } else {
      setShowSearch(true);
    }
  }, [location]);

  const handleCloseSnackbar = () => {
    setSuccess(null);
    setError(null);
  };

  return (
        <Box sx={{ display: "flex", height: "100vh" }}>
        <Sidebar onLogout={onLogout} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            transition: 'left 0.3s ease-in-out',
            overflowY: "auto"
          }}
        >
          <Navbar user={user} onSearch={setSearchTerm} showSearch={showSearch}/>
          <Outlet context={{setSuccess, setError, searchTerm}}/>
        </Box>
        <Snackbar open={Boolean(success)} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
        </Snackbar>
        <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Box>
    );
  };

export default Layout;