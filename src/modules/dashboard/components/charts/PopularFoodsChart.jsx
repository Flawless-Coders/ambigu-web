import { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import {
  Typography,
  Card,
  CardContent,
  Box,
  Stack,
  Skeleton,
} from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import api from '../../../auth/services/api';

export default function PopularFoodsChart() {
  const [data, setData] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const COLORS = [
    '#FF6B6B',
    '#FFA94D',
    '#FFD43B',
    '#69DB7C',
    '#4DABF7',
    '#A0D8D0',
  ];

  useEffect(() => {
    setLoading(true);
    api.get('/dashboard/most-popular-foods')
    .then((res) => {
      const { topFoods, othersCount } = res.data;
      const finalFoods = [...topFoods];

      if(othersCount > 0){
        finalFoods.push({name: 'Otros', count: othersCount});
      }

      const total = finalFoods.reduce((sum, item) => sum + item.count, 0); 

      const chartData = finalFoods.map((item, index) => ({
        label: item.name,
        value: item.count,
      }));

      const dishesData = finalFoods.map((item, index) => ({
        name: item.name,
        value: Math.round((item.count / total) * 100),
        color: COLORS[index % COLORS.length]
      }));
      setData(chartData);
      setDishes(dishesData);
      setLoading(false);
    })
    .catch(err => {
      console.error('Error al cargar datos de comidas populares:', err);
      setError(err.message || 'Error al cargar datos');
      setLoading(false);
    });
  }, []);

  return (
    <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          Comidas más pedidas
        </Typography>
        
        {loading ? (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 260 }}>
              <Skeleton variant="circular" width={200} height={200} />
            </Box>
            {[1, 2, 3, 4, 5].map((item) => (
              <Stack key={item} direction="row" sx={{ alignItems: 'center', gap: 2, pb: 2 }}>
                <Skeleton variant="circular" width={12} height={12} />
                <Stack sx={{ gap: 1, flexGrow: 1 }}>
                  <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Skeleton variant="text" width={100} height={20} />
                    <Skeleton variant="text" width={30} height={20} />
                  </Stack>
                  <Skeleton variant="rectangular" height={10} />
                </Stack>
              </Stack>
            ))}
          </>
        ) : error ? (
          <Typography color="error" sx={{ mt: 2 }}>
            Error: {error}
          </Typography>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PieChart
                colors={COLORS}
                margin={{ left: 80, right: 80, top: 80, bottom: 80 }}
                series={[{ data, innerRadius: 75, outerRadius: 100, paddingAngle: 0 }]}
                height={260}
                width={260}
                slotProps={{ legend: { hidden: true } }}
              />
            </Box>
            {dishes.map((item, index) => (
              <Stack key={index} direction="row" sx={{ alignItems: 'center', gap: 2, pb: 2 }}>
                <Box sx={{ width: 12, height: 12, bgcolor: item.color, borderRadius: '50%' }} />
                <Stack sx={{ gap: 1, flexGrow: 1 }}>
                  <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ fontWeight: '500' }}>{item.name}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>{item.value}%</Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={item.value}
                    sx={{
                      [`& .${linearProgressClasses.bar}`]: {
                        backgroundColor: item.color,
                      },
                    }}
                  />
                </Stack>
              </Stack>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
}