import { useState } from "react";
import { Popover, Grid2 } from "@mui/material";
import { SwatchesPicker, ChromePicker } from "react-color";
import ColorCard from "./ColorCard";
import LoaderAmbigu from "../../../kernel/LoaderAmbigu";

const ColorsSection = ({ draftColors, setDraftColor, loading }) => {
  const [popoverState, setPopoverState] = useState({
    anchorEl: null,
    colorType: "",
    currentColor: "#fff",
  });

  // Paleta de colores personalizada para fondos
  const backgroundColorsPalette = [
    ["#FFFFFF", "#F5F5F5", "#E0E0E0", "#CCCCCC", "#B3B3B3", "#999999", "#808080", "#666666"], // Blancos y grises claros
    ["#F0F8FF", "#E6F7FF", "#D1E9FF", "#B3D9FF"], // Azules claros
    ["#F0FFF0", "#E0FFE0", "#D1FFD1", "#B3FFB3"], // Verdes claros
    ["#FFF8E1", "#FFECB3", "#FFE0A1", "#FFD180"], // Amarillos claros
    ["#FFEBEE", "#FFCDD2", "#EF9A9A", "#E57373"], // Rojos claros
    ["#E8EAF6", "#C5CAE9", "#9FA8DA", "#7986CB"], // Azules oscuros
    ["#E0F7FA", "#B2EBF2", "#80DEEA", "#4DD0E1"], // Turquesas
    ["#F3E5F5", "#E1BEE7", "#CE93D8", "#BA68C8"], // Violetas
    ["#FFF3E0", "#FFE0B2", "#FFCC80", "#FFB74D"], // Naranjas claros
    ["#FBE9E7", "#FFCCBC", "#FFAB91", "#FF8A65"], // Naranjas oscuros
  ];

  const handleOpen = (event, type) => {
    setPopoverState({
      anchorEl: event.currentTarget,
      colorType: type,
      currentColor: draftColors[type] || "#fff",
    });
  };

  const handleClose = () => {
    setPopoverState({
      anchorEl: null,
      colorType: "",
      currentColor: "#fff",
    });
  };

  const handleColorChange = (color) => {
    // Usa rgba para mantener la opacidad
    const newColor = color.rgb;
    setPopoverState(prev => ({
      ...prev,
      currentColor: newColor,
    }));
    setDraftColor(popoverState.colorType, `rgba(${newColor.r}, ${newColor.g}, ${newColor.b}, ${newColor.a})`);
  };

  const handleColorChangeComplete = (color) => {
    const newColor = color.rgb;
    setDraftColor(popoverState.colorType, `rgba(${newColor.r}, ${newColor.g}, ${newColor.b}, ${newColor.a})`);
  };

  if (loading) return <LoaderAmbigu />;

  return (
    <Grid2 container spacing={2} sx={{ mt: 2, display: "flex", flexWrap: "wrap" }}>
      <Grid2 item xs={12} sm={6} md={4} sx={{ flexGrow: 1, minWidth: 280, maxWidth: "33.33%" }}>
        <ColorCard
          title="Color Primario"
          description="Para botones principales, encabezados y elementos destacados."
          color={draftColors.primaryColor}
          onClick={(e) => handleOpen(e, "primaryColor")}
        />
      </Grid2>

      <Grid2 item xs={12} sm={6} md={4} sx={{ flexGrow: 1, minWidth: 280, maxWidth: "33.33%" }}>
        <ColorCard
          title="Color Secundario"
          description="Usado en botones secundarios, enlaces y detalles visuales."
          color={draftColors.secondaryColor}
          onClick={(e) => handleOpen(e, "secondaryColor")}
        />
      </Grid2>

      <Grid2 item xs={12} sm={6} md={4} sx={{ flexGrow: 1, minWidth: 280, maxWidth: "33.33%" }}>
        <ColorCard
          title="Color de Fondo"
          description="Fondo general de la aplicación."
          color={draftColors.backgroundColor}
          onClick={(e) => handleOpen(e, "backgroundColor")}
        />
      </Grid2>

      <Popover
        open={Boolean(popoverState.anchorEl)}
        anchorEl={popoverState.anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        sx={{
          "& .MuiPaper-root": {
            overflow: "visible",
          },
        }}
        disableRestoreFocus
        disablePortal
      >
        <div onClick={(e) => e.stopPropagation()} >
        {popoverState.colorType === "backgroundColor" ? (
          <SwatchesPicker
            color={popoverState.currentColor}
            onChange={handleColorChange}
            onChangeComplete={handleColorChangeComplete}
            width={300}
            colors={backgroundColorsPalette} // Usar la paleta personalizada
          />
        ) : (
          <ChromePicker
            color={popoverState.currentColor}
            onChange={handleColorChange}
            onChangeComplete={handleColorChangeComplete}
            triangle="hide"
            width={300}
          />
        )}
        </div>
      </Popover>
    </Grid2>
  );
};

export default ColorsSection;