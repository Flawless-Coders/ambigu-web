import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const CategoriesCard = ({ category }) => {
  // Verificar si la categoría tiene una imagen en Base64 y construir la URL
  const imageUrl = category.imageBase64 
    ? `data:image/png;base64,${category.imageBase64}`
    : "https://via.placeholder.com/250"; // Imagen de respaldo si no hay imagen

  return (
    <Card sx={{ width: 250 }}>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={category.name}
      />
      <CardContent>
        <Typography variant="h6" align="center">{category.name}</Typography>
      </CardContent>
    </Card>
  );
};

export default CategoriesCard;
