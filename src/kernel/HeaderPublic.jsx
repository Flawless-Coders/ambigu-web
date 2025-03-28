import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@emotion/react';

function HeaderPublic({ section }) {
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
        <Typography variant="body1" sx={{  color: theme.palette.sidebar.text}}>
          {section}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderPublic;
