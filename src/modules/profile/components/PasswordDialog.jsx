import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { handleUpdatePassword } from "../controllers/profileController";
import Backdrop from "@mui/material/Backdrop";

export const PasswordDialog = (props) => {
  const { open, onClose, user, setSuccess, setError } = props;
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (values) => {
    setError(null);
    setSuccess(null);

    await handleUpdatePassword(
      user.id,
      values.currentPassword,
      values.newPassword,
      setError,
      setSuccess,
      setLoading
    );
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-password-title"
      aria-describedby="dialog-password-description"
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          sx: {
            backdropFilter: "blur(8px)", // Desenfoque del fondo
            backgroundColor: "rgba(0, 0, 0, 0.4)", // Color semitransparente
          },
        },
      }}
    >
      <DialogTitle id="dialog-password-title">Modificar contraseña</DialogTitle>
      <Formik
        initialValues={{
          id: user.id,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={passwordValidationSchema}
        onSubmit={handleSubmit}
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
                error={Boolean(
                  touched.currentPassword && errors.currentPassword
                )}
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
                error={Boolean(
                  touched.confirmPassword && errors.confirmPassword
                )}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} variant="outlined" color="secondary">
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Aceptar"}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};
