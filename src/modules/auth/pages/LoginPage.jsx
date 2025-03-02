import { TextField, Button, Typography, Box, Link, Grid, Avatar, CircularProgress, Alert } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { handleLogin } from "../controllers/AuthController";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

const RootContainer = styled(Box)({
  display: "flex",
  height: "100vh",
  width: "100%",
  overflow: "hidden", // Evita el scroll
});

const FormSection = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "480px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: theme.spacing(4, 6),
  backgroundColor: "#FFFFFF",
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
    padding: theme.spacing(3, 4),
  },
}));

const ImageSection = styled(Box)({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  position: "relative",
});

const BackgroundImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover", // Cubre todo el espacio disponible
  objectPosition: "center",
});

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
  .email("Ingresa un correo electrónico válido")
  .required("El correo es obligatorio"),
password: Yup.string()
  .required("La contraseña es obligatoria"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);


  return (
    <RootContainer>
      <FormSection>
        <Box sx={{ flex: "1 0 auto", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Box sx={{ maxWidth: "360px", width: "100%", mx: "auto" }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <img src="src/assets/ambigu-icon.png" alt="Ambigú Logo" width="150" />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Typography variant="logo" fontSize="3.5rem" color="primary" gutterBottom>
                Ambigú
              </Typography>
            </Box>

            <Typography variant="h5" fontWeight="bold" sx={{ mt: 2, mb: 3 }} align="center">
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
                    InputProps={{ sx: { borderRadius: 1 } }}
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
                    InputProps={{ sx: { borderRadius: 1 } }}
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    sx={{ mt: 3, py: 1.5, borderRadius: 1, textTransform: "none", fontSize: "1rem" }}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Iniciar"}
                  </Button>
                </Form>
              )}
            </Formik>

            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Link href="/reset-password" variant="body2" sx={{ color: "text.secondary" }}>
                ¿Olvidaste tu contraseña?
              </Link>
            </Box>
          </Box>
        </Box>
        <Box sx={{textAlign: "center", mt:6}}>
          <Typography variant="logo" fontSize="1.5rem">
            Ambigú
          </Typography>
          <Typography variant="footer">
            © 2025 All Rights Reserved<br />
            Made by Flawless Coders
          </Typography>
        </Box>
      </FormSection>

      <ImageSection sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
        <BackgroundImage 
          src="src/assets/ambigu-login.png" 
          alt="Ilustración de Ambigú" 
        />
      </ImageSection>
    </RootContainer>
  );
};

export default LoginPage;