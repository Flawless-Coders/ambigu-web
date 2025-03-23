import { useState } from "react";
import { SwatchesPicker, ChromePicker } from "react-color";
import { Grid2, Popover } from "@mui/material";
import ColorCard from "./ColorCard";
import useColors from "../hooks/useColors";
import LoaderAmbigu from "../../../kernel/LoaderAmbigu";

const ColorsSection = () => {
  const { colors, updateColor, loading } = useColors();
  const [popoverState, setPopoverState] = useState({
    anchorEl: null,
    colorType: "",
    currentColor: "#fff",
  });

  const handleOpen = (event, type) => {
    setPopoverState({
      anchorEl: event.currentTarget,
      colorType: type,
      currentColor: getCurrentColor(type),
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
    setPopoverState((prevState) => ({
      ...prevState,
      currentColor: color.hex,
    }));
  };

  const handleColorChangeComplete = (color) => {
    updateColor(popoverState.colorType, color.hex);
    handleClose();
  };

  if (loading) {
    return <LoaderAmbigu />;
  }

  const getCurrentColor = (type) => {
    switch (type) {
      case "primaryColor":
        return colors.primaryColor;
      case "secondaryColor":
        return colors.secondaryColor;
      case "backgroundColor":
        return colors.backgroundColor;
      default:
        return "#fff";
    }
  };

  return (
    <Grid2 container spacing={2} sx={{ marginTop: 2, display: "flex", flexWrap: "wrap" }}>
      <Grid2 item xs={12} sm={6} md={4} sx={{ flexGrow: 1, minWidth: 280, maxWidth: "33.33%" }}>
        <ColorCard
          title="Color Primario"
          description="Para botones principales, encabezados y elementos destacados."
          color={colors.primaryColor}
          onClick={(e) => handleOpen(e, "primaryColor")}
        />
      </Grid2>
      <Grid2 item xs={12} sm={6} md={4} sx={{ flexGrow: 1, minWidth: 280, maxWidth: "33.33%" }}>
        <ColorCard
          title="Color Secundario"
          description="Usado en botones secundarios, enlaces y detalles visuales."
          color={colors.secondaryColor}
          onClick={(e) => handleOpen(e, "secondaryColor")}
        />
      </Grid2>
      <Grid2 item xs={12} sm={6} md={4} sx={{ flexGrow: 1, minWidth: 280, maxWidth: "33.33%" }}>
        <ColorCard
          title="Color de Fondo"
          description="Fondo general de la aplicación."
          color={colors.backgroundColor}
          onClick={(e) => handleOpen(e, "backgroundColor")}
        />
      </Grid2>
      <Popover
        open={Boolean(popoverState.anchorEl)}
        anchorEl={popoverState.anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          "& .MuiPaper-root": {
            overflow: "visible",
          },
        }}
      >
        {popoverState.colorType === "backgroundColor" ? (
          <SwatchesPicker
            color={popoverState.currentColor}
            onChange={handleColorChange}
            onChangeComplete={handleColorChangeComplete}
            width={300}
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
      </Popover>
    </Grid2>
  );
};

export default ColorsSection;