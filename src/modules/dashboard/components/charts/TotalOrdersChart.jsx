import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Stack,
  Typography,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import api from '../../../auth/services/api';

export default function TotalOrdersChart() {
  // Cambiamos el estado inicial a 'today' en lugar de 'month'
  const [timeFrame, setTimeFrame] = useState('today');
  const [chartData, setChartData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentInterval, setCurrentInterval] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalOrders, setTotalOrders] = useState(0);

  // const trendColor = {
  //   up: 'success',
  //   down: 'error',
  //   neutral: 'default',
  // };

  // const trendLabel = {
  //   up: '+14%',
  //   down: '-9%',
  //   neutral: '0%',
  // };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/dashboard/orders-number/${timeFrame}`);
        const data = response.data;

        // Procesa los datos según el intervalo
        if (timeFrame === 'today') {
          const chartValues = data.hourlyOrders.map((d) => d.count);
          const labels = data.hourlyOrders.map((d) =>
            `${d.hour.toString().padStart(2, '0')}:00`
          );
          setChartData(chartValues);
          setCategories(labels);
        } else {
          const chartValues = data.dailyOrders.map((d) => d.count);
          // Mejoramos el formato de las fechas para la visualización semanal
          const labels = data.dailyOrders.map((d) => {
            const date = new Date(d.date);
            if (timeFrame === 'week') {
              // Agregar día del mes para mejor claridad en vista semanal
              return date.toLocaleDateString('es-MX', { 
                weekday: 'short', 
                day: 'numeric' 
              });
            } else {
              return date.toLocaleDateString('es-MX', { 
                day: '2-digit', 
                month: 'short' 
              });
            }
          });
          setChartData(chartValues);
          setCategories(labels);
        }

        setTotalOrders(data.totalOrders);

        const labelMap = {
          today: 'Últimas 24 horas',
          week: 'Últimos 7 días',
          month: 'Últimos 30 días',
        };
        setCurrentInterval(labelMap[timeFrame]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeFrame]);

  const handleTimeFrameChange = (event) => {
    setTimeFrame(event.target.value);
  };

  return (
    <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography component="h2" variant="subtitle2" gutterBottom>
            Pedidos totales
          </Typography>
          <Select
            value={timeFrame}
            onChange={handleTimeFrameChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Selector de intervalo' }}
            sx={{ mb: 2, minWidth: 80, height: 30 }}
          >
            <MenuItem value="today">Día</MenuItem>
            <MenuItem value="week">Semana</MenuItem>
            <MenuItem value="month">Mes</MenuItem>
          </Select>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h4" component="p">
            {totalOrders}
          </Typography>
          {/* <Chip
            size="small"
            color={trendColor[trend] || 'default'}
            label={trendLabel[trend] || ''}
          /> */}
        </Stack>

        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {currentInterval}
        </Typography>

        {loading ? (
          <CircularProgress size={24} sx={{ mt: 2 }} />
        ) : (
          <LineChart
            xAxis={[{ 
              scaleType: 'band', 
              data: categories,
              // Ajustar la rotación de las etiquetas para mejor visualización
              tickLabelStyle: timeFrame === 'week' ? {
                angle: 0,
                textAnchor: 'start',
                fontSize: 10
              } : undefined
            }]}
            series={[{ id: 'trend', data: chartData, showMark: false, area: true }]}
            height={80}
            margin={{ 
              top: 5, 
              bottom: timeFrame === 'week' ? 20 : 5, 
              left: 5, 
              right: 5 
            }}
            slotProps={{ legend: { hidden: true } }}
            grid={{ horizontal: false, vertical: false }}
          />
        )}
      </CardContent>
    </Card>
  );
}