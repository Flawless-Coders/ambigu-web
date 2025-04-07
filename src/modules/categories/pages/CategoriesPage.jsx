import { useEffect, useState } from "react";
import { Tabs, Tab, Typography, Box, Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
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
  const [alignment, setAlignment] = useState("active");

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const iconStyle = {
    fontSize: "large",
    margin: 0.5
  };

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
    // Filter by active/inactive status
    const matchesStatus = alignment === "active" ? category.status === true : category.status === false;
    
    // Filter by search term
    const matchesSearch = !searchTerm || category.name.toLowerCase().includes(searchTerm?.toLowerCase() || "");
    
    return matchesStatus && matchesSearch;
  });

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", paddingBottom: "80px", p: 3 }}>
       <Box sx={{ 
                    display: "flex", 
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: { xs: 2, sm: 0 },
                    mb: 2
                  }}>
        <Typography variant="h1">Categorías</Typography>

        {/* Toggle Button Group for Active/Inactive */}
        <ToggleButtonGroup
          color={alignment === "active" ? "primary" : "error"}
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="active-inactive categories"
        >
          <ToggleButton value="active">
            Activas{alignment === "active" ? <CheckCircleIcon sx={iconStyle}/> : <CheckCircleOutlinedIcon sx={iconStyle}/>}
          </ToggleButton>
          <ToggleButton value="inactive">
            Inactivas{alignment === "inactive" ? <CancelIcon sx={iconStyle}/> : <CancelOutlinedIcon sx={iconStyle}/>}
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

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
