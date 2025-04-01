import { TextField, Button, Typography, Box, Link, CircularProgress, Alert, ThemeProvider } from "@mui/material";
import { useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { handleLogin } from "../controllers/AuthController";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import AuthLayout from "../components/AuthLayout";
import theme from "../../../config/theme";
import LoaderAmbigu from "../../../kernel/LoaderAmbigu";

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Ingresa un correo válido").required("El correo es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, user, loading } = useContext(AuthContext);


if (loading) {
  return (
    <LoaderAmbigu />
  );
}

if (user) {
  return <Navigate to="/dashboard" replace />;
}

  return (
    <ThemeProvider theme={theme}>
    <AuthLayout imageSrc="src/assets/ambigu-login.png">
      <Typography variant="h5" fontWeight="bold" align="center">
        Iniciar Sesión
      </Typography>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          handleLogin(values.email, values.password, (error) => setErrors({ server: error }), setSubmitting, login, navigate);
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

            <Field
              as={TextField}
              fullWidth
              label="Contraseña"
              type="password"
              name="password"
              variant="outlined"
              margin="normal"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />

            <Button
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, py: 1.5 }}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Iniciar"}
            </Button>
          </Form>
        )}
      </Formik>

      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Link href="/forgot-password" variant="body2" sx={{ color: "text.secondary" }}>
          ¿Olvidaste tu contraseña?
        </Link>
      </Box>
    </AuthLayout>
  </ThemeProvider>
  );
};

export default LoginPage;