import { TextField, Button, Typography, Box, Link, Grid, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";

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
  justifyContent: "center",
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

const LoginPage = () => {
  return (
    <RootContainer>
      <FormSection>
        <Box sx={{ maxWidth: "360px", width: "100%", mx: "auto" }}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <img src="src/assets/ambigu-icon.png" alt="Ambigú Logo" width="150" />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="logo" fontSize="3.5rem" color="primary" gutterBottom>
              Ambigú
            </Typography>
          </Box>

          {/* Título */}
          <Typography variant="h5" fontWeight="bold" sx={{ mt: 2, mb: 3 }} align="center">
            Iniciar Sesión
          </Typography>

          {/* Formulario */}
          <Box component="form">
            <TextField 
              fullWidth 
              label="Correo Electrónico" 
              variant="outlined" 
              margin="normal"
              InputProps={{ sx: { borderRadius: 1 } }}
            />
            <TextField 
              fullWidth 
              label="Contraseña" 
              type="password" 
              variant="outlined" 
              margin="normal"
              InputProps={{ sx: { borderRadius: 1 } }}
            />

            {/* Botón de Inicio */}
            <Button 
              fullWidth 
              variant="contained" 
              color="success" 
              sx={{ mt: 3, py: 1.5, borderRadius: 1, textTransform: "none", fontSize: "1rem" }}
            >
              Iniciar
            </Button>
          </Box>

          {/* Link para recuperar contraseña */}
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Link href="/reset-password" variant="body2" sx={{ color: "text.secondary" }}>
              ¿Olvidaste tu contraseña?
            </Link>
          </Box>
        </Box>
      </FormSection>

      {/* Sección de la Imagen (visible solo en tablets y escritorio) */}
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