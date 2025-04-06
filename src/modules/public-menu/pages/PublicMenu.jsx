import React, { useEffect, useState } from "react";
import HeaderPublic from "../../../kernel/HeaderPublic";
import { Box, Divider, Grid, Typography } from "@mui/material";
import PublicMenuTabs from "../components/PublicMenuTabs";
import {
  handleGetCurrentMenu,
  handleGetCurrentMenuCategories,
  handleGetDishesByCategory,
} from "../controllers/publicMenuController";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  pdf,
  Image,
  Font,
} from "@react-pdf/renderer";
import { useTheme } from "@emotion/react";
import "@fontsource/inter";
import "@fontsource/rubik";

export default function PublicMenu() {
  const [currentMenu, setCurrentMenu] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [dishesByCategory, setDishesByCategory] = useState([]);
  const [dishesByCategoryLoading, setDishesByCategoryLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const theme = useTheme();

  const logo = theme.logo;

  const fetchMenu = () => {
    setLoading(true);
    handleGetCurrentMenu(setCurrentMenu, setLoading);
  };

  const fetchCategories = () => {
    setCategoriesLoading(true);
    handleGetCurrentMenuCategories(setCategories, setCategoriesLoading);
  };

  const fetchDishesByCategory = () => {
    setDishesByCategoryLoading(true);
    handleGetDishesByCategory(setDishesByCategory, setDishesByCategoryLoading);
  };

  useEffect(() => {
    fetchDishesByCategory();
    fetchMenu();
    fetchCategories();
  }, []);

  const downloadPDF = async () => {
    console.log(dishesByCategory);
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(
      today.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${today.getFullYear()}`;
    const blob = await pdf(
      <MyDocument
        categoriesAndDishes={dishesByCategory}
        logo={logo}
        primaryColor={theme.palette.sidebar.bg}
        currentMenu={currentMenu}
        date={formattedDate}
        API_URL={API_URL}
      />
    ).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentMenu.name}_${formattedDate.replace("/", "_")}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return loading ? (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress />
    </Box>
  ) : (
    <>
      <HeaderPublic
        section="Menú"
        download={true}
        downloadPDF={downloadPDF}
        loadingButton={dishesByCategoryLoading}
      />
      <Box
        m={2}
        marginBottom={0}
        display={"flex"}
        justifyContent={{ xs: "center", sm: "flex-start" }}
      >
        <Typography variant="h3">{currentMenu.name}</Typography>
      </Box>
      <PublicMenuTabs categories={categories} loading={categoriesLoading} />
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
  },
  frontPage: {
    margin: 10,
    padding: 10,
    height: 822,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  normalPage: {
    margin: 10,
    padding: 20,
    display: "flex",
    border: "2 solid gray",
    minHeight: 822,
  },
});

const MyDocument = ({
  categoriesAndDishes,
  logo,
  primaryColor,
  currentMenu,
  date,
  API_URL
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.frontPage}>
        {logo != null ? (
          <Image src={logo} style={{ width: 500, marginTop: 10 }} />
        ) : (
          <Text style={{ fontSize: 40, fontWeight: "bold" }}>
            {currentMenu.name}
          </Text>
        )}
        <View
          style={{ position: "absolute", bottom: "10", alignItems: "center" }}
        >
          <Text style={{ fontSize: 17, color: "gray" }}>
            Válido solo para el día:
          </Text>
          <Text style={{ fontSize: 17, color: "gray" }}>{date}</Text>
        </View>
      </View>
    </Page>
    {categoriesAndDishes.map((item, index) => (
      <Page key={index} size="A4" style={styles.page}>
        <View style={styles.normalPage}>
          <View
            style={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View>
              <Text
                style={{ fontSize: 40, fontWeight: "bold", marginRight: 10 }}
              >
                {item.category?.name}
              </Text>
            </View>
            <View>
              <Image
                source={
                  item.category?.imageId
                            ? `${API_URL}/file/${item.category.imageId}`
                            : "https://www.shutterstock.com/image-vector/vector-isolated-one-round-plate-600nw-2217476735.jpg"
                }
                style={{
                  width: 75,
                  height: 75,
                  borderRadius: 50,
                  borderWidth: 5,
                  borderColor: "black",
                  borderStyle: "dashed",
                }}
              />
            </View>
          </View>
          
          {item.dishes.length<0? <Text>Ya no hay platillos disponibles</Text> :item.dishes.map((dish) => (
            <View
              style={{
                flexDirection: "row",
                marginVertical: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                height: 110,
                borderTop: "2 dotted gray",
                borderBottom: "2 dotted gray",
              }}
            >
              {(index + 1) % 2 === 0 ? (
                <>
                  <View style={{ width: "30%" }}>
                    <Image
                     source={
                      dish.imageId
                                ? `${API_URL}/file/${dish.imageId}`
                                : "https://www.shutterstock.com/image-vector/vector-isolated-one-round-plate-600nw-2217476735.jpg"
                    }
                      style={{
                        borderRadius: 100,
                        width: 145,
                        borderWidth: 3,
                        borderColor: "black",
                        borderStyle: "solid",
                      }}
                    />
                  </View>
                  <View style={{ width: "70%" }}>
                    <View style={{ flexDirection: "column", marginLeft: 65 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{
                            width: 75,
                            borderRadius: 50,
                            backgroundColor: primaryColor,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 20,
                              color: "white",
                              fontWeight: "bold",
                            }}
                          >
                            ${dish.price}
                          </Text>
                        </View>
                        <View>
                          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                            {dish.name}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "flex-end",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            textAlign: "right",
                            width: "100%",
                            marginTop: 5,
                          }}
                        >
                          {dish.description}
                        </Text>
                      </View>
                    </View>
                  </View>
                </>
              ) : (
                <>
                  <View style={{ width: "70%" }}>
                    <View style={{ flexDirection: "column" }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View>
                          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                            {dish.name}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: 75,
                            borderRadius: 50,
                            backgroundColor: primaryColor,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: 70,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 20,
                              color: "white",
                              fontWeight: "bold",
                            }}
                          >
                            ${dish.price}
                          </Text>
                        </View>
                      </View>
                      <View style={{ maxWidth: "80%" }}>
                        <Text style={{ fontSize: 12, marginTop: 5 }}>
                          {dish.description}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ width: "30%" }}>
                    <Image
                      source={
                        dish.imageId
                                  ? `${API_URL}/file/${dish.imageId}`
                                  : "https://www.shutterstock.com/image-vector/vector-isolated-one-round-plate-600nw-2217476735.jpg"
                      }
                      style={{
                        borderRadius: 100,
                        width: 145,
                        borderWidth: 3,
                        borderColor: "black",
                        borderStyle: "solid",
                      }}
                    />
                  </View>
                </>
              )}
            </View>
          ))}
        </View>
      </Page>
    ))}
  </Document>
);
