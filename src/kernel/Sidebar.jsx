import { AccountCircle, Category, Fastfood, Home, MenuBook, Palette, People, Receipt, TableBar, DoubleArrow, Logout, Menu } from '@mui/icons-material';
import { useTheme, Drawer, Box, Typography, IconButton, Divider, List, ListItemButton, ListItemIcon, ListItemText, Tooltip, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ onLogout, mobileOpen, handleDrawerToggle }) => {
  const [desktopOpen, setDesktopOpen] = useState(true);
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDesktopDrawer = () => {
    setDesktopOpen(!desktopOpen);
  };

  const menuItems = [
    { text: "Dashboard", icon: <Home/>, path: "/dashboard" },
    { text: "Meseros", icon: <People/>, path: "/waiters" },
    { text: "Categorias", icon: <Category/>, path: "/categories" },
    { text: "Platillos", icon: <Fastfood/>, path: "/dishes" },
    { text: "Mesas", icon: <TableBar/>, path: "/tables" },
    { text: "Menú", icon: <MenuBook/>, path: "/menu" },
    { text: "Personalización", icon: <Palette />, path: "/customization" },
    { text: "Pedidos", icon: <Receipt />, path: "/orders" },
    { text: "Perfil", icon: <AccountCircle />, path: "/profile" },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    if (isMobile) handleDrawerToggle();
  };

  const drawerContent = (
    <>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: desktopOpen && !isMobile ? "space-between" : "center", p: 2 }}>
        {desktopOpen && !isMobile ? (
          <img src={theme.logo} alt="Logo" style={{ height: 40 }} />
        ) : (
          <img src={theme.logoSmall} alt="Logo" style={{ height: 40 }} />
        )}
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

      <List>
        {menuItems.map(({ text, icon, path }) => (
          <Tooltip title={!desktopOpen && !isMobile ? text : ""} placement="right" key={text}>
            <ListItemButton 
              onClick={() => handleNavigate(path)}
              selected={location.pathname === path}
              sx={{
                justifyContent: desktopOpen || isMobile ? "initial" : "center",
                "&:hover": { backgroundColor: theme.palette.sidebar.hover },
                "&.Mui-selected": { backgroundColor: theme.palette.sidebar.hover },
              }}
            >
              <ListItemIcon sx={{ color: theme.palette.sidebar.text, minWidth: 40 }}>{icon}</ListItemIcon>
              {(desktopOpen || isMobile) && <ListItemText primary={text} />}
            </ListItemButton>
          </Tooltip>
        ))}
      </List>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

      <Box sx={{ textAlign: "center", pb: 2 }}>
        <Tooltip title={!desktopOpen && !isMobile ? "Cerrar sesión" : ""} placement="right">
          <ListItemButton 
            onClick={onLogout}
            sx={{
              justifyContent: desktopOpen || isMobile ? "initial" : "center",
              "&:hover": { backgroundColor: theme.palette.sidebar.hover },
            }}
          >
            <ListItemIcon sx={{ color: theme.palette.sidebar.text, minWidth: 40 }}>
              <Logout />
            </ListItemIcon>
            {(desktopOpen || isMobile) && <ListItemText primary="Cerrar sesión" />}
          </ListItemButton>
        </Tooltip>

        {(desktopOpen || isMobile) && (
          <Box sx={{textAlign: "center", mt:6}}>
            <Typography variant="logo" fontSize="1.5rem">
              Ambigú<br />
            </Typography>
            <Typography variant="footer">
              © 2025 All Rights Reserved<br />
              Made by Flawless Coders
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );

  return (
    <>
      {/* Drawer para desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: desktopOpen ? 240 : 80,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: desktopOpen ? 240 : 80,
            transition: "width 0.3s ease-in-out",
            background: theme.palette.sidebar.bg,
            color: theme.palette.sidebar.text,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        {drawerContent}
        <IconButton 
          color="primary"
          onClick={toggleDesktopDrawer}
          sx={{
            position: 'fixed',
            top: '50%',
            left: desktopOpen ? 220 : 60,
            transform: 'translateY(-50%)',
            transition: 'left 0.3s ease-in-out',
            zIndex: 1,
            backgroundColor: 'white',
            borderRadius: 1,
            boxShadow: 3,
            width: '30px',
            height: '25px'
          }}
        >
          <DoubleArrow sx={{ transform: desktopOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
        </IconButton>
      </Drawer>

      {/* Drawer para móvil */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          "& .MuiDrawer-paper": {
            width: 240,
            background: theme.palette.sidebar.bg,
            color: theme.palette.sidebar.text,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;