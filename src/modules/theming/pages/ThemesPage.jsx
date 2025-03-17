import { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { Image as ImageIcon, Palette as PaletteIcon, TextFields as TextFieldsIcon } from '@mui/icons-material';
import LogoImageSection from '../components/LogoImageSection';
import ColorsSection from '../components/ColorsSection';
import TypographySection from '../components/TypographySection';

export const ThemesPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [primaryColor, setPrimaryColor] = useState('Azul');
  const [secondaryColor, setSecondaryColor] = useState('Cyan');
  const [backgroundColor, setBackgroundColor] = useState('Blanco');
  const [headerFont, setHeaderFont] = useState('Sans Serif');
  const [bodyFont, setBodyFont] = useState('Sans Serif');
  const [paragraphFont, setParagraphFont] = useState('Sans Serif');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

return (
    <Box sx={{ p: 1 }}>
        <Typography variant="h4" gutterBottom>
            Personalización
        </Typography>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
            <Tab label="LOGO/IMAGEN" icon={<ImageIcon />} />
            <Tab label="COLORES" icon={<PaletteIcon />} />
            <Tab label="TIPOGRAFÍA" icon={<TextFieldsIcon />} />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
            <LogoImageSection />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
            <ColorsSection
                primaryColor={primaryColor}
                setPrimaryColor={setPrimaryColor}
                secondaryColor={secondaryColor}
                setSecondaryColor={setSecondaryColor}
                backgroundColor={backgroundColor}
                setBackgroundColor={setBackgroundColor}
            />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
            <TypographySection
                headerFont={headerFont}
                setHeaderFont={setHeaderFont}
                bodyFont={bodyFont}
                setBodyFont={setBodyFont}
                paragraphFont={paragraphFont}
                setParagraphFont={setParagraphFont}
            />
        </TabPanel>
    </Box>
);
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}