import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DownloadIcon from "@mui/icons-material/Download";
import { IconButton } from "@mui/material";

function HeaderPublic({ section, download, downloadPDF }) {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/7830/7830589.png"
            alt="Logo restaurante"
            style={{ height: 40 }}
          />
          <Typography variant="h6" component="div" style={{ marginLeft: 15 }}>
            Cereza bar
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center">
          {download && <IconButton onClick={downloadPDF} sx={{color:"white", marginRight:1}}><DownloadIcon /></IconButton>}
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {section}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderPublic;
