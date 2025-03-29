import { Grid, Box, Stack, Typography } from '@mui/material';

import EvaluationDayCard from './EvaluationDayCard';
import TotalOrdersChart from './charts/TotalOrdersChart';
import OrdersChart from './charts/OrdersChart';
import PopularFoodsChart from './charts/PopularFoodsChart';
import CategorySalesChart from './charts/CategorySalesChart';
import BestWaitersChart from './charts/BestWaitersChart';
import HourlySalesByCategory from './charts/HourlySalesByCategory';

export default function MainGrid() {
  return (
    <Box sx={{ width: '100%', maxWidth: '1700px' }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Resumen general
      </Typography>
      <Grid container spacing={2}>
         {/* BestWaitersChart - se moverá arriba en sm/md */}
        <Grid item xs={12} sm={12} md={12} lg={6} order={{ xs: 1, sm: 1, md: 1, lg: 2 }}>
          <BestWaitersChart />
        </Grid>
        
        {/* TotalOrdersChart - se moverá a la izquierda abajo en sm/md */}
        <Grid item xs={12} sm={6} md={6} lg={3} order={{ xs: 2, sm: 2, md: 2, lg: 1 }}>
          <TotalOrdersChart />
        </Grid>
        
        {/* EvaluationDayCard - se moverá a la derecha abajo en sm/md */}
        <Grid item xs={12} sm={6} md={6} lg={3} order={{ xs: 3, sm: 3, md: 3, lg: 3 }}>
          <EvaluationDayCard />
        </Grid>
         <Grid item xs={12} md={12} sm={12} lg={6} order={{ xs: 4, sm: 4, md: 4, lg: 4 }}>
          <OrdersChart/>
        </Grid>
        <Grid item xs={12} md={12} sm={12} lg={6} order={{ xs: 5, sm: 5, md: 5, lg: 5 }}>
          <HourlySalesByCategory />
        </Grid>
      </Grid>

      <Typography component="h2" variant="h6" sx={{ my: 2 }}>
        Detalles del último mes
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
