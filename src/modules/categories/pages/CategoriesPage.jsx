import { useEffect, useState } from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import { CheckCircle, RemoveCircle } from "@mui/icons-material";
import CategoriesCard from "../components/CategoriesCard";
import { getCategories } from "../services/categoriesService";
import FloatingAddButton from "../components/FloatingAddButton";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [showEnabled, setShowEnabled] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, [showEnabled]);

  const fetchCategories = async () => {
    const data = await getCategories(showEnabled);
    setCategories(data);
  };

  const handleDelete = (id) => {
    console.log("Eliminar categoría con ID:", id);
  };

  const handleEdit = (category) => {
    console.log("Editar categoría:", category);
  };

  const handleChange = (event, newValue) => {
    setShowEnabled(newValue);
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", paddingBottom: "80px" }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>Categoría</Typography>
      
      {/* Selector de Habilitadas/Deshabilitadas */}
      <Tabs
        value={showEnabled}
        onChange={handleChange}
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "#1976D2",
            transition: "left 0.3s ease-in-out",
          },
        }}
      >
        <Tab
          icon={<CheckCircle sx={{ color: showEnabled ? "#1976D2" : "gray" }} />}
          iconPosition="start"
          label="HABILITADAS"
          value={true}
          sx={{
            color: showEnabled ? "#1976D2" : "gray",
            fontWeight: "bold",
            textTransform: "none",
          }}
        />
        <Tab
          icon={<RemoveCircle sx={{ color: !showEnabled ? "#1976D2" : "gray" }} />}
          iconPosition="start"
          label="DESHABILITADAS"
          value={false}
          sx={{
            color: !showEnabled ? "#1976D2" : "gray",
            fontWeight: "bold",
            textTransform: "none",
          }}
        />
      </Tabs>
      
      {/* Lista de categorías */}
      <Box display="flex" flexWrap="wrap" gap={2} mt={3}>
        {categories.map((category) => (
          <CategoriesCard key={category.id} category={category} onDelete={handleDelete} onEdit={handleEdit} />
        ))}
      </Box>
      
      <FloatingAddButton />
    </Box>
  );
};

export default CategoriesPage;
