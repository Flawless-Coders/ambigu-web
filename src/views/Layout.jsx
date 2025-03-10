import Sidebar from "../kernel/Sidebar";
import { Outlet } from "react-router-dom"
import { Box, Snackbar, Alert } from "@mui/material"
import Navbar from "../kernel/Navbar";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Layout = ({ onLogout }) => {
  const { user } = useContext(AuthContext); 
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

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
          <Navbar user={user}/>
          <Outlet context={{setSuccess, setError}}/>
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