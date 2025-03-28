import {
  Card,
  CardContent,
  Chip,
  Typography,
  Stack,
  Skeleton,
} from '@mui/material';
import {
  ArrowUpward,
  ArrowDownward,
} from '@mui/icons-material';
import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';
import api from '../../../auth/services/api';

function AreaGradient({ color, id }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

export default function OrdersChart() {
  const [loading, setLoading] = useState(true);
  const [ordersData, setOrdersData] = useState({
    total: 0,
    average: 0,
    previousAverage: 0,
    growth: 0,
    labels: [],
    dailyOrders: [],
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/dashboard/orders-chart');
      const data = response.data;
      setOrdersData(data);
    } catch (error) {
      console.error('Error al obtener los datos de pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const maxOrders = Math.max(...ordersData.dailyOrders);
  const maxDay = ordersData.labels[ordersData.dailyOrders.indexOf(maxOrders)];

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Promedio de pedidos diarios
        </Typography>

        {loading ? (
          <>
            <Skeleton variant="text" width={100} height={30} />
            <Skeleton variant="text" width={150} height={20} />
            <Skeleton variant="rectangular" height={250} sx={{ mt: 2 }} />
          </>
        ) : (
          <>
            <Stack sx={{ justifyContent: 'space-between', mb: 1 }}>
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="h4" component="p">
                  {ordersData.average.toLocaleString()}
                </Typography>
                <Stack direction="row" alignItems="center" gap={0.5}>
                  <Chip
                    size="small"
                    color={ordersData.growth >= 0 ? 'success' : 'error'}
                    label={`${ordersData.growth >= 0 ? '+' : ''}${ordersData.growth.toFixed(1)}%`}
                  />
                  {ordersData.growth >= 0 ? (
                    <ArrowUpward fontSize="small" color="success" />
                  ) : (
                    <ArrowDownward fontSize="small" color="error" />
                  )}
                </Stack>
              </Stack>

              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Últimos 30 días ({ordersData.labels[0]} – {ordersData.labels.at(-1)})
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cantidad de pedidos: {ordersData.total.toLocaleString()} pedidos
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pico: {maxOrders} pedidos el {maxDay}
              </Typography>
            </Stack>

            <LineChart
              colors={['#2196f3']}
              xAxis={[{
                scaleType: 'point',
                data: ordersData.labels,
                tickInterval: (index, i) => (i + 1) % 5 === 0,
              }]}
              series={[
                {
                  id: 'total',
                  label: 'Pedidos',
                  data: ordersData.dailyOrders,
                  area: true,
                  curve: 'linear',
                  showMark: false,
                },
              ]}
              height={250}
              margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
              grid={{ horizontal: true }}
              sx={{
                '& .MuiAreaElement-series-total': { fill: "url('#total')" },
              }}
              slotProps={{ legend: { hidden: true } }}
            >
              <AreaGradient color="#2196f3" id="total" />
            </LineChart>
          </>
        )}
      </CardContent>
    </Card>
  );
}