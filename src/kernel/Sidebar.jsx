import { AccountCircle, Category, Fastfood, Home, MenuBook, Palette, People, Receipt, TableBar, DoubleArrow, Logout} from '@mui/icons-material';
import { useTheme, Drawer, Box, Typography, IconButton, Divider, List, ListItemButton, ListItemIcon, ListItemText, Tooltip} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ onLogout }) => {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  }

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
  ]

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 240 : 80,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? 240 : 80,
          transition: "width 0.3s ease-in-out",
          background: theme.palette.sidebar.bg,
          color: theme.palette.sidebar.text,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      {/* Logo y botón de colapsar */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: open ? "space-between" : "center", p: 2 }}>
        {open && <Typography variant="h6" sx={{ fontWeight: "bold" }}>Cereza Bar</Typography>}
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

      {/* Lista de opciones */}
      <List>
        {menuItems.map(({ text, icon, path }) => (
          <Tooltip title={!open ? text : ""} placement="right" key={text}>
            <ListItemButton 
              onClick={() => handleNavigate(path)}
              sx={{
                justifyContent: open ? "initial" : "center",
                "&:hover": { backgroundColor: theme.palette.sidebar.hover },
                "&.Mui-selected": { backgroundColor: theme.palette.sidebar.selected },
              }}
            >
              <ListItemIcon sx={{ color: theme.palette.sidebar.text, minWidth: 40 }}>{icon}</ListItemIcon>
              {open && <ListItemText primary={text} />}
            </ListItemButton>
          </Tooltip>
        ))}
      </List>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

      {/* Footer with logout functionality */}
      <Box sx={{ textAlign: "center", pb: 2 }}>
        <Tooltip title={!open ? "Cerrar sesión" : ""} placement="right">
          <ListItemButton 
            onClick={onLogout}
            sx={{
              justifyContent: open ? "initial" : "center",
              "&:hover": { backgroundColor: theme.palette.sidebar.hover },
            }}
          >
            <ListItemIcon sx={{ color: theme.palette.sidebar.text, minWidth: 40 }}>
              <Logout />
            </ListItemIcon>
            {open && <ListItemText primary="Cerrar sesión" />}
          </ListItemButton>
        </Tooltip>

        {open && (
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
      <IconButton 
        color="primary" 
        aria-label="toggle drawer" 
        onClick={toggleDrawer} 
        sx={{
          position: 'fixed',
          top: '50%',
          left: open ? 220 : 60,
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
         <DoubleArrow sx={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </IconButton>
    </Drawer>
  );
};

export default Sidebar;