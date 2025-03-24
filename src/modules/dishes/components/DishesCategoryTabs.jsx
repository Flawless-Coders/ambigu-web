import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";
import CustomCard from "../../../kernel/CustomCard";
import LoaderAmbigu from "../../../kernel/LoaderAmbigu";
import {
  handleGetDishesByCategoryAndStatus,
  handleGetDishById,
} from "../controllers/DishesController";
import CircularProgress from "@mui/material/CircularProgress";
import ModalActions from "./ModalActions";
import { useOutletContext } from "react-router-dom";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
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

export default function DishesCategoryTabs(props) {
  const {
    categories,
    loading,
    error,
    createdDish,
    setCreatedDish,
    isAvailable,
  } = props;

  const [value, setValue] = React.useState(0);
  const [dishesLoading, setDishesLoading] = React.useState(false);
  const [dishesError, setDishesError] = React.useState(null);
  const [dishes, setDishes] = React.useState([]);
  const [categoryId, setCategoryId] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedDish, setSelectedDish] = React.useState({});
  const [modalLoading, setModalLoading] = React.useState(false);
  const [categoryDish, setCategoryDish] = React.useState({});
  const [updatedDish, setUpdatedDish] = React.useState(false);
  const { setSuccess, setError: setGlobalError } = useOutletContext();
  const [disableModal, setDisableModal] = React.useState(false);
  const [enableModal, setEnableModal] = React.useState(false);

  const fetchDishesByCategory = () => {
    handleGetDishesByCategoryAndStatus(
      categoryId,
      isAvailable,
      setDishes,
      setDishesError,
      setDishesLoading
    );
    setCreatedDish(false);
    setUpdatedDish(false);
  };

  React.useEffect(() => {
    if (categories.length > 0) {
      setCategoryId(categories[0].id);
    }
  }, [categories]);

  React.useEffect(() => {
    fetchDishesByCategory();
    if (updatedDish) {
      fetchDishesByCategory();
    }
  }, [categoryId, createdDish, updatedDish, isAvailable]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleIdCategory = (categoryId) => {
    setCategoryId(categoryId);
  };

  const handleUpdateModal = async (id) => {
    setEnableModal(false);
    setDisableModal(false);
    setOpenModal(true);
    setModalLoading(true);
    await handleGetDishById(
      id,
      setSelectedDish,
      setModalLoading,
      setCategoryDish
    );
  };

  const handleDisableModal = async (id) => {
    setEnableModal(false);
    setDisableModal(true);
    setOpenModal(true);
    setModalLoading(true);
    await handleGetDishById(
      id,
      setSelectedDish,
      setModalLoading,
      setCategoryDish
    );
  };

  const handleEnableModal = async (id) => {
    setDisableModal(false);
    setEnableModal(true);
    setOpenModal(true);
    setModalLoading(true);
    await handleGetDishById(
      id,
      setSelectedDish,
      setModalLoading,
      setCategoryDish
    );
  };

  return (
    <>
      {loading ? (
        <LoaderAmbigu />
      ) : (
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="scrollable"
            >
              {categories.map((category, index) => (
                <Tab
                  onClick={() => handleIdCategory(category.id)}
                  label={category.name}
                  key={category.id}
                  {...a11yProps(index)}
                />
              ))}
            </Tabs>
          </Box>
          {categories.map((category, index) => (
            <CustomTabPanel key={category.id} value={value} index={index}>
              {dishesLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh",
                  }}
                >
                  <CircularProgress color="primary" />
                </Box>
              ) : Array.isArray(dishes) && dishes.length > 0 ? (
                <Grid
                  container
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  rowSpacing={3}
                  sx={{ p: 1 }}
                >
                  {dishes.map((dish, index) => (
                    <CustomCard
                      key={dish.id}
                      image={
                        dish.imageBase64
                          ? dish.imageBase64
                          : "https://www.shutterstock.com/image-vector/vector-isolated-one-round-plate-600nw-2217476735.jpg"
                      }
                      chipTitle={
                        dish.status ? "Platillo activo" : "Platillo inactivo"
                      }
                      chipColor={dish.status ? "success" : "error"}
                      update={() => {
                        handleUpdateModal(dish.id);
                      }}
                      title={dish.name}
                      price={dish.price}
                      description={dish.description}
                      isEnable={dish.status}
                      disable={() => {
                        handleDisableModal(dish.id);
                      }}
                      enable={() => {
                        handleEnableModal(dish.id);
                      }}
                    />
                  ))}
                </Grid>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh",
                  }}
                >
                  <Typography variant="h3" color="gray">
                    {isAvailable
                      ? "No hay platillos disponibles de esta categoría"
                      : "Todos los platillos de esta categoría están disponibles"}
                  </Typography>
                </Box>
              )}
            </CustomTabPanel>
          ))}
        </Box>
      )}
      <ModalActions
        openModal={openModal}
        setOpenModal={setOpenModal}
        categories={categories}
        dish={selectedDish}
        dishCategory={categoryDish}
        update={true}
        dishLoading={modalLoading}
        setDishLoading={setModalLoading}
        setUpdatedDish={setUpdatedDish}
        setSuccess={setSuccess}
        setError={setGlobalError}
        disable={disableModal}
        enable={enableModal}
        image={selectedDish?.imageBase64}
      />
    </>
  );
}
