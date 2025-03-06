import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, InputBase, Avatar, Box, Typography, Fade, Divider } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

export default function Navbar({ user, onSearch, showSearch = true }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  return (
    <AppBar position="fixed" color="default" elevation={1}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 3 }}>
        {/* Buscador con posibilidad de ocultarlo */}
        <Fade in={showSearch}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "rgba(0,0,0,0.05)",
              borderRadius: 2,
              px: 2,
              py: 0.5,
              width: { xs: "100%", sm: "50%" },
            }}
          >
            <SearchIcon sx={{ color: "gray", mr: 1 }} />
            <InputBase
              placeholder="Buscar..."
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ width: "100%" }}
            />
          </Box>
        </Fade>

        {/* Sección de usuario */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body1">
            Hola, <b>{user?.name || "Invitado"}</b>
          </Typography>
          <IconButton>
            <Avatar src={user?.avatar || "https://via.placeholder.com/40"} alt={user?.name} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}