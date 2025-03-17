import { Grid, Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import useGoogleFonts from "../hooks/useGoogleFonts";

const TypographySection = () => {
  const { fonts, selectedFonts, updateFont } = useGoogleFonts();

  return (
    <Grid container spacing={3} sx={{ marginTop: 2 }}>
      {/* Selector para Encabezados */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Encabezados</Typography>
            <Typography variant="body2" color="textSecondary">
              Utilizado en títulos.
            </Typography>
            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <InputLabel id="headers-select">Seleccionar tipografía</InputLabel>
              <Select
                labelId="headers-select"
                value={selectedFonts.headerFont}
                onChange={(e) => updateFont("headerFont", e.target.value)}
              >
                {fonts.map((font) => (
                  <MenuItem key={font} value={font}>
                    {font}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>

      {/* Selector para Texto Principal */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Texto Principal</Typography>
            <Typography variant="body2" color="textSecondary">
              Usado en textos destacados y menús principales.
            </Typography>
            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <InputLabel>Seleccionar tipografía</InputLabel>
              <Select
                value={selectedFonts.bodyFont}
                onChange={(e) => updateFont("bodyFont", e.target.value)}
              >
                {fonts.map((font) => (
                  <MenuItem key={font} value={font}>
                    {font}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>

      {/* Selector para Texto de Párrafo */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Texto de párrafo</Typography>
            <Typography variant="body2" color="textSecondary">
              Utilizado en párrafos y textos descriptivos.
            </Typography>
            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <InputLabel>Seleccionar tipografía</InputLabel>
              <Select
                value={selectedFonts.paragraphFont}
                onChange={(e) => updateFont("paragraphFont", e.target.value)}
              >
                {fonts.map((font) => (
                  <MenuItem key={font} value={font}>
                    {font}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TypographySection;