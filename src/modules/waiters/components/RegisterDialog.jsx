import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, CircularProgress, Box, Grid } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AvatarUploader from "./AvatarUploader"; // Componente separado para manejar la imagen

export const RegisterDialog = ({ open, onClose, user, onSubmit, loading, buttonLoading }) => {
  const [avatar, setAvatar] = useState(null);
  const placeholderAvatar = "https://avatar.iran.liara.run/public/1";

  useEffect(() => {
    if (user && user.avatarBase64) {
      setAvatar(user.avatarBase64);
    } else {
      setAvatar(null);
    }
  }, [user]);

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
    lastname_p: Yup.string().required("El apellido paterno es obligatorio"),
    lastname_m: Yup.string().required("El apellido materno es obligatorio"),
    phone: Yup.string().matches(/^[0-9]{10}$/, "El teléfono debe tener 10 dígitos").required("El teléfono es obligatorio"),
    email: Yup.string().email("Correo electrónico inválido").required("El correo electrónico es obligatorio"),
    avatar: Yup.mixed().required("La foto de perfil es obligatoria").test(
      "is-not-placeholder",
      "La foto de perfil es obligatoria",
      value => value !== placeholderAvatar || (user && user.avatarBase64)
    )
  });
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="register-dialog-title">
      <DialogTitle>{user ? "Modificar mesero" : "Registrar mesero"}</DialogTitle>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px" minWidth="400px">
          <CircularProgress />
        </Box>
      ) : (
        <Formik
          initialValues={{
            id: user?.id || null,
            name: user?.name || "",
            lastname_p: user?.lastname_p || "",
            lastname_m: user?.lastname_m || "",
            phone: user?.phone || "",
            email: user?.email || "",
            avatar: avatar || placeholderAvatar,
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form>
              <DialogContent>
                <Grid container justifyContent="center" alignItems="center" direction="column">
                  <AvatarUploader avatar={avatar || placeholderAvatar} setAvatar={setAvatar} setFieldValue={setFieldValue} />
                  {errors.avatar && touched.avatar && (
                    <Box color="error.main" mt={1}>
                      {errors.avatar}
                    </Box>
                  )}
                </Grid>
                <Field as={TextField} label="Nombre(s)" name="name" fullWidth margin="normal"
                  error={Boolean(touched.name && errors.name)} helperText={touched.name && errors.name} />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Field as={TextField} label="Apellido paterno" name="lastname_p" fullWidth margin="normal"
                      error={Boolean(touched.lastname_p && errors.lastname_p)} helperText={touched.lastname_p && errors.lastname_p} />
                  </Grid>
                  <Grid item xs={6}>
                    <Field as={TextField} label="Apellido materno" name="lastname_m" fullWidth margin="normal"
                      error={Boolean(touched.lastname_m && errors.lastname_m)} helperText={touched.lastname_m && errors.lastname_m} />
                  </Grid>
                </Grid>
                <Field as={TextField} label="Teléfono" name="phone" fullWidth margin="normal"
                  error={Boolean(touched.phone && errors.phone)} helperText={touched.phone && errors.phone} />
                <Field as={TextField} label="Correo electrónico" name="email" fullWidth margin="normal"
                  error={Boolean(touched.email && errors.email)} helperText={touched.email && errors.email} />
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose} variant="outlined" color="secondary" disabled={buttonLoading}>Cancelar</Button>
                <Button type="submit" variant="contained" color="primary" disabled={buttonLoading}>
                  {buttonLoading ? <CircularProgress size={24} /> : user ? "Actualizar" : "Registrar"}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      )}
    </Dialog>
  );
};