import Sidebar from "../kernel/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { Box, Snackbar, Alert, AppBar, Toolbar, IconButton, useMediaQuery } from "@mui/material";
import Navbar from "../kernel/Navbar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from "@mui/material/styles";

const Layout = ({ onLogout }) => {
  const { user } = useContext(AuthContext); 
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [desktopOpen, setDesktopOpen] = useState(true); // Estado para el sidebar en desktop

  const drawerWidth = 240; // Ancho fijo para el drawer móvil

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
      <Sidebar 
        onLogout={onLogout} 
        mobileOpen={mobileOpen} 
        handleDrawerToggle={handleDrawerToggle}
        desktopOpen={desktopOpen}
        setDesktopOpen={setDesktopOpen}
      />
      
      {/* AppBar para móvil */}
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
            display: { xs: 'block', md: 'none' },
            background: 'white',
            color: 'black',
            boxShadow: 'none',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
              <Box sx={{ flexGrow: 1 }}>
                <Navbar user={user} onSearch={setSearchTerm} showSearch={showSearch}/>
              </Box>
          </Toolbar>
        </AppBar>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xs: '100%', md: `calc(100% - ${desktopOpen ? drawerWidth : 80}px)` },
          pt: { xs: showSearch ? '112px' : '64px', md: 0 },
          overflowY: "auto",
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {!isMobile && <Navbar user={user} onSearch={setSearchTerm} showSearch={showSearch}/>}
        <Outlet context={{setSuccess, setError, searchTerm}}/>
      </Box>
      
      <Snackbar open={Boolean(success)} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
      
      <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Layout;