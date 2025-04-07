import { useState } from 'react';
import { Box, Typography, Tabs, Tab, Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'; // Importar componentes de Dialog
import { Image as ImageIcon, Palette as PaletteIcon, TextFields as TextFieldsIcon } from '@mui/icons-material';
import LogoImageSection from '../components/LogoImageSection';
import ColorsSection from '../components/ColorsSection';
import TypographySection from '../components/TypographySection';
import useColors from '../hooks/useColors';
import useTypography from '../hooks/useTypography';
import useLogos from '../hooks/useLogos';
import { useOutletContext } from 'react-router-dom';
import api from '../../auth/services/api';
import Backdrop from "@mui/material/Backdrop";

export const ThemesPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [hasSavedChanges, setHasSavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // Estado para el loader de "Guardar cambios"
  const [isApplying, setIsApplying] = useState(false); // Estado para el loader de "Aplicar cambios"
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false); // Estado para el diálogo de confirmación

  // Obtener setSuccess y setError desde el contexto del Outlet
  const { setSuccess, setError } = useOutletContext();

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
    setIsSaving(true); // Activar el loader de "Guardar cambios"
    try {
      if (tabValue === 0 && hasChangesLogos) {
        await saveLogos();
        setHasSavedChanges(true);
        setSuccess("Logos guardados correctamente");
      } else if (tabValue === 1 && hasChangesColors) {
        await saveColors();
        setHasSavedChanges(true);
        setSuccess("Colores guardados correctamente");
      } else if (tabValue === 2 && hasChangesFonts) {
        await saveFonts();
        setHasSavedChanges(true);
        setSuccess("Tipografía guardada correctamente");
      } else {
        setError("No hay cambios por guardar");
      }
    } catch (error) {
      console.error('Error al guardar:', error);
      setError('Ocurrió un error al guardar los cambios');
    } finally {
      setIsSaving(false); // Desactivar el loader de "Guardar cambios"
    }
  };

  const handleApply = async () => {
    setIsApplying(true); // Activar el loader de "Aplicar cambios"
    try {
      await api.post('theming/apply');
      setSuccess("Cambios aplicados. Las sesiones se cerrarán y se actualizará el sistema.");
      setTimeout(() => {
        window.location.reload();
      }, 3000); 
    } catch (error) {
      console.error('Error al aplicar:', error);
      setError('Error al aplicar los cambios');
      setIsApplying(false); // Desactivar el loader de "Aplicar cambios"
      setIsConfirmDialogOpen(false); // Cerrar el diálogo de confirmación
    }
  };

  const handleOpenConfirmDialog = () => {
    setIsConfirmDialogOpen(true); // Abrir el diálogo de confirmación
  };

  const handleCloseConfirmDialog = () => {
    if(isApplying) return; // No cerrar el diálogo si se está aplicando
    setIsConfirmDialogOpen(false); // Cerrar el diálogo de confirmación
  };

  const handleConfirmApply = async () => {
    await handleApply(); // Ejecutar la función para aplicar cambios
  };

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h1" gutterBottom>
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
          color="secondary"
          onClick={handleSave}
          disabled={
            (tabValue === 0 && !hasChangesLogos) ||
            (tabValue === 1 && !hasChangesColors) ||
            (tabValue === 2 && !hasChangesFonts) ||
            isSaving // Deshabilitar mientras se guarda
          }
        >
          {isSaving ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Guardar cambios"}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenConfirmDialog} // Abrir el diálogo de confirmación
          disabled={!hasSavedChanges || isApplying} // Deshabilitar mientras se aplica
        >
          {isApplying ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Aplicar cambios a todo el sistema"}
        </Button>
      </Box>

      {/* Diálogo de confirmación */}
      <Dialog
  open={isConfirmDialogOpen}
  onClose={isApplying ? () => {} : handleCloseConfirmDialog}
  disableEscapeKeyDown={isApplying}
  disableBackdropClick={isApplying}
  slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          sx: {
            backdropFilter: "blur(8px)", // Desenfoque del fondo
            backgroundColor: "rgba(0, 0, 0, 0.4)", // Color semitransparente
          },
        },
      }}
>
  {isApplying ? (
    <>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem' }}>
        Aplicando cambios...
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
          <CircularProgress size={60} />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Se redirigirá a la página de inicio de sesión.
          </Typography>
        </Box>
      </DialogContent>
    </>
  ) : (
    <>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem' }}>
        Confirmar aplicación de cambios
      </DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Box
            sx={{
              display: 'inline-block',
              animation: 'pulse 1.5s infinite',
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.2)' },
                '100%': { transform: 'scale(1)' },
              },
            }}
          >
            <Typography
              variant="h2"
              sx={{ color: 'red', fontWeight: 'bold' }}
            >
              !
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1" paragraph sx={{ textAlign: 'center' }}>
          ¿Estás seguro de que deseas aplicar los cambios?
        </Typography>
        <Typography variant="body2" paragraph sx={{ textAlign: 'center', color: 'text.secondary' }}>
          Esta acción cerrará todas las sesiones activas, tanto en la aplicación web como en la aplicación móvil.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button
          onClick={handleCloseConfirmDialog}
          sx={{ backgroundColor: 'grey', color: 'white', '&:hover': { backgroundColor: 'darkgrey' }, mr: 2 }}
          variant="outlined"
        >
          Cancelar
        </Button>
        <Button
          onClick={handleConfirmApply}
          sx={{ backgroundColor: 'red', color: 'white', '&:hover': { backgroundColor: 'darkred' } }}
          variant="contained"
        >
          Confirmar
        </Button>
      </DialogActions>
    </>
  )}
</Dialog>
    </Box>
  );
}

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