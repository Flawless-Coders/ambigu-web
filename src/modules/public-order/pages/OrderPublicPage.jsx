import { Box, Card, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import OrdersCard from '../components/OrdersCard.jsx';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import { useNavigate, useParams } from 'react-router-dom'; 
import axios from 'axios';
import LoaderAmbigu from '../../../kernel/LoaderAmbigu.jsx';
import HeaderPublic from '../../../kernel/HeaderPublic.jsx';

export default function OrderPublicPage() {
  const navigate = useNavigate();
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    console.log("num", orderNumber);
    axios.get(`${API_URL}/order/public/${orderNumber}`)
      .then(response => setOrder(response.data))
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, [orderNumber, navigate, API_URL]);

  if (loading) return <LoaderAmbigu />;
//   if (!order) return null;

  console.log("datos de orden: ", order);
  
  return (
    <>
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
            onClick={() => navigate(`/score-service/${order.orderNumber}`)} 
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
            maxWidth: { xs: 280, sm: 420, md: 400, lg: 450 },
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
    </>
  );
}
