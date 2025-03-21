import React, { useRef, useState } from "react";
import { Grid, Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import useGoogleFonts from "../hooks/useGoogleFonts";

const TypographySection = () => {
  const { fonts, selectedFonts, updateFont, fetchFonts, isLoading, loadFontInDOM } = useGoogleFonts();

  // Estados independientes para cada Select
  const [isHeaderSelectOpen, setIsHeaderSelectOpen] = useState(false);
  const [isBodySelectOpen, setIsBodySelectOpen] = useState(false);
  const [isParagraphSelectOpen, setIsParagraphSelectOpen] = useState(false);

  const selectRef = useRef(null); // Referencia al contenedor del Select

  // Manejar el scroll en la lista
  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

    // Verificar si el usuario llegó al final de la lista
    if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
      fetchFonts(); // Cargar más fuentes
    }
  };

  // Cargar la fuente cuando se muestra en el menú
  const handleMenuItemHover = (font) => {
    loadFontInDOM(font);
  };

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
                onOpen={() => setIsHeaderSelectOpen(true)}
                onClose={() => setIsHeaderSelectOpen(false)}
                open={isHeaderSelectOpen}
                MenuProps={{
                  PaperProps: {
                    onScroll: handleScroll, // Escuchar el evento de scroll
                    ref: selectRef, // Referencia al contenedor del Select
                    style: { maxHeight: 300 }, // Altura máxima del menú
                  },
                }}
                renderValue={(selected) => (
                  <span style={{ fontFamily: selected }}>{selected}</span>
                )}
              >
                {fonts.map((font) => (
                  <MenuItem
                    key={font}
                    value={font}
                    sx={{ fontFamily: font }}
                    onMouseEnter={() => handleMenuItemHover(font)} // Cargar la fuente al hacer hover
                  >
                    {font}
                  </MenuItem>
                ))}
                {isLoading && (
                  <MenuItem disabled>
                    Cargando más fuentes...
                  </MenuItem>
                )}
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
                onOpen={() => setIsBodySelectOpen(true)}
                onClose={() => setIsBodySelectOpen(false)}
                open={isBodySelectOpen}
                MenuProps={{
                  PaperProps: {
                    onScroll: handleScroll, // Escuchar el evento de scroll
                    ref: selectRef, // Referencia al contenedor del Select
                    style: { maxHeight: 300 }, // Altura máxima del menú
                  },
                }}
                renderValue={(selected) => (
                  <span style={{ fontFamily: selected }}>{selected}</span>
                )}
              >
                {fonts.map((font) => (
                  <MenuItem
                    key={font}
                    value={font}
                    sx={{ fontFamily: font }}
                    onMouseEnter={() => handleMenuItemHover(font)} // Cargar la fuente al hacer hover
                  >
                    {font}
                  </MenuItem>
                ))}
                {isLoading && (
                  <MenuItem disabled>
                    Cargando más fuentes...
                  </MenuItem>
                )}
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
                onOpen={() => setIsParagraphSelectOpen(true)}
                onClose={() => setIsParagraphSelectOpen(false)}
                open={isParagraphSelectOpen}
                MenuProps={{
                  PaperProps: {
                    onScroll: handleScroll, // Escuchar el evento de scroll
                    ref: selectRef, // Referencia al contenedor del Select
                    style: { maxHeight: 300 }, // Altura máxima del menú
                  },
                }}
                renderValue={(selected) => (
                  <span style={{ fontFamily: selected }}>{selected}</span>
                )}
              >
                {fonts.map((font) => (
                  <MenuItem
                    key={font}
                    value={font}
                    sx={{ fontFamily: font }}
                    onMouseEnter={() => handleMenuItemHover(font)} // Cargar la fuente al hacer hover
                  >
                    {font}
                  </MenuItem>
                ))}
                {isLoading && (
                  <MenuItem disabled>
                    Cargando más fuentes...
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TypographySection;