import React, { useState } from "react";
import { Toolbar, InputBase, Avatar, Box, Typography, Divider } from "@mui/material";
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
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",// Ajuste según sidebar
        height: "60px",
      }}
    >
      {showSearch && (
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, maxWidth: "800px", border: "1px solid gray", borderRadius: "4px", px: 1, py: 0.5, justifyContent: "space-between" }}>
          <InputBase
            placeholder="Buscar..."
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
            }}
          />
          <SearchIcon sx={{ color: "gray", mr: 1 }} />
        </Box>
      )}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Divider orientation="vertical" flexItem />
        <Typography variant="body2" color="text.secondary">
          Hola, <b style={{ color: "#000" }}>{user?.name || "Invitado"}</b>
        </Typography>
        <Avatar src={user?.avatarBase64 || "https://via.placeholder.com/40"} alt={user?.name} />
      </Box>
    </Box>
  );
}