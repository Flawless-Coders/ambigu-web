import {Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export const PasswordDialog = ({ open, onClose }) => {
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
  