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
        <Card sx={{ width: 350, height: 445 }}>
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
              • Imagen en formato <strong>PNG</strong> o <strong>SVG</strong> con fondo transparente<br />
              • Ancho preferido: <strong>500px</strong><br />
              • Alto máximo: <strong>120px</strong><br />
              • Relación de aspecto recomendada: <strong>horizontal (ej. 5:1)</strong><br />
              • Se usará en el menú lateral y en el encabezado de la app móvil
            </Typography>
            <Button variant="contained" component="label" color="primary" sx={{ mt: 2 }}>
              SUBIR ARCHIVO
              <input type="file" hidden onChange={(e) => handleFileChange(e, 'logo')} />
            </Button>
          </CardContent>
        </Card>
      </Grid2>
      <Grid2 item xs={12} md={6}>
        <Card sx={{ width: 350, height: 445}}>
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
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              • Imagen en formato <strong>PNG</strong> o <strong>SVG</strong> con fondo transparente<br />
              • Tamaño preferido: <strong>100 × 100px</strong><br />
              • Relación de aspecto: <strong>cuadrada</strong><br />
              • No debe contener texto<br />
              • Se usará como ícono cuando el menú esté contraído
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