import { useEffect, useState } from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import { CheckCircle, RemoveCircle } from "@mui/icons-material";
import CategoriesCard from "../components/CategoriesCard";
import { getCategories, changeCategoryStatus } from "../services/categoriesService";
import FloatingAddButton from "../components/FloatingAddButton";
import RegisterDialog from "../components/RegisterDialog";
import ChangeStatusDialog from "../components/ChangeStatusDialog";
import LoaderAmbigu from "../../../kernel/LoaderAmbigu";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openChangeStatusDialog, setOpenChangeStatusDialog] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChangeStatusDialog = (category) => {
    setSelectedCategory(category);
    setOpenChangeStatusDialog(true);
  };

  const handleCloseChangeStatusDialog = () => {
    setOpenChangeStatusDialog(false);
    setSelectedCategory(null);
  };

  const handleStatusChange = async () => {
    await fetchCategories();
    handleCloseChangeStatusDialog();
  };

  const handleOpenEditDialog = (category) => {
    setSelectedCategory(category);
    setOpenModal(true);
  };

  const filteredCategories = categories.filter((category) =>
    tabIndex === 0 ? category.status === true : category.status === false
  );

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", paddingBottom: "80px" }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Categorías
      </Typography>

      {/* Tabs Habilitados/Deshabilitados */}
      <Tabs value={tabIndex} onChange={(event, newValue) => setTabIndex(newValue)} sx={{ mb: 1 }}>
        <Tab
          icon={<CheckCircle sx={{ color: tabIndex === 0 ? "green" : "gray" }} />}
          iconPosition="start"
          label="Habilitados"
          value={0}
          sx={{ color: tabIndex === 0 ? "green" : "gray", fontWeight: "bold", textTransform: "none" }}
        />
        <Tab
          icon={<RemoveCircle sx={{ color: tabIndex === 1 ? "green" : "gray" }} />}
          iconPosition="start"
          label="Deshabilitados"
          value={1}
          sx={{ color: tabIndex === 1 ? "green" : "gray", fontWeight: "bold", textTransform: "none" }}
        />
      </Tabs>

      {loading ? (
        <LoaderAmbigu />
      ) : (
        <Box display="flex" flexWrap="wrap" gap={2} mt={3}>
          {filteredCategories.map((category) => (
            <CategoriesCard
              key={category.id}
              category={category}
              onChangeStatus={handleOpenChangeStatusDialog}
              onEdit={handleOpenEditDialog}
            />
          ))}
        </Box>
      )}

      <FloatingAddButton onClick={() => setOpenModal(true)} />
      <RegisterDialog open={openModal} handleClose={() => setOpenModal(false)} onSuccess={fetchCategories} category={selectedCategory} />

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
