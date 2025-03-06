import Sidebar from "../kernel/Sidebar";
import { Outlet } from "react-router-dom"
import { Box } from "@mui/material"
import Navbar from "../kernel/Navbar";

const Layout = ({ onLogout }) => {
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
          <Navbar/>
          <Outlet />
        </Box>
      </Box>
    );
  };

export default Layout;