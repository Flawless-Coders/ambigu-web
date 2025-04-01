import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Box } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

export default function DishCard({ image, description, price, name, seeMore }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const truncatedDescription =
    description.length > 50
      ? isSmallScreen
        ? description.slice(0, 35) + "..."
        : isMdScreen
        ? description.slice(0, 90) + "..."
        : description.slice(0, 90) + "..."
      : description;

  return (
    <Card
      sx={{
        maxWidth: 300,
        height: {xs: 120, sm: 220},
        margin: 0,
      }}
    >
      <CardActionArea onClick={seeMore}>
        <CardMedia component="img" sx={{height: {xs: 70, sm: 110}}} image={image} alt={name} />
        <CardContent
          sx={{ p: 0, paddingLeft: 1, paddingRight: 1, marginTop: 1 }}
        >
          <Typography
            variant={{ xs: "subtitle1", sm: "h6", md: "h5" }}
            component="div"
            fontWeight="bold"
          >
            {name}
          </Typography>
          {isSmallScreen ? "" : (<Typography variant="body2" sx={{ color: "text.secondary" }}>
            {truncatedDescription}
          </Typography>)}
          <Box position="absolute" top={{xs: 100, sm: 190}} right={10}>
            <Typography variant={{xs: "subtitle2", sm:"subtitle1"}} sx={{ fontWeight: "bolder" }}>
              ${price}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
