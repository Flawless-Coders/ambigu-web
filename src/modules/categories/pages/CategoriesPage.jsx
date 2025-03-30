import { useEffect, useState } from "react";
import { Tabs, Tab, Typography, Box, Grid } from "@mui/material";
import { CheckCircle, RemoveCircle } from "@mui/icons-material";
import CategoriesCard from "../components/CategoriesCard";
import { handleGetCategories } from "../controllers/categoriesController";
import FloatingAddButton from "../components/FloatingAddButton";
import RegisterDialog from "../components/RegisterDialog";
import ChangeStatusDialog from "../components/ChangeStatusDialog";
import LoaderAmbigu from "../../../kernel/LoaderAmbigu";
import { useOutletContext } from "react-router-dom";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openChangeStatusDialog, setOpenChangeStatusDialog] = useState(false);
  const { setSuccess, setError, searchTerm } = useOutletContext();

  useEffect(() => {
    handleGetCategories(setCategories, setLoading, setError);
  }, []);

  const handleOpenChangeStatusDialog = (category) => {
    setSelectedCategory(category);
    setOpenChangeStatusDialog(true);
  };

  const handleCloseChangeStatusDialog = () => {
    setOpenChangeStatusDialog(false);
    setSelectedCategory(null);
  };

  const handleStatusChange = async () => {
    await handleGetCategories(setCategories, setLoading, setError);
    handleCloseChangeStatusDialog();
  };

  const handleOpenEditDialog = (category) => {
    setSelectedCategory(category);
    setOpenModal(true);
  };

  const filteredCategories = categories.filter((category) => {
    const matchesStatus = tabIndex === 0 ? category.status === true : category.status === false;
    const matchesSearch = category.name.toLowerCase().includes(searchTerm?.toLowerCase() || "");
    return matchesStatus && matchesSearch;
  });

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", paddingBottom: "80px", p: 3 }}>
      <Typography variant="h4">Categorías</Typography>

      {/* Tabs Habilitados/Deshabilitados */}
      <Tabs value={tabIndex} onChange={(event, newValue) => setTabIndex(newValue)} sx={{ mb: 3 }}>
        <Tab
          label="HABILITADOS"
          value={0}
          sx={{ color: tabIndex === 0 ? "green" : "gray", textTransform: "none" }}
        />
        <Tab
          label="DESHABILITADOS"
          value={1}
          sx={{ color: tabIndex === 1 ? "green" : "gray", textTransform: "none" }}
        />
      </Tabs>

      {loading ? (
        <LoaderAmbigu />
      ) : (
        <>
          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} rowSpacing={3} sx={{ p: 1 }}>
            {filteredCategories.map((category) => (
              <CategoriesCard
                key={category.id}
                category={category}
                onChangeStatus={handleOpenChangeStatusDialog}
                onEdit={handleOpenEditDialog}
              />
            ))}
          </Grid>
          <FloatingAddButton 
            setLoading={setLoading}
            onSuccess={() => handleGetCategories(setCategories, setLoading, setError)}
          />
        </>
      )}

      <RegisterDialog 
        open={openModal} 
        handleClose={() => {
          setOpenModal(false);
          setSelectedCategory(null);
        }} 
        onSuccess={() => handleGetCategories(setCategories, setLoading, setError)} 
        category={selectedCategory} 
      />

      {/* Dialogo de habilitar/deshabilitar */}
      <ChangeStatusDialog
        open={openChangeStatusDialog}
        onClose={handleCloseChangeStatusDialog}
        category={selectedCategory}
        onStatusChange={handleStatusChange}
      />
    </Box>
  );
};

export default CategoriesPage;
