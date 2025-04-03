import {
  Card,
  CardContent,
  Stack,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import {
  SentimentSatisfiedAlt,
  SentimentDissatisfied,
  SentimentNeutral,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import api from '../../auth/services/api';

export default function EvaluationDayCard() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/dashboard/orders-percentage');
      const data = response.data;
      setData(data);
    } catch (error) {
      console.error('Error al obtener el rendimiento del día:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMotivationalMessage = () => {
    if (!data || data.percentage === undefined) return '';
    if (data.percentage > 0)
      return '¡Excelente trabajo! Tu venta subió un ' + data.percentage + '% respecto al día anterior.';
    if (data.percentage < 0)
      return 'No te desanimes, tu venta bajó un ' + Math.abs(data.percentage) + '%. ¡Mañana será mejor!';
    return 'Tu rendimiento se mantuvo igual que ayer. ¡Sigue esforzándote!';
  };

  const renderPerformanceIcon = (percentage) => {
    if (percentage > 0)
      return <SentimentSatisfiedAlt fontSize="large" color="success" />;
    if (percentage < 0)
      return <SentimentDissatisfied fontSize="large" color="error" />;
    return <SentimentNeutral fontSize="large" color="disabled" />;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
      {loading ? (
        <Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
          <CircularProgress />
        </Stack>
      ) : (
        <CardContent>
          <Typography component="h2" variant="subtitle2" gutterBottom>
            Rendimiento actual
          </Typography>

          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
            <Box flex={1}>
              <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                {getMotivationalMessage()}
              </Typography>
            </Box>
            {renderPerformanceIcon(data?.percentage)}
          </Stack>

          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {data?.percentage !== undefined
              ? `Cambio: ${data.percentage}%`
              : 'Sin datos disponibles'}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
}