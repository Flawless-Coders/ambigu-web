import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import OrdersCard from '../components/OrdersCard.jsx';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import { useNavigate, useParams } from 'react-router-dom'; 
import axios from 'axios';
import LoaderAmbigu from '../../../kernel/LoaderAmbigu.jsx';

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

        <Grid item xs={12} sm={12} >
          <OrdersCard order={order} />
        </Grid>
      </Grid>
    </Box>
  );
}
