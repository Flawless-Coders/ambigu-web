import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DownloadIcon from "@mui/icons-material/Download";
import { CircularProgress, IconButton } from "@mui/material";
import { useTheme } from '@emotion/react';

function HeaderPublic({ section, download, downloadPDF, loadingButton }) {
  const theme = useTheme();
  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.sidebar.bg }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <img src={theme.logo} alt="Logo" style={{ height: 40 }} />
          {/* <Typography variant="h6" component="div" style={{marginLeft:15}}>
            Cereza bar
          </Typography> */}
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center">
          {loadingButton ? (<CircularProgress color="white" size={20} sx={{marginRight:2}}/>) : download ? <IconButton onClick={downloadPDF} sx={{color:"white", marginRight:1}}><DownloadIcon /></IconButton> : ""}
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {section}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderPublic;
