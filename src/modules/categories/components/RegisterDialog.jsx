import { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography, CircularProgress, Grid } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useOutletContext } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import { handleCreateCategory, handleUpdateCategory } from "../controllers/categoriesController";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

const RegisterDialog = ({ open, handleClose, category, onSuccess }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { setSuccess, setError } = useOutletContext();

  useEffect(() => {
    if (category) {
      setPreviewImage(category.imageBase64 ? `data:image/png;base64,${category.imageBase64}` : null);
    } else {
      setPreviewImage(null);
      setImageFile(null);
    }
  }, [category]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("El nombre de la categoría es obligatorio")
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(30, "El nombre no puede exceder los 30 caracteres")
      .trim()
      .test("no-only-spaces", "El nombre no puede contener solo espacios", (value) => {
        return value && value.trim().length > 0;
      }),
    image: category
      ? Yup.mixed()
        .nullable()
        .test("fileType", "Solo se permiten archivos de imagen (jpg, jpeg, png)", (value) => {
          if (!value) return true;
          return ["image/jpeg", "image/jpg", "image/png"].includes(value.type);
        })
      : Yup.mixed()
        .required("La imagen es obligatoria")
        .test("fileType", "Solo se permiten archivos de imagen (jpg, jpeg, png)", (value) => {
          if (!value) return false;
          return ["image/jpeg", "image/jpg", "image/png"].includes(value.type);
        }),
  });

  return (
    <Modal
      open={open}
      onClose={!buttonLoading ? handleClose : null}
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
        <Typography variant="h6" mb={2}>
          {category ? "Editar categoría" : "Agregar categoría"}
        </Typography>

        <Formik
          initialValues={{
            name: category?.name || "",
            imageBase64: category?.imageBase64 || "",
            status: category?.status ?? true,
            image: category ? null : undefined,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setButtonLoading(true);
            setError(null);
            setSuccess(null);

            try {
              if (category) {
                await handleUpdateCategory(
                  category.id, values.name, values.imageBase64, values.status, imageFile,
                  setSuccess, setError, setButtonLoading, onSuccess
                );
              } else {
                await handleCreateCategory(
                  values.name, imageFile, setSuccess, setError, setButtonLoading, onSuccess
                );
              }

              resetForm();
              setImageFile(null);
              setPreviewImage(null);

              await onSuccess();

              setTimeout(() => {
                handleClose();
              }, 300);
            } catch (error) {
              console.error("Error en la operación:", error);
              setError(error.message || "Error al procesar la operación");
            } finally {
              setButtonLoading(false);
              setSubmitting(false);
            }
          }}
        >
          {({ setFieldValue, errors, touched, values }) => (
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
                disabled={buttonLoading}
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
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {buttonLoading ? (
                  <CircularProgress />
                ) : previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain"
                    }}
                  />
                ) : (
                  <CloudUploadIcon sx={{ fontSize: 48, color: "gray" }} />
                )}
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
                  component="label"
                  style={{
                    backgroundColor: category ? "#7B1FA2" : "primary",
                    color: category && "white",
                    marginBottom: 10
                  }}
                  disabled={buttonLoading}
                >
                  <CloudUploadOutlinedIcon />
                  <Typography
                    variant="body1"
                    sx={{ marginLeft: 1 }}
                  >
                    {buttonLoading ? "CARGANDO..." : "SUBIR IMAGEN"}
                  </Typography>
                  <input
                    type="file"
                    hidden
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      if (file) {
                        if (["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
                          setImageFile(file);
                          setPreviewImage(URL.createObjectURL(file));
                          setFieldValue("image", file);
                        } else {
                          setError("Solo se permiten archivos de imagen (jpg, jpeg, png)");
                        }
                      }
                    }}
                  />
                </Button>
              </Box>
              <Grid container justifyContent="space-between">
                <Button
                  variant="outlined"
                  onClick={handleClose}
                  style={{
                    borderColor: category ? "#7B1FA2" : "primary",
                    color: category ? "#7B1FA2" : "primary",
                    width: "48%"
                  }}
                  disabled={buttonLoading}
                >
                  CANCELAR
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: category ? "#7B1FA2" : "primary",
                    color: category && "white",
                  }}
                  disabled={buttonLoading}
                >
                  {buttonLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : category ? (
                    "ACTUALIZAR"
                  ) : (
                    "AGREGAR"
                  )}
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal >
  );
};

export default RegisterDialog;
