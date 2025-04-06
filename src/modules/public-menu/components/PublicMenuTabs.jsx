import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";
import LoaderAmbigu from "../../../kernel/LoaderAmbigu";
import { handleGetCurrentMenuDishesByCategory } from "../controllers/publicMenuController";
import CircularProgress from "@mui/material/CircularProgress";
import DishCard from "./DishCard";
import SeeMoreModal from "./SeeMoreModal";
import { isNullOrUndef } from "chart.js/helpers";

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

export default function PublicMenuTabs(props) {
  const { categories, loading } = props;
  const [value, setValue] = React.useState(0);
  const [dishesLoading, setDishesLoading] = React.useState(false);
  const [dishes, setDishes] = React.useState([]);
  const [categoryId, setCategoryId] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [dish, setDish] = React.useState({});
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchDishesByCategory = () => {
    handleGetCurrentMenuDishesByCategory(
      categoryId,
      setDishes,
      setDishesLoading
    );
  };

  React.useEffect(() => {
    if (categories.length > 0) {
      setCategoryId(categories[0].id);
    }
  }, [categories]);

  React.useEffect(() => {
    fetchDishesByCategory();
  }, [categoryId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleIdCategory = (categoryId) => {
    setCategoryId(categoryId);
  };

  const handleSeeMoreModal = (image, name, description, price) => {
    setDish({
      image: image,
      name: name,
      description: description,
      price: price,
    });
    setOpenModal(true);
  };

  React.useEffect(() => {
    if (dish != isNullOrUndef) {
      console.log(dish);
    }
  }, [dish]);

  return (
    <>
      {loading ? (
        <Box
          flexDirection="column"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress color="primary" />
          <Typography variant="h6" marginTop={3} color="textDisabled">
            Cargando las categorías...
          </Typography>
        </Box>
      ) : (
        <Box sx={{ p: 0 }}>
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
            <CustomTabPanel
              key={category.id}
              value={value}
              index={index}
              padding={0}
            >
              {dishesLoading ? (
                <Box
                  flexDirection="column"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh",
                  }}
                >
                  <CircularProgress color="primary" />
                  <Typography variant="h6" marginTop={3} color="textDisabled">
                    Cargando platillos...
                  </Typography>
                </Box>
              ) : Array.isArray(dishes) && dishes.length > 0 ? (
                <Grid container spacing={{ xs: 1, sm: 2 }}>
                  {dishes.map((dish, index) => (
                    <Grid item xs={6} sm={4} lg={2} key={index}>
                      <DishCard
                        key={dish.id}
                        image={
                          dish?.imageId
                            ? `${API_URL}/file/${dish.imageId}`
                            : "https://www.shutterstock.com/image-vector/vector-isolated-one-round-plate-600nw-2217476735.jpg"
                        }
                        name={dish.name}
                        description={dish.description}
                        price={dish.price}
                        seeMore={() => {
                          handleSeeMoreModal(
                            dish.imageId,
                            dish.name,
                            dish.description,
                            dish.price
                          );
                        }}
                      />
                    </Grid>
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
                    No hay mas platillos de esta categoría
                  </Typography>
                </Box>
              )}
            </CustomTabPanel>
          ))}
        </Box>
      )}
      <SeeMoreModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        dish={dish}
      />
    </>
  );
}
