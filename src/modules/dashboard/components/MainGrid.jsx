import { Grid, Box, Stack, Typography } from '@mui/material';

import EvaluationDayCard from './EvaluationDayCard';
import CategoriasChart from './charts/CategoriesChart';
import TotalOrdersChart from './charts/TotalOrdersChart';
import OrdersChart from './charts/OrdersChart';
import PopularFoodsChart from './charts/PopularFoodsChart';
import CategorySalesChart from './charts/CategorySalesChart';
import BestWaitersChart from './charts/BestWaitersChart';

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
