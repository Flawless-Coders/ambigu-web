import { useState } from "react";
import { Card, CardMedia, CardContent, Typography, IconButton, Box } from "@mui/material";
import { RemoveCircle, Edit, CheckCircle } from "@mui/icons-material";

const CategoriesCard = ({ category, onChangeStatus, onEdit }) => {
  const [hover, setHover] = useState(false);

  const imageUrl = category.imageBase64
    ? `data:image/png;base64,${category.imageBase64}`
    : "https://via.placeholder.com/250";

  return (
    <Card
      sx={{
        width: 250,
        position: "relative",
        opacity: category.status ? 1 : 0.5,
        transition: "opacity 0.3s ease-in-out",
        "&:hover": category.status ? { boxShadow: 5 } : {},
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Etiqueta de "Deshabilitado" si la categoría está deshabilitada */}
      {!category.status && (
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "red",
            color: "white",
            padding: "4px 8px",
            borderRadius: "10px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          Deshabilitado
        </Box>
      )}

      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={category.name}
          sx={{
            transition: "opacity 0.3s ease-in-out",
            opacity: !category.status || hover ? 0.5 : 1, // Opacidad al pasar el mouse
          }}
        />

        {/* Botones de acción (solo en hover si está habilitado) */}
        {hover && category.status && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              gap: 4,
            }}
          >
            {/* Botón rojo para deshabilitar */}
            <IconButton
              sx={{
                backgroundColor: "red",
                color: "white",
                "&:hover": { backgroundColor: "darkred" },
              }}
              onClick={() => onChangeStatus(category)}
            >
              <RemoveCircle />
            </IconButton>

            {/* Botón morado para editar */}
            <IconButton
              sx={{
                backgroundColor: "purple",
                color: "white",
                "&:hover": { backgroundColor: "#33032D" },
              }}
              onClick={() => onEdit(category)}
            >
              <Edit />
            </IconButton>
          </Box>
        )}
      </Box>

      <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h6">{category.name}</Typography>

        {/* Botón verde con check para habilitar si está deshabilitada */}
        {!category.status && (
          <IconButton
            sx={{
              backgroundColor: "green",
              color: "white",
              "&:hover": { backgroundColor: "darkgreen" },
            }}
            onClick={() => onChangeStatus(category)}
          >
            <CheckCircle />
          </IconButton>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoriesCard;
