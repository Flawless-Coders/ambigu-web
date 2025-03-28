import React, { useEffect, useState } from "react";
import HeaderPublic from "../../../kernel/HeaderPublic";
import { Box, Grid, Typography } from "@mui/material";
import PublicMenuTabs from "../components/PublicMenuTabs";
import { useOutletContext } from "react-router-dom";
import { handleGetCurrentMenu, handleGetCurrentMenuCategories } from "../controllers/publicMenuController";
import CircularProgress from "@mui/material/CircularProgress";

export default function PublicMenu() {
  const [currentMenu, setCurrentMenu] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  const fetchMenu = () => {
    setLoading(true);
    handleGetCurrentMenu(setCurrentMenu, setLoading);
  };

  const fetchCategories = () => {
    setCategoriesLoading(true);
    handleGetCurrentMenuCategories(setCategories, setCategoriesLoading);
  };

  useEffect(() => {
    fetchMenu();
    fetchCategories();
  }, []);

  const downloadPDF = () => { 
    console.log("descargado");
  }

  return loading ? (
    <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
      <CircularProgress />
    </Box>
  ) : (
    <>
      <HeaderPublic section="Menú" download={true} downloadPDF={downloadPDF}/>
      <Box m={2} marginBottom={0} display={"flex"} justifyContent={{xs: "center", sm: "flex-start"}}>
        <Typography variant="h3">{currentMenu.name}</Typography>
      </Box>
      <PublicMenuTabs categories={categories} loading={categoriesLoading}/>
    </>
  );
}


