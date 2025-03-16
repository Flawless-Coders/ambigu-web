import * as React from "react";
import CustomCard from "../../../kernel/CustomCard";
import {Box, Typography,Grid} from '@mui/material'
import FloatingAddButton from "../../categories/components/FloatingAddButton";


export default function MenuPage() {
  return (
    <>
    
     <Box sx={{ p: 1 }}>
    <Typography variant="h5">Menús</Typography>
    </Box>
    <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} rowSpacing={3}>
    <CustomCard
        image={"https://imag.bonviveur.com/banana-split-principal.jpg"}
        title={"Banana split"}
        price={"$85.5"}
        description={"Plátano fresco servido con bolas de helado, crema batida, jarabe de chocolate y cerezas. "}
    />

    <FloatingAddButton />
    </Grid>
    </>
  );
}
