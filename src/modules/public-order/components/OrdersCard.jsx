import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

export default function OrdersCard({ order }) {
    if (!order) return null;
  
    const { dishes } = order;
  
    return (
      <Grid container spacing={3}>
        {dishes.map((dish, index) => (
          <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
            <Card sx={{ maxWidth: 380, width: '100%' }}>
              <Grid 
                container 
                sx={{ 
                  flexDirection: { xs: 'row', sm: 'column' }, 
                  alignItems: { xs: 'flex-start', sm: 'center' }
                }}
              >
                {/* Imagen */}
                <Grid item xs={3} sm={12} sx={{ display: 'flex', width: '100%' }}>
                  <CardMedia
                    sx={{
                      width: '100%', 
                      height: { xs: 100, sm: 150 }, 
                      objectFit: 'cover'
                    }}
                    image={dish.imageBase64 != null ? dish.imageBase64 : "https://placehold.co/250x200.png"} 
                    title={dish.dishName}
                  />
                </Grid>
  
                {/* Info */}
                <Grid 
                  item xs={9} sm={12} 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'row', sm: 'row' }, 
                    width: '100%', 
                    justifyContent: 'space-between', 
                    p: 1, 
                    paddingX: { sm: 3 }, 
                    alignSelf: { xs: 'center' }
                  }}
                >
                  {/* Nombre y cantidad */}
                  <Grid item sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography fontSize={15} sx={{ mb: 1 }}>
                      {dish.dishName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Cantidad: {dish.quantity}
                    </Typography>
                  </Grid>
  
                  {/* Precio */}
                  <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography fontSize={17} sx={{ fontWeight: 'bold' }}>
                      ${dish.unitPrice}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
  