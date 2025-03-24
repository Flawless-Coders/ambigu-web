import { useRef, useState } from "react";
import { Grid, Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import LoaderAmbigu from "../../../kernel/LoaderAmbigu";

const TypographySection = ({ draftFonts, setDraftFont, loading, fonts = [], fetchFonts, isLoading, loadFontInDOM }) => {
  const [isHeaderSelectOpen, setIsHeaderSelectOpen] = useState(false);
  const [isBodySelectOpen, setIsBodySelectOpen] = useState(false);
  const [isParagraphSelectOpen, setIsParagraphSelectOpen] = useState(false);
  const selectRef = useRef(null);

  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
      fetchFonts();
    }
  };

  const handleMenuItemHover = (font) => {
    loadFontInDOM(font);
  };

  if (loading || fonts.length === 0) {
    return <LoaderAmbigu />;
  }

  return (
    <Grid container spacing={3} sx={{ marginTop: 2 }}>
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
                value={draftFonts.headerFont}
                onChange={(e) => setDraftFont("headerFont", e.target.value)}
                onOpen={() => setIsHeaderSelectOpen(true)}
                onClose={() => setIsHeaderSelectOpen(false)}
                open={isHeaderSelectOpen}
                MenuProps={{
                  PaperProps: {
                    onScroll: handleScroll,
                    ref: selectRef,
                    style: { maxHeight: 300 },
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
                    onMouseEnter={() => handleMenuItemHover(font)}
                  >
                    {font}
                  </MenuItem>
                ))}
                {isLoading && <MenuItem disabled>Cargando más fuentes...</MenuItem>}
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>

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
                value={draftFonts.bodyFont}
                onChange={(e) => setDraftFont("bodyFont", e.target.value)}
                onOpen={() => setIsBodySelectOpen(true)}
                onClose={() => setIsBodySelectOpen(false)}
                open={isBodySelectOpen}
                MenuProps={{
                  PaperProps: {
                    onScroll: handleScroll,
                    ref: selectRef,
                    style: { maxHeight: 300 },
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
                    onMouseEnter={() => handleMenuItemHover(font)}
                  >
                    {font}
                  </MenuItem>
                ))}
                {isLoading && <MenuItem disabled>Cargando más fuentes...</MenuItem>}
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>

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
                value={draftFonts.paragraphFont}
                onChange={(e) => setDraftFont("paragraphFont", e.target.value)}
                onOpen={() => setIsParagraphSelectOpen(true)}
                onClose={() => setIsParagraphSelectOpen(false)}
                open={isParagraphSelectOpen}
                MenuProps={{
                  PaperProps: {
                    onScroll: handleScroll,
                    ref: selectRef,
                    style: { maxHeight: 300 },
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
                    onMouseEnter={() => handleMenuItemHover(font)}
                  >
                    {font}
                  </MenuItem>
                ))}
                {isLoading && <MenuItem disabled>Cargando más fuentes...</MenuItem>}
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TypographySection;
