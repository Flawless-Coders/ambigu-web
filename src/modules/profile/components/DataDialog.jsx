import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Avatar, IconButton, Box, CircularProgress, Grid2 } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { PhotoCamera } from "@mui/icons-material";
import * as Yup from "yup";
import { handleUpdateAvatar, handleUpdateAdmin } from "../controllers/profileController";

export const DataDialog = ( props ) => {
  const { open, onClose, user, onUpdate, setSuccess, setError } = props;
  const [avatar, setAvatar] = useState(user.avatarBase64);
  const [loading, setLoading] = useState(false);

  const dataValidationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
    lastname_p: Yup.string().required("El apellido paterno es obligatorio"),
    lastname_m: Yup.string().required("El apellido materno es obligatorio"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "El teléfono debe tener 10 dígitos")
      .required("El teléfono es obligatorio"),
    email: Yup.string().email("Correo electrónico inválido").required("El correo electrónico es obligatorio"),
  });

  const handleAvatarChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
      setFieldValue("avatar", file);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (values.avatar) {
        await handleUpdateAvatar(user.id, values.avatar, setLoading, setError, setSuccess);
      }
      await handleUpdateAdmin({ ...values, avatar: undefined }, setLoading, setError, setSuccess);
      setSuccess("Datos actualizados correctamente");
        onUpdate();
    } catch (error) {
      setError("Error al actualizar los datos");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <>
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-data-title"
      aria-describedby="dialog-data-description"
    >
      <DialogTitle id="dialog-data-title">Modificar datos</DialogTitle>
      <Formik
        initialValues={{
          id: user.id,
          name: user.name,
          lastname_p: user.lastname_p,
          lastname_m: user.lastname_m,
          phone: user.phone,
          email: user.email,
          avatar: null,
        }}
        validationSchema={dataValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form>
            <DialogContent>
              <Grid2 container justifyContent="center" alignItems="center" direction="column">
                <Box sx={{ position: "relative", display: "inline-block" }}>
                  <Avatar
                    src={avatar || "https://via.placeholder.com/150"}
                    alt="Foto de perfil"
                    sx={{ width: 120, height: 120 }}
                  />
                  <IconButton
                    color="primary"
                    component="label"
                    sx={{
                      position: "absolute",
                      bottom: 5,
                      right: 5,
                      backgroundColor: "background.paper",
                      boxShadow: 2,
                    }}
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={(event) => handleAvatarChange(event, setFieldValue)}
                    />
                    <PhotoCamera />
                  </IconButton>
                </Box>
              </Grid2>
              <Field
                as={TextField}
                label="Nombre(s)"
                name="name"
                fullWidth
                margin="normal"
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />
              <Grid2 container spacing={2}>
                <Grid2 item xs={6}>
                  <Field
                    as={TextField}
                    label="Apellido paterno"
                    name="lastname_p"
                    fullWidth
                    margin="normal"
                    error={Boolean(touched.lastname_p && errors.lastname_p)}
                    helperText={touched.lastname_p && errors.lastname_p}
                  />
                </Grid2>
                <Grid2 item xs={6}>
                  <Field
                    as={TextField}
                    label="Apellido materno"
                    name="lastname_m"
                    fullWidth
                    margin="normal"
                    error={Boolean(touched.lastname_m && errors.lastname_m)}
                    helperText={touched.lastname_m && errors.lastname_m}
                  />
                </Grid2>
              </Grid2>
              <Field
                as={TextField}
                label="Teléfono"
                name="phone"
                fullWidth
                margin="normal"
                error={Boolean(touched.phone && errors.phone)}
                helperText={touched.phone && errors.phone}
              />
              <Field
                as={TextField}
                label="Correo electrónico"
                name="email"
                fullWidth
                margin="normal"
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} variant="outlined" color="secondary">
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Aceptar"}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
      </Dialog>
    </>
  );
};