import { useState } from 'react';
import { Box, Typography, Tabs, Tab, Button } from '@mui/material';
import { Image as ImageIcon, Palette as PaletteIcon, TextFields as TextFieldsIcon } from '@mui/icons-material';
import LogoImageSection from '../components/LogoImageSection';
import ColorsSection from '../components/ColorsSection';
import TypographySection from '../components/TypographySection';
import useColors from '../hooks/useColors';
import useTypography from '../hooks/useTypography';
import useLogos from '../hooks/useLogos';
import axios from 'axios';
import api from '../../auth/services/api';

export const ThemesPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [hasSavedChanges, setHasSavedChanges] = useState(false); // Estado global para cambios guardados

  const { draftColors, setDraftColor, saveChanges: saveColors, hasChanges: hasChangesColors, loading: loadingColors } = useColors();
  const {
    draftFonts,
    setDraftFont,
    saveChanges: saveFonts,
    hasChanges: hasChangesFonts,
    loading: loadingFonts,
    fonts,
    fetchFonts,
    isLoading,
    loadFontInDOM,
  } = useTypography();
  const { logos, logoDraft, setLogoDraft, saveChanges: saveLogos, hasChanges: hasChangesLogos, loading: loadingLogos } = useLogos();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSave = async () => {
    try {
      if (tabValue === 0 && hasChangesLogos) {
        await saveLogos();
        setHasSavedChanges(true); // Indicar que hay cambios guardados
        alert("Logos guardados correctamente");
      } else if (tabValue === 1 && hasChangesColors) {
        await saveColors();
        setHasSavedChanges(true); // Indicar que hay cambios guardados
        alert("Colores guardados correctamente");
      } else if (tabValue === 2 && hasChangesFonts) {
        await saveFonts();
        setHasSavedChanges(true); // Indicar que hay cambios guardados
        alert("Tipografía guardada correctamente");
      } else {
        alert("No hay cambios por guardar");
      }
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Ocurrió un error al guardar los cambios');
    }
  };

  const handleApply = async () => {
    try {
      await api.post('/theming/apply');
      alert("Cambios aplicados. Las sesiones se cerrarán y se actualizará el sistema.");
      window.location.reload();
    } catch (error) {
      console.error('Error al aplicar:', error);
      alert('Error al aplicar los cambios');
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h4" gutterBottom>
        Personalización
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="tabs">
        <Tab label={`LOGO/IMAGEN${hasChangesLogos ? ' *' : ''}`} icon={<ImageIcon />} />
        <Tab label={`COLORES${hasChangesColors ? ' *' : ''}`} icon={<PaletteIcon />} />
        <Tab label={`TIPOGRAFÍA${hasChangesFonts ? ' *' : ''}`} icon={<TextFieldsIcon />} />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <LogoImageSection
          logos={logos}
          logoDraft={logoDraft}
          setLogoDraft={setLogoDraft}
          loading={loadingLogos}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <ColorsSection
          draftColors={draftColors}
          setDraftColor={setDraftColor}
          loading={loadingColors}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <TypographySection
          draftFonts={draftFonts}
          setDraftFont={setDraftFont}
          loading={loadingFonts}
          fonts={fonts}
          fetchFonts={fetchFonts}
          isLoading={isLoading}
          loadFontInDOM={loadFontInDOM}
        />
      </TabPanel>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'end', gap: 2, mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={
            (tabValue === 0 && !hasChangesLogos) ||
            (tabValue === 1 && !hasChangesColors) ||
            (tabValue === 2 && !hasChangesFonts)
          }
        >
          Guardar cambios
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={handleApply}
          disabled={!hasSavedChanges} // Deshabilitar si no hay cambios guardados
        >
          Aplicar cambios a todo el sistema
        </Button>
      </Box>
    </Box>
  );
};

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};
