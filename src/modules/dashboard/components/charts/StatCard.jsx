import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Stack,
  Typography,
  Chip,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import api from '../../../auth/services/api';

export default function StatCard({ title, trend }) {
  const [timeFrame, setTimeFrame] = useState('month');
  const [chartData, setChartData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentInterval, setCurrentInterval] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalOrders, setTotalOrders] = useState(0);

  const trendColor = {
    up: 'success',
    down: 'error',
    neutral: 'default',
  };

  const trendLabel = {
    up: '+14%',
    down: '-9%',
    neutral: '0%',
  };

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
          const labels = data.dailyOrders.map((d) => {
            const date = new Date(d.date);
            return timeFrame === 'week'
              ? date.toLocaleDateString('es-MX', { weekday: 'short' })
              : date.toLocaleDateString('es-MX', { day: '2-digit', month: 'short' });
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
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography component="h2" variant="subtitle2" gutterBottom>
            {title}
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
          <Chip
            size="small"
            color={trendColor[trend] || 'default'}
            label={trendLabel[trend] || ''}
          />
        </Stack>

        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {currentInterval}
        </Typography>

        {loading ? (
          <CircularProgress size={24} sx={{ mt: 2 }} />
        ) : (
          <LineChart
            xAxis={[{ scaleType: 'band', data: categories }]}
            series={[{ id: 'trend', data: chartData, showMark: false, area: true }]}
            height={80}
            margin={{ top: 5, bottom: 5, left: 5, right: 5 }}
            slotProps={{ legend: { hidden: true } }}
            grid={{ horizontal: false, vertical: false }}
          />
        )}
      </CardContent>
    </Card>
  );
}