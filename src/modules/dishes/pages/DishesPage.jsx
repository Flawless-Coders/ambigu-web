import React from "react";
import { Box, Button, Typography } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import CustomTabs from "../../../kernel/CustomTabs";

export default function DishesPage() {
  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined" color="tertiary"><FilterListIcon/> FILTRAR</Button>
      </Box>
      <Typography variant="h4">Platillos</Typography>
      <CustomTabs enabledAndDisabled={true}/>
    </Box>
  );
}
