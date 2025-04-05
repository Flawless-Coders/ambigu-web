import { Box, Card, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import OrdersCard from '../components/OrdersCard.jsx';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import { useNavigate, useParams } from 'react-router-dom'; 
import axios from 'axios';
import LoaderAmbigu from '../../../kernel/LoaderAmbigu.jsx';
import HeaderPublic from '../../../kernel/HeaderPublic.jsx';
import { PublicThemeProvider } from '../../../context/PublicThemeContext.jsx';

export default function OrderPublicPage() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    console.log("num", token);
    axios.get(`${API_URL}/order/public/${token}`)
      .then(response => setOrder(response.data))
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, [token, navigate, API_URL]);

  if (loading) return <LoaderAmbigu />;
//   if (!order) return null;

  console.log("datos de orden: ", order);
  
  return (
    <>
    {!order && !loading ? (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <img src='../../../assets/error-404.png' alt="No hay orden activa" style={{ width: 150 }} />
    </Box>
  ) : (
    <PublicThemeProvider>
    <HeaderPublic section="Cuenta" />
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9} sm={6} lg={8} sx={{ display: 'flex', justifyContent:{xs: 'center', md:'flex-start', sm:'flex-start'} }}>
          <Typography variant="h5" component="h1">¡Agradecemos tu visita!</Typography>
        </Grid>

        <Grid item xs={12} md={3} sm={6} lg={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CreditScoreIcon sx={{marginRight:1, fontSize:'large'}} />

          <Typography 
            fontSize={15} 
            onClick={() => navigate(`/score-service/${order.token}`)} 
            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
            Calificar servicio
            </Typography>
        </Grid>

        <Grid item xs={12} sm={12} style={{marginBottom:60}}>
          <OrdersCard order={order} />
        </Grid>
        <Grid container >
          <Box
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            width: '100%',
            maxWidth: { xs: 280, sm: 380, md: 400, lg: 450 },
            zIndex: 900
          }}
        >
          <Card
            sx={{
              width: '100%', // ✅ ahora sí es seguro usarlo
              boxShadow: 6,
              p: 2
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {/* Mitad izquierda */}
              <Box sx={{ width: '50%' }}>
                <Typography fontSize={17} sx={{ fontWeight: 'bold' }}>
                  Total a pagar
                </Typography>
              </Box>

              {/* Mitad derecha */}
              <Box sx={{ width: '50%', display: 'flex', justifyContent: 'flex-end' }}>
                <Typography fontSize={17}>
                  ${order.total}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Box>


        </Grid>

      </Grid>
    </Box>
    </PublicThemeProvider>
    )}
    </>
    
  );
}
