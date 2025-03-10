import {Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid2, Avatar, IconButton, Box} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { PhotoCamera } from "@mui/icons-material";
import * as Yup from "yup";

const PasswordDialog = ({ open, onClose }) => {
  const passwordValidationSchema = Yup.object({
    newPassword: Yup.string()
      .min(8, "Debe tener al menos 8 caracteres")
      .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
      .matches(/[0-9]/, "Debe incluir al menos un número")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Debe contener al menos un carácter especial"
      )
      .required("La contraseña es obligatoria"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Las contraseñas no coinciden")
      .required("Debes confirmar tu contraseña"),
    currentPassword: Yup.string().required(
      "La contraseña actual es obligatoria"
    ),
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-password-title"
      aria-describedby="dialog-password-description"
    >
      <DialogTitle id="dialog-password-title">Modificar contraseña</DialogTitle>
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={passwordValidationSchema}
        onSubmit={(values) => {
          console.log(values);
          onClose();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <DialogContent>
              <Field
                as={TextField}
                label="Contraseña actual"
                name="currentPassword"
                type="password"
                fullWidth
                margin="normal"
                error={Boolean(touched.currentPassword && errors.currentPassword)}
                helperText={touched.currentPassword && errors.currentPassword}
              />
              <Field
                as={TextField}
                label="Nueva contraseña"
                name="newPassword"
                type="password"
                fullWidth
                margin="normal"
                error={Boolean(touched.newPassword && errors.newPassword)}
                helperText={touched.newPassword && errors.newPassword}
              />
              <Field
                as={TextField}
                label="Confirmar contraseña"
                name="confirmPassword"
                type="password"
                fullWidth
                margin="normal"
                error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} variant="outlined" color="secondary">
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Aceptar
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

const DataDialog = ({ open, onClose, user }) => {
  const dataValidationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
    lastname_p: Yup.string().required("El apellido paterno es obligatorio"),
    lastname_m: Yup.string().required("El apellido materno es obligatorio"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "El teléfono debe tener 10 dígitos")
      .required("El teléfono es obligatorio"),
    email: Yup.string().email("Correo electrónico inválido").required("El correo electrónico es obligatorio"),
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-data-title"
      aria-describedby="dialog-data-description"
    >
      <DialogTitle id="dialog-data-title">Modificar datos</DialogTitle>
      <Formik
        initialValues={{
          name: user.name,
          lastname_p: user.lastname_p,
          lastname_m: user.lastname_m,
          phone: user.phone,
          email: user.email,
        }}
        validationSchema={dataValidationSchema}
        onSubmit={(values) => {
          console.log(values);
          onClose();
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form>
            <DialogContent>
            <Grid2 container justifyContent="center" alignItems="center" direction="column">
                <Box sx={{ position: "relative", display: "inline-block" }}>
                  <Avatar
                    src={user.avatarBase64 || "https://via.placeholder.com/150"}
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
                      onChange={(event) => setFieldValue("avatar", event.currentTarget.files[0])}
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
              <Button type="submit" variant="contained" color="primary">
                Aceptar
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
export { PasswordDialog, DataDialog };
