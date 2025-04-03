import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Container, Box, TextField, Button, Typography, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import LoaderAmbigu from "../../../kernel/LoaderAmbigu";

const PasswordRecoveryPage = () => {
  const [searchParams] = useSearchParams(); // Obtiene el token de la URL
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openExpiredTokenDialog, setOpenExpiredTokenDialog] = useState(false);
  const [serverError, setServerError] = useState("");
  const [validToken, setValidToken] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    console.log("Token:", token);
    axios.post(`${API_URL}/auth/validate-reset`, { token })
      .then(response => setValidToken(true))
      .catch(() => {
        setOpenExpiredTokenDialog(true);
      })
      .finally(() => setLoading(false));
  }, [token, navigate]);

  const handleCloseExpiredTokenDialog = () => {
    setOpenExpiredTokenDialog(false);
    navigate("/");
  };

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(8, "Debe tener al menos 8 caracteres")
      .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
      .matches(/[0-9]/, "Debe incluir al menos un número")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "Debe contener al menos un carácter especial")
      .required("La contraseña es obligatoria"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Las contraseñas no coinciden")
      .required("Debes confirmar tu contraseña"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post(`${API_URL}/auth/reset-password`, { token, newPassword: values.newPassword})
      setOpenSuccessDialog(true);
    } catch {
      setServerError("Error del servidor, intenta de nuevo más tarde");
      setOpenErrorDialog(true);
    }
    setSubmitting(false);
  };

  if(loading) return <LoaderAmbigu/>

  return (
    <Container maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    > 
    {validToken && (
      <Box
        sx={{
          mt: 8,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "background.paper",
          maxWidth: "500px",
          margin: "auto",
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <img 
            src="src/assets/ambigu-icon.png" 
            alt="Ambigu Logo" 
            style={{ maxWidth: '150px', height: 'auto' }}
          />
        </Box>

        <Typography variant="h4" align="center" gutterBottom>
          Recuperar Contraseña
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
          Ingresa tu nueva contraseña y confírmala
        </Typography>

        <Formik
          initialValues={{ newPassword: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nueva Contraseña"
                    type="password"
                    variant="outlined"
                    name="newPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.newPassword && Boolean(errors.newPassword)}
                    helperText={touched.newPassword && errors.newPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Confirmar Contraseña"
                    type="password"
                    variant="outlined"
                    name="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                  />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, py: 1.5, fontSize: "1rem" }} disabled={isSubmitting}>
              {isSubmitting ? '' : 'Continuar'}
                {isSubmitting && (
                  <CircularProgress
                    size={24}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                    />
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
      )}
      {/* Dialogo de Error del Servidor */}
      <Dialog open={openErrorDialog} onClose={() => setOpenErrorDialog(false)}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>{serverError}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenErrorDialog(false)} color="primary">Cerrar</Button>
        </DialogActions>
      </Dialog>

      {/* Dialogo de Confirmación */}
      <Dialog open={openSuccessDialog} onClose={() => navigate("/")}> 
        <DialogTitle>Éxito</DialogTitle>
        <DialogContent>
          <DialogContentText>Contraseña actualizada correctamente</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate("/")} color="primary">Aceptar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openExpiredTokenDialog} onClose={handleCloseExpiredTokenDialog}>
        <DialogTitle>Token Inválido</DialogTitle>
        <DialogContent>
          <DialogContentText>
            El enlace de recuperación de contraseña ha expirado o no es válido. 
            Por favor, solicita un nuevo enlace de recuperación de contraseña.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseExpiredTokenDialog} color="primary">Aceptar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PasswordRecoveryPage;