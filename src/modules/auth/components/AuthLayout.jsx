import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";


const RootContainer = styled(Box)({
  display: "flex",
  height: "100vh",
  width: "100%",
  overflow: "hidden",
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
  objectFit: "cover",
  objectPosition: "center",
});

const AuthLayout = ({ children, imageSrc, imageStyle }) => {
  return (
    <RootContainer>
      {/* Sección del Formulario */}
      <FormSection>
        <Box sx={{ flex: "1 0 auto", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Box sx={{ maxWidth: "360px", width: "100%", mx: "auto" }}>
            {/* Logo */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <img src="src/assets/ambigu-icon.png" alt="Ambigú Logo" width="150" />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="logo" fontSize="3.5rem" color="primary" gutterBottom>
                Ambigú
              </Typography>
            </Box>

            {children}
          </Box>
        </Box>

        <Box sx={{textAlign: "center"}}>
          <Typography variant="logo" fontSize="1.5rem">
            Ambigú<br />
          </Typography>
          <Typography variant="footer">
            © 2025 All Rights Reserved<br />
            Made by Flawless Coders
          </Typography>
        </Box>
      </FormSection>

      {/* Sección de la Imagen */}
      <ImageSection sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
        <BackgroundImage src={imageSrc} alt="Ilustración" style={imageStyle} />
      </ImageSection>
    </RootContainer>
  );
};

export default AuthLayout;