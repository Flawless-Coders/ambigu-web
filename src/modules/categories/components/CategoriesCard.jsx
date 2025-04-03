import { useState } from "react";
import { Card, CardMedia, CardContent, Typography, Box, Grid, Fab } from "@mui/material";
import { RemoveCircle, Edit, CheckCircle } from "@mui/icons-material";

const CategoriesCard = ({ category, onChangeStatus, onEdit }) => {
  const [hover, setHover] = useState(false);

  const imageUrl = category.imageBase64
    ? `data:image/png;base64,${category.imageBase64}`
    : "https://via.placeholder.com/250";

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            filter: "brightness(0.95)",
            transform: "translateY(-5px)",
            boxShadow: 6,
          },
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
              zIndex: 1
            }}
          >
            Deshabilitado
          </Box>
        )}

        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="150"
            image={imageUrl}
            alt={category.name}
            sx={{
              transition: "opacity 0.3s ease-in-out",
              opacity: !category.status ? 0.5 : 1,
            }}
          />

          {/* Botones de acción (solo en hover si está habilitado) */}
          {hover && category.status && (
            <Box
              sx={{
                position: "absolute",
                top: "60%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Fab 
                size="small" 
                sx={{
                  backgroundColor: "#673ab7", 
                  color: "white", 
                  "&:hover": { backgroundColor: "#651fff" }
                }} 
                aria-label="edit" 
                onClick={() => onEdit(category)}
              >
                <Edit />
              </Fab>

              <Fab 
                size="small" 
                color="error" 
                aria-label="disable" 
                onClick={() => onChangeStatus(category)}
              >
                <RemoveCircle />
              </Fab>
            </Box>
          )}
        </Box>

        <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h6">{category.name}</Typography>

          {/* Botón verde con check para habilitar si está deshabilitada */}
          {!category.status && (
            <Fab 
              size="small" 
              color="success" 
              aria-label="enable" 
              onClick={() => onChangeStatus(category)}
            >
              <CheckCircle />
            </Fab>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CategoriesCard;
