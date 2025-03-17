import { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography, CircularProgress, Grid } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { updateCategory, createCategory, updateCategoryImage } from "../services/categoriesService";
import Backdrop from "@mui/material/Backdrop";

const RegisterDialog = ({ open, handleClose, category, onSuccess }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setPreviewImage(category.imageBase64 ? `data:image/png;base64,${category.imageBase64}` : null);
    } else {
      setPreviewImage(null);
      setImageFile(null);
    }
  }, [category]);

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre de la categoría es obligatorio"),
    image: Yup.mixed().required("La imagen es obligatoria"),
  });

  return (
    <Modal open={open} onClose={!buttonLoading ? handleClose : null} slots={{ backdrop: Backdrop }}
    slotProps={{
      backdrop: {
        timeout: 500,
        sx: {
          backdropFilter: 'blur(8px)', // Desenfoque del fondo
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Color semitransparente
        },
      },
    }}>
      
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          width: 350,
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          {category ? "Editar categoría" : "Agregar categoría"}
        </Typography>

        <Formik
  initialValues={{
    name: category?.name || "",
    imageBase64: category?.imageBase64 || "",
    status: category?.status || true,
  }}
  validationSchema={validationSchema}
  onSubmit={async (values, { setSubmitting }) => {
    setButtonLoading(true);
    try {
      if (category) {
        await updateCategory(category.id, values.name, values.imageBase64, values.status);
        if (imageFile) {
          await updateCategoryImage(category.id, imageFile);
        }
      } else {
        await createCategory(values.name, imageFile);
      }

      onSuccess();
      handleClose();
    } catch (error) {
      console.error("Error al guardar la categoría:", error);
    } finally {
      setButtonLoading(false);
      setSubmitting(false);
    }
  }}
>
          {({ setFieldValue, errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                label="Nombre de la categoría"
                name="name"
                variant="outlined"
                margin="normal"
                error={Boolean(errors.name && touched.name)}
                helperText={touched.name && errors.name}
              />

              <Box
                sx={{
                  width: "100%",
                  height: 150,
                  backgroundColor: "#e0e0e0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 2,
                  mb: 2,
                }}
              >
                {previewImage ? (
                  <img src={previewImage} alt="Preview" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                ) : (
                  <CloudUploadIcon sx={{ fontSize: 48, color: "gray" }} />
                )}
              </Box>

              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{ backgroundColor: "green", color: "white", mb: 2 }}
                disabled={buttonLoading}
              >
                SUBIR IMAGEN
                <input
                  type="file"
                  hidden
                  onChange={(event) => {
                    const file = event.target.files[0];
                    if (file) {
                      setImageFile(file);
                      setPreviewImage(URL.createObjectURL(file));
                      setFieldValue("image", file);
                    }
                  }}
                />
              </Button>

              <Grid container justifyContent="space-between">
                <Button variant="outlined" onClick={handleClose} sx={{ width: "48%" }} disabled={buttonLoading}>
                  CANCELAR
                </Button>
                <Button type="submit" variant="contained" color="primary" sx={{ width: "48%" }} disabled={buttonLoading}>
                  {buttonLoading ? <CircularProgress size={24} color="inherit" /> : category ? "ACTUALIZAR" : "AGREGAR"}
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default RegisterDialog;
