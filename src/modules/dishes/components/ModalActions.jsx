import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { CircularProgress, MenuItem } from "@mui/material";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { col, img, input } from "framer-motion/client";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import {
  handleChangeStatusDish,
  handleCreateDish,
  handleUpdateDish,
} from "../controllers/DishesController";

export default function ModalActions({
  openModal,
  setOpenModal,
  categories,
  onSubmit,
  setSuccess,
  setError,
  create,
  update,
  disable,
  setCreatedDish,
  dish,
  setUpdatedDish,
  dishLoading,
  setDishLoading,
  dishCategory,
  enable,
  image,
}) {
  const [dishImage, setDishImage] = React.useState(null);
  const [category, setCategory] = React.useState(dishCategory?.id || "");
  const [loading, setLoading] = React.useState(false);

  const container = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      xs: 250,
      sm: disable || enable ? 300 : 350,
      md: disable || enable ? 350 : 450,
    },
    bgcolor: "background.paper",
    borderRadius: "16px",
    boxShadow: 24,
    p: 3,
  };

  const iconStyle = {
    width: 100,
    height: 100,
    marginBottom: 3,
  };

  const placeHolderImg =
    "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg";

  const formRef = React.useRef(null);

  const handleClose = () => {
    setOpenModal(false);
    if (formRef.current) {
      formRef.current.reset(); // Resetea el formulario
    }
    setDishImage(null);
    setCategory("");
  };

  React.useEffect(() => {
    if (dishCategory != null && image != null) {
      setDishImage(image);
      setDishLoading(false);
    }
  }, [dish, dishCategory, image]);

  React.useEffect(() => {
    setCategory(dishCategory?.id || "");
    setDishImage(image);
  }, [dishCategory]);

  const fileInputRef = React.useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        setDishImage(base64String);
        setFieldValue("imageBase64", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio").max(26, "El nombre no puede tener mas de 25 caracteres").matches(
      /^(?!.*(<script|javascript:|onerror|alert|<iframe|<img|<body|<head|<html|find|db|delete|insert|aggregate|data)).*$/,
      "El nombre no puede contener palabras reservadas o códigos, travieso."
    ),
    description: Yup.string().required("La descripción es obligatoria").max(121, "La descripción no puede tener mas de 120 caracteres").matches(
      /^(?!.*(<script|javascript:|onerror|alert|<iframe|<img|<body|<head|<html|find|db|delete|insert|aggregate|data)).*$/,
      "La descripción no puede contener palabras reservadas o códigos.travieso."
    ),
    price: Yup.number()
      .typeError("Ingrese el precio en números")
      .moreThan(0, "El precio debe de ser mayor que 0")
      .lessThan(100000, "El precio no puede ser tan alto")
      .required("El precio es obligatorio"),
    category: Yup.string().required("La categoría es obligatoria"),
    imageBase64: Yup.mixed()
      .test(
        "is-not-placeholder",
        "La foto del platillo es obligatoria",
        (value) => value !== placeHolderImg
      )
      .nullable(),
  });

  const createDish = async (values) => {
    setError(null);
    setSuccess(null);
    await handleCreateDish(
      values,
      setSuccess,
      setLoading,
      setCreatedDish,
      setError
    );
    handleClose();
  };

  const updateDish = async (values) => {
    setError(null);
    setSuccess(null);
    await handleUpdateDish(
      values.id,
      values,
      setSuccess,
      setLoading,
      setUpdatedDish,
      setError
    );
    handleClose();
  };

  const changeStatus = async (values) => {
    setError(null);
    setSuccess(null);
    await handleChangeStatusDish(
      values.id,
      setSuccess,
      setLoading,
      setError,
      setUpdatedDish,
      setOpenModal,
      disable
    );
    handleClose();
  };

  const ActionButton = ({ loading }) => (
    <Button
      variant="contained"
      size="large"
      color={disable ? "error" : "success"}
      sx={{ width: "45%" }}
      type="submit"
      loading={loading}
      loadingPosition="start"
    >
      {disable ? "Deshabilitar" : "Habilitar"}
    </Button>
  );

  const CancelButton = () => (
    <Button
      variant="outlined"
      color={disable ? "error" : "success"}
      size="large"
      sx={{ width: "45%" }}
      onClick={handleClose}
    >
      CANCELAR
    </Button>
  );

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openModal}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          sx: {
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
        },
      }}
    >
      <Fade in={openModal}>
        <Box sx={container}>
          {dishLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="200px"
              minWidth="200px"
            >
              <CircularProgress />
            </Box>
          ) : disable || enable ? (
            <Box flexDirection="column" display="flex" alignItems="center">
              {disable ? (
                <ErrorOutlineIcon sx={iconStyle} color="error" />
              ) : (
                <HelpOutlineIcon sx={iconStyle} color="success" />
              )}
              <Typography
                variant="subtitle1"
                color="gray"
                textAlign="center"
                marginBottom={2}
              >
                {disable
                  ? "¿Estás seguro de deshabilitar este platillo?"
                  : "¿Estás seguro de habilitar este platillo?"}
              </Typography>
              <Typography
                variant="h5"
                fontWeight="bold"
                marginBottom={3}
                textAlign="center"
              >
                Platillo: {dish?.name}
              </Typography>
              <Formik
                enableReinitialize
                initialValues={{
                  id: dish?.id,
                }}
                onSubmit={changeStatus}
              >
                <Form>
                  <Field
                    as={TextField}
                    id="id"
                    name="id"
                    sx={{ display: "none" }}
                  />
                  <Box display="flex" justifyContent="space-between">
                    {disable ? (
                      <>
                        <ActionButton loading={loading} />
                        <CancelButton />
                      </>
                    ) : (
                      <>
                        <CancelButton />
                        <ActionButton loading={loading} />
                      </>
                    )}
                  </Box>
                </Form>
              </Formik>
            </Box>
          ) : (
            <>
              <Typography
                id="transition-modal-title"
                variant="h6"
                sx={{ fontWeight: "bold" }}
                component="h2"
              >
                {update ? "Modificar platillo" : "Agregar platillo"}
              </Typography>
              <Formik
                enableReinitialize={update}
                initialValues={{
                  id: dish?.id || null,
                  name: dish?.name || "",
                  description: dish?.description || "",
                  price: dish?.price || "",
                  category: dishCategory?.id || "",
                  imageBase64: dishImage || placeHolderImg,
                }}
                validationSchema={validationSchema}
                onSubmit={create ? createDish : updateDish}
              >
                {({ errors, touched, setFieldValue }) => (
                  <Form>
                    <Box flexDirection="column" marginTop={4}>
                      <Field
                        as={TextField}
                        id="name"
                        name="name"
                        label="Nombre del platillo"
                        variant="outlined"
                        fullWidth
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                        inputProps={{ maxLength: 25 }}
                      />
                      <Field
                        as={TextField}
                        id="description"
                        name="description"
                        label="Descripción"
                        variant="outlined"
                        fullWidth
                        error={Boolean(
                          touched.description && errors.description
                        )}
                        helperText={touched.description && errors.description}
                        multiline
                        minRows={1}
                        maxRows={2}
                        inputProps={{ maxLength: 121 }}
                        sx={{ marginTop: 3 }}
                      />
                      <Box
                        flexDirection="row"
                        display="flex"
                        justifyContent="space-between"
                        marginTop={3}
                      >
                        <Field
                          as={TextField}
                          id="price"
                          name="price"
                          label="Precio"
                          variant="outlined"
                          error={Boolean(touched.price && errors.price)}
                          helperText={touched.price && errors.price}
                          sx={{ width: "50%" }}
                          inputProps={{ maxLength: 6 }}
                        />
                        <FormControl sx={{ width: "45%" }}>
                          <InputLabel id="category-label">Categoría</InputLabel>
                          <Field
                            as={Select}
                            labelId="category-label"
                            id="category"
                            name="category"
                            value={category}
                            label="Categoría"
                            error={Boolean(touched.category && errors.category)}
                            helperText={touched.category && errors.category}
                            onChange={(event) => {
                              setCategory(event.target.value);
                              setFieldValue("category", event.target.value);
                            }}
                          >
                            {categories.map((category, index) => (
                              <MenuItem key={index} value={category.id}>
                                {category.name}
                              </MenuItem>
                            ))}
                          </Field>
                        </FormControl>
                      </Box>
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <img
                          src={dishImage ? dishImage : placeHolderImg}
                          alt="Subir imagen"
                          onClick={handleClick}
                          style={{
                            cursor: "pointer",
                            maxWidth: "100%",
                            marginBottom: "10px",
                            maxHeight: "150px",
                            marginTop: 25,
                            objectFit: "contain"
                          }}
                        />
                        <input
                          accept="image/*"
                          type="file"
                          ref={fileInputRef}
                          onChange={(event) =>
                            handleFileChange(event, setFieldValue)
                          }
                          style={{ display: "none" }}
                          name="imageBase64"
                        />
                        {errors.imageBase64 && touched.imageBase64 && (
                          <Box
                            color="error.main"
                            display="flex"
                            justifyContent="center"
                            mt={1}
                          >
                            {errors.imageBase64}
                          </Box>
                        )}
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        marginTop: 2,
                      }}
                    >
                      <Button
                        variant="contained"
                        color={update ? "secondary" : "success"}
                        onClick={handleClick}
                      >
                        <CloudUploadIcon />
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          sx={{ marginLeft: 1 }}
                        >
                          SUBIR IMAGEN
                        </Typography>
                      </Button>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="space-around"
                      marginTop={3}
                    >
                      <Button
                        variant="outlined"
                        color={update ? "secondary" : "primary"}
                        size="large"
                        sx={{ width: "40%" }}
                        onClick={handleClose}
                      >
                        Cancelar
                      </Button>
                      <Button
                        variant="contained"
                        color={update ? "secondary" : "primary"}
                        size="large"
                        sx={{ width: "40%" }}
                        type="submit"
                        loading={loading}
                        loadingPosition="start"
                      >
                        {update ? "Modificar" : "Registrar"}
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </>
          )}
        </Box>
      </Fade>
    </Modal>
  );
}
