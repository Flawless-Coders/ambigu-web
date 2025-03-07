import Sidebar from "../kernel/Sidebar";
import { Outlet } from "react-router-dom"
import { Box } from "@mui/material"
import Navbar from "../kernel/Navbar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Layout = ({ onLogout }) => {
  const { user } = useContext(AuthContext); 
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
          <Outlet />
        </Box>
      </Box>
    );
  };

export default Layout;