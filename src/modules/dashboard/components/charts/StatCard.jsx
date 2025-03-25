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

export default function StatCard({ title, value, interval, trend }) {
  const [timeFrame, setTimeFrame] = useState('month');
  const [chartData, setChartData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentInterval, setCurrentInterval] = useState(interval);
  const [loading, setLoading] = useState(false);

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
    // Simulación de fetch desde backend
    const simulateFetch = () => {
      setLoading(true);
      setTimeout(() => {
        const now = new Date();
        let simulatedData = [];

        if (timeFrame === 'day') {
          // 24 puntos por hora
          simulatedData = Array.from({ length: 24 }, (_, i) => {
            const date = new Date(now);
            date.setHours(i, 0, 0, 0);
            return { fecha: date.toISOString(), pedidos: Math.floor(100 + Math.random() * 300) };
          });
        } else if (timeFrame === 'week') {
          simulatedData = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(now);
            date.setDate(now.getDate() - (6 - i));
            return { fecha: date.toISOString(), pedidos: Math.floor(200 + Math.random() * 500) };
          });
        } else {
          simulatedData = Array.from({ length: 30 }, (_, i) => {
            const date = new Date(now);
            date.setDate(now.getDate() - (29 - i));
            return { fecha: date.toISOString(), pedidos: Math.floor(300 + Math.random() * 600) };
          });
        }

        const chartValues = simulatedData.map(d => d.pedidos);
        const labels = simulatedData.map(d => {
          const date = new Date(d.fecha);
          switch (timeFrame) {
            case 'day':
              return date.getHours().toString().padStart(2, '0') + ':00';
            case 'week':
              return date.toLocaleDateString('es-MX', { weekday: 'short' });
            case 'month':
            default:
              return date.toLocaleDateString('es-MX', { day: '2-digit', month: 'short' });
          }
        });

        const labelMap = {
          day: 'Últimas 24 horas',
          week: 'Últimos 7 días',
          month: 'Últimos 30 días',
        };

        setChartData(chartValues);
        setCategories(labels);
        setCurrentInterval(labelMap[timeFrame]);
        setLoading(false);
      }, 700); // Simula tiempo de red
    };

    simulateFetch();
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
            <MenuItem value="day">Día</MenuItem>
            <MenuItem value="week">Semana</MenuItem>
            <MenuItem value="month">Mes</MenuItem>
          </Select>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h4" component="p">
            {value}
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