import { Button, Card, CardContent, Typography } from "@mui/material";

// Función para determinar si un color es claro
const isLightColor = (color) => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155;
};

const ColorCard = ({ title, description, color, onClick }) => (
  <Card sx={{ height: "100%" }}>
    <CardContent
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <div>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </div>
      <Button
        variant="contained"
        onClick={onClick}
        sx={{
          backgroundColor: color,
          color: isLightColor(color) ? 'black' : 'white',
          "&:hover": { backgroundColor: color },
          alignSelf: "flex-end",
        }}
      >
        Seleccionar Color
      </Button>
    </CardContent>
  </Card>
);

export default ColorCard;