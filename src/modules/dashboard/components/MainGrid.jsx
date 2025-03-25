import { Grid, Box, Stack, Typography } from '@mui/material';

import EvaluationDayCard from './EvaluationDayCard';
import CategoriasChart from './charts/CategoriesChart';
import TotalOrdersChart from './charts/TotalOrdersChart';
import CancellationsChart from './charts/CancellationsChart';
import OrdersChart from './charts/OrdersChart';
import PopularFoodsChart from './charts/PopularFoodsChart';
import CategorySalesChart from './charts/CategorySalesChart';
import CustomersChart from './charts/CustomersChart';
import BestWaitersChart from './charts/BestWaitersChart';

const data = [
  {
    title: 'Pedidos totales',
    value: '14k',
    interval: 'Últimos 30 días',
    trend: 'up',
    data: [
      200, 240, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
      360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    ],
  },
  {
    title: 'Cancelaciones',
    value: '325',
    interval: 'Últimos 30 días',
    trend: 'down',
    data: [
      1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820,
      780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300, 220,
    ],
  },
  {
    title: 'Clientes únicos',
    value: '200k',
    interval: 'Últimos 30 días',
    trend: 'neutral',
    data: [
      500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530,
      520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
    ],
  },
];

export default function MainGrid() {
  return (
    <Box sx={{ width: '100%', maxWidth: '1700px' }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Resumen general
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} lg={3}>
          <TotalOrdersChart />
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <BestWaitersChart />
        </Grid>
       <Grid item xs={12} sm={6} lg={3}>
          <EvaluationDayCard />
       </Grid>
        <Grid item xs={12} md={12} sm={12} lg={6}>
          <OrdersChart/>
        </Grid>
        <Grid item xs={12} md={12} sm={12} lg={6}>
          <CategoriasChart />
        </Grid>
      </Grid>

      <Typography component="h2" variant="h6" sx={{ my: 2 }}>
        Detalles
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} lg={6} md={6}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <PopularFoodsChart />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <CategorySalesChart />
        </Grid>
      </Grid>
    </Box>
  );
}
