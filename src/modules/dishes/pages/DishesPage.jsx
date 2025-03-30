import React, { useEffect, useState } from "react";
import { Box, Button, Icon, IconButton, Typography } from "@mui/material";
import DishesCategoryTabs from "../components/DishesCategoryTabs";
import FloatingAddButton from "../../../kernel/FloatingAddButton";
import { handleGetCategories } from "../controllers/DishesController";
import ModalActions from "../components/ModalActions";
import { useOutletContext } from "react-router-dom";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function DishesPage() {
  const [loading, setLoading] = useState(false); // Carga solo para la tabla
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { setSuccess, setError: setGlobalError } = useOutletContext();
  const [createdDish, setCreatedDish] = useState(false);
  const [alignment, setAlignment] = useState('available');
  const [isAvailable, setIsAvailable] = useState(true);

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      setIsAvailable(newAlignment === "available");
    }
  };

  const fetchData = () => {
    setLoading(true);
    handleGetCategories(setCategories, setError, setLoading);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const iconStyle = {
    fontSize: "large",
    margin: 0.5
  };

  return (
    <>
      <Box sx={{ padding: 3 }}>
      <Box sx={{ 
        display: "flex", 
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", sm: "center" },
        gap: { xs: 2, sm: 0 },
        mb: 2
      }}>
        <Typography variant="h1" marginTop={{xs: 2, md: 0}}>Platillos</Typography>
        <ToggleButtonGroup
          color={isAvailable ? "primary" : "error"}
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="available-unavailable dishes"
        >
          <ToggleButton value="available">Activos{alignment === "available" ? <CheckCircleIcon sx={iconStyle}/> : <CheckCircleOutlinedIcon sx={iconStyle}/>}</ToggleButton>
          <ToggleButton value="unavailable">Inactivos{alignment === "unavailable" ? <CancelIcon sx={iconStyle}/> : <CancelOutlinedIcon sx={iconStyle}/>}</ToggleButton>
        </ToggleButtonGroup>
      </Box>

        <DishesCategoryTabs
          categories={categories}
          loading={loading}
          error={error}
          createdDish={createdDish}
          setCreatedDish={setCreatedDish}
          isAvailable={isAvailable}
        />
        <FloatingAddButton action={handleOpenModal} />
      </Box>

      <ModalActions
        openModal={openModal}
        setOpenModal={setOpenModal}
        categories={categories}
        setSuccess={setSuccess}
        setError={setError}
        create={true}
        setCreatedDish={setCreatedDish}
      />
    </>
  );
}
