import { Card, CardContent, Typography, Avatar, Grid2, Button } from "@mui/material";
import { Person } from "@mui/icons-material";

const ProfileCard = ({user}) => {
  return (
    <Card sx={{ maxWidth: 1200, margin: "auto", padding: 3, boxShadow: 3 }}>
      <CardContent>
        <Grid2 container alignItems="center" spacing={2}>
          <Grid2 item>
            <Person color="secondary" />
          </Grid2>
          <Grid2 item>
            <Typography variant="subtitle1" color="secondary" fontWeight="bold">
              DATOS PERSONALES
            </Typography>
          </Grid2>
        </Grid2>

        <Grid2 container justifyContent="center" mt={2}>
          <Avatar
            src={user.avatarBase64 || "https://via.placeholder.com/150"}
            alt="Foto de perfil"
            sx={{ width: 150, height: 150 }}
          />
        </Grid2>

        {/* Datos personales */}
        <Grid2 container spacing={2} mt={6} textAlign="center" direction="column">
          <Grid2 item xs={12}>
            <Typography variant="body1">
              <strong>Nombre(s):</strong> {user.name} 
            </Typography>
          </Grid2>
          <Grid2 item xs={12}>
            <Typography variant="body1">
              <strong>Apellido paterno:</strong> {user.lastname_p} 
            </Typography>
          </Grid2>
          <Grid2 item xs={12}>
            <Typography variant="body1">
              <strong>Apellido materno:</strong> {user.lastname_m}
            </Typography>
          </Grid2>
          <Grid2 item xs={12}>
            <Typography variant="body1">
              <strong>Número telefónico:</strong> {user.phone}
            </Typography>
          </Grid2>
          <Grid2 item xs={12}>
            <Typography variant="body1">
              <strong>Correo electrónico:</strong> {user.email}
            </Typography>
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2} mt={6} mb={2} justifyContent="center">
          <Grid2 item>
            <Button variant="outlined" color="secondary">
              MODIFICAR CONTRASEÑA
            </Button>
          </Grid2>
          <Grid2 item>
            <Button variant="contained" color="secondary">
              MODIFICAR DATOS
            </Button>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;