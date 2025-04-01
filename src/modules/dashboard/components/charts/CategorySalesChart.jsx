import { useRef, useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton'; 
import api from '../../../auth/services/api';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function VentasPorCategoriaChart() {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await api.get('/dashboard/most-popular-categories');
        const { topCategories, othersCount } = response.data;

        const labels = topCategories.map(item => item.name);
        const dataValues = topCategories.map(item => item.count);

        if (othersCount > 0) {
          labels.push('Otros');
          dataValues.push(othersCount);
        }

        setChartData({
          labels,
          datasets: [{
            label: 'Ventas por categoría',
            data: dataValues,
            backgroundColor: [
              '#2196f3', '#4caf50', '#ff9800', '#9c27b0', '#607d8b', '#e91e63'
            ].slice(0, labels.length),
          }],
        });

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('No se pudieron cargar los datos de ventas');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Observador de tamaño (se mantiene igual)
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isSmall || isMedium ? 'bottom' : 'right',
        align: 'center',
        labels: {
          boxWidth: 20,
          padding: 16,
        },
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Ventas por Categoría
        </Typography>

        <Box
          ref={containerRef}
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: isSmall ? 'column' : 'row',
            position: 'relative',
            minHeight: 0,
          }}
        >
          {loading ? (
            <Skeleton 
              variant="rectangular" 
              width="100%" 
              height="100%"
              animation="wave"
            />
          ) : error ? (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              width: '100%', 
              height: '100%',
              color: theme.palette.error.main
            }}>
              <Typography variant="body2">{error}</Typography>
            </Box>
          ) : dimensions.width > 0 && dimensions.height > 0 && chartData ? (
            <Pie
              data={chartData}
              options={chartOptions}
              width={dimensions.width}
              height={dimensions.height}
            />
          ) : null}
        </Box>
      </CardContent>
    </Card>
  );
}