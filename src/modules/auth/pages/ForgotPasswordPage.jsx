import { useState } from 'react'
import { TextField, Button, Typography, Box, Link, CircularProgress, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import AuthLayout from '../components/AuthLayout'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import { handleForgotPassword } from '../controllers/AuthController'

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Ingresa un correo válido').required('El correo es obligatorio')
});

export default function ForgotPasswordPage() {
  const[openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  return (
    <AuthLayout imageSrc="/assets/forgot-password.svg" imageStyle={{ width: '75%' }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mt: 2, mb: 3 }} align="center">
        Recuperar Cuenta
      </Typography>

      <Formik
        initialValues={{ email: "" }}
        validationSchema={forgotPasswordSchema}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          handleForgotPassword(values.email, (error) => setErrors({ server: error }), setSubmitting, () => setOpenDialog(true));
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            {errors.server && <Alert severity="error" sx={{ mb: 2 }}>{errors.server}</Alert>}

            <Field
              as={TextField}
              fullWidth
              label="Correo Electrónico"
              name="email"
              variant="outlined"
              margin="normal"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />

            <Button
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, py: 1.5 }}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} sx={{ color: "white" }} /> : <>Siguiente <ArrowForward sx={{ ml: 1 }} /></>}
            </Button>
          </Form>
        )}
      </Formik>

      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Link href="/login" fontSize="0.95rem" variant="body2" sx={{ color: "text.secondary" }}>
          Volver al inicio de sesión
        </Link>
      </Box>

      {/* Dialog de éxito */}
      <Dialog open={openDialog} onClose={() => navigate("/")}>
        <DialogTitle>Correo enviado</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Si el correo proporcionado es válido, recibirás un mensaje con instrucciones para restablecer tu contraseña. Por favor revisa tu bandeja de entrada.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate("/")} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </AuthLayout>
  )
}