import * as React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { handleGetAllCategories, handleGetCategories, handleGetDishes, handleAddDish, handleGetDishesByCategory } from "../controllers/MenuController";
import { useOutletContext } from "react-router-dom";
import LoaderAmbigu from '../../../kernel/LoaderAmbigu';
import CustomCard from "../../../kernel/CustomCard";
import { Box, Typography, Grid, Tab, Tabs, CircularProgress } from '@mui/material';
import FloatingAddButton from "../../../kernel/FloatingAddButton";
import { AddDishDialog } from "../components/AddDishDialog";
import { RemoveDishDialog } from "../components/removeDishDialog";
import { View } from "@react-pdf/renderer";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ marginTop: 3 }}>
          {children}
        </Box>
      )}
    </Box>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function MenuDetails() {
  const location = useLocation();
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [dialogLoading, setDialogLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { setSuccess, setError: setGlobalError, searchTerm } = useOutletContext();
  const [value, setValue] = React.useState(0);
  const { id, name } = location.state || {};
  const [dishes, setDishes] = React.useState([]);
  const [dialogCategories, setDialogCategories] = React.useState([]);
  const [openRegisterDialog, setOpenRegisterDialog] = React.useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = React.useState(false);
  const [selectedDish, setSelectedDish] = React.useState(null);
  const [loadingCategories, setLoadingCategories] = React.useState(false);
  const [loadingDishes, setLoadingDishes] = React.useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const filteredDishes = dishes
    ? dishes.filter((dish) =>
      dish.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  const handleCloseRegisterDialog = () => setOpenRegisterDialog(false); //Método para cerrar el modal

  const handleCloseRemoveDishDialog = () => setOpenRemoveDialog(false); //Método para cerrar el modal

  const handleOpenRegisterDialog = () => {
    setOpenRegisterDialog(true);
  };

  const handleOpenRemoveDialog = (dish) => {
    setOpenRemoveDialog(true);
    setSelectedDish(dish);

  };

  const handleSubmitDialog = async (values, { setSubmitting, setErrors }) => {
    try {
      setError(null);
      setSuccess(null);

      await handleAddDish(values.menuId, values.dishId, setError, setSuccess, setLoading);
      handleCloseRegisterDialog();
      fetchCategoriesByMenu();
      fetchDishes();
    } catch (error) {
      setErrors({ dishId: "Error al agregar el platillo" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    fetchCategoriesByMenu();
  }, [id]);

  const fetchDishes = () => {
    if (categories.length > 0) {
      const categoryId = categories[value]?.id;
      setLoadingDishes(true);
      handleGetDishes(setError, setLoadingDishes, setDishes, id, categoryId);
    }
  };

  const fetchCategoriesByMenu = () => {
    setLoadingCategories(true);
    handleGetCategories(setError, setLoadingCategories, setCategories, id);
  };

  const resetTab = React.useCallback(() => {
    if (categories.length > 0 && value !== 0) {
      setValue(0);
    }
  }, [categories.length, value]);

  React.useEffect(() => {
    if (categories.length > 0) {
      fetchDishes();
    }
  }, [id, value, categories.length]);


  React.useEffect(() => {
    handleGetAllCategories(setError, setDialogLoading, setDialogCategories);
  }, []);

  React.useEffect(() => {
    if (error) {
      setGlobalError(error);
    }
  }, [error, setGlobalError]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h1">{name}</Typography>

      {loadingCategories ? (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
          <LoaderAmbigu />
        </Box>
      ) : (
        <>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="menu tabs"
              variant="scrollable"
            >
              {categories.map((category) => (
                <Tab
                  key={category.id}
                  label={category.name}
                  {...a11yProps(category.id)}
                />
              ))}
            </Tabs>
          </Box>
          {categories.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
              }}
            >
              <Typography variant="h3" color="gray">
                Aún no hay platillos en el menú</Typography>
            </Box>
          ) : (
            <CustomTabPanel value={value} index={value}>
              {loadingDishes ? (
                <Box sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  height: "60vh"
                }}>
                  <CircularProgress size={50} color="primary" />
                </Box>
              ) : (
                <>
                  <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} rowSpacing={3}>
                    {filteredDishes.length > 0 && (
                      filteredDishes.map((dish) => (
                        <CustomCard
                          key={dish.id}
                          title={dish.name}
                          image={
                            dish?.imageId
                              ? `${API_URL}/file/${dish.imageId}`
                              : "https://www.shutterstock.com/image-vector/vector-isolated-one-round-plate-600nw-2217476735.jpg"
                          }
                          price={`${dish.price}`}
                          isMenu={true}
                          remove={() => handleOpenRemoveDialog(dish)}
                        />
                      ))
                    )}
                  </Grid>

                  {filteredDishes.length == 0 && (

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "50vh",
                      }}
                    >
                      <Typography variant="h3" color="gray">
                        Los platillos de esta categoría están desactivados</Typography>
                    </Box>


                  )}


                </>
              )}
            </CustomTabPanel>
          )}
        </>
      )}
      <FloatingAddButton action={handleOpenRegisterDialog} />

      <AddDishDialog
        open={openRegisterDialog}
        onClose={handleCloseRegisterDialog}
        onSubmit={handleSubmitDialog}
        setSuccess={setSuccess}
        setError={setError}
        loading={dialogLoading}
        setLoading={setLoading}
        buttonLoading={loading}
        menuId={id}
        categories={dialogCategories}
        handleGetDishesByCategory={handleGetDishesByCategory}
      />

      <RemoveDishDialog
        open={openRemoveDialog}
        onClose={handleCloseRemoveDishDialog}
        menuId={id}
        dishId={selectedDish?.id}
        dishName={selectedDish?.name}
        setSuccess={setSuccess}
        setError={setError}
        onRemoveDish={fetchDishes}
        fetchCategory={fetchCategoriesByMenu}
        resetTab={resetTab}
      />
    </Box>
  );
}