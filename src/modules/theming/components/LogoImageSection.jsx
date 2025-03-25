import { Image } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Typography, Grid2 } from '@mui/material';
import LoaderAmbigu from '../../../kernel/LoaderAmbigu';

const LogoImageSection = ({ logos, logoDraft, setLogoDraft, loading }) => {
  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      setLogoDraft(type, file);
    }
  };

  if (loading) {
    return <LoaderAmbigu />;
  }

  return (
    <Grid2 container spacing={3} sx={{ mt: 3 }}>
      <Grid2 item xs={12} md={6}>
        <Card sx={{ width: 350 }}>
          <CardContent>
            <Box sx={{ height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }}>
              {logoDraft.previewLogo ? (
                <img src={logoDraft.previewLogo} alt="Logo con nombre" style={{ maxHeight: '100%', maxWidth: '100%' }} />
              ) : logos.logo ? (
                <img src={logos.logo} alt="Logo con nombre" style={{ maxHeight: '100%', maxWidth: '100%' }} />
              ) : (
                <Image sx={{ fontSize: 50, color: '#9e9e9e' }} />
              )}
            </Box>
            <Typography variant="h6">Logo con nombre</Typography>
            <Typography variant="body2" color="textSecondary">
              • Imagen en formato png o svg con fondo transparente<br />
              • Ancho preferible de 500px
            </Typography>
            <Button variant="contained" component="label" color="primary" sx={{ mt: 2 }}>
              SUBIR ARCHIVOS
              <input type="file" hidden onChange={(e) => handleFileChange(e, 'logo')} />
            </Button>
          </CardContent>
        </Card>
      </Grid2>
      <Grid2 item xs={12} md={6}>
        <Card sx={{ width: 350 }}>
          <CardContent>
            <Box sx={{ height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }}>
              {logoDraft.previewLogoSmall ? (
                <img src={logoDraft.previewLogoSmall} alt="Logo chico sin texto" style={{ maxHeight: '100%', maxWidth: '100%' }} />
              ) : logos.logoSmall ? (
                <img src={logos.logoSmall} alt="Logo chico sin texto" style={{ maxHeight: '100%', maxWidth: '100%' }} />
              ) : (
                <Image sx={{ fontSize: 50, color: '#9e9e9e' }} />
              )}
            </Box>
            <Typography variant="h6">Logo chico sin texto (Icono)</Typography>
            <Typography variant="body2" color="textSecondary">
              • Imagen en formato png o svg con fondo transparente<br />
              • Ancho preferible de 100px
            </Typography>
            <Button variant="contained" component="label" color="primary" sx={{ mt: 2 }}>
              SUBIR ARCHIVO
              <input type="file" hidden onChange={(e) => handleFileChange(e, 'logoSmall')} />
            </Button>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
};

export default LogoImageSection;