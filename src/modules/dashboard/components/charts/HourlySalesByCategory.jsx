import { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Skeleton,
  Chip,
} from '@mui/material';
import {
  ArrowUpward,
  ArrowDownward,
} from '@mui/icons-material';
import api from '../../../auth/services/api';
import { useTheme } from '@mui/material/styles';

export default function HourlySalesByCategory() {
  const theme = useTheme();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    // Corregir desfase de zona horaria
    const today = new Date();
    const offset = today.getTimezoneOffset();
    today.setMinutes(today.getMinutes() - offset);
    return today.toISOString().split('T')[0];
  });
  const [totalSales, setTotalSales] = useState(0);
  const [previousDaySales, setPreviousDaySales] = useState(0);
  const [growthPercentage, setGrowthPercentage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Obtener datos del día seleccionado
        const response = await api.get(`/dashboard/hourly-category?date=${selectedDate}`);
        const dailyTotal = Object.values(response.data.hourlyTotals).reduce((sum, val) => sum + val, 0);
        setTotalSales(dailyTotal);
        setData(response.data);
        
        // Calcular fecha anterior
        const prevDate = new Date(selectedDate);
        prevDate.setDate(prevDate.getDate() - 1);
        const prevDateStr = prevDate.toISOString().split('T')[0];
        
        // Obtener datos del día anterior para comparación
        const prevResponse = await api.get(`/dashboard/hourly-category?date=${prevDateStr}`);
        const prevDailyTotal = Object.values(prevResponse.data.hourlyTotals).reduce((sum, val) => sum + val, 0);
        setPreviousDaySales(prevDailyTotal);
        
        // Calcular porcentaje de crecimiento
        if (prevDailyTotal > 0) {
          const growth = ((dailyTotal - prevDailyTotal) / prevDailyTotal) * 100;
          setGrowthPercentage(growth);
        } else {
          setGrowthPercentage(dailyTotal > 0 ? 100 : 0);
        }
      } catch (err) {
        setError(err.message || 'Error al cargar datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedDate]);

  // Función para formatear la fecha sin desfase horario
  const formatDisplayDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const transformDataForChart = () => {
    if (!data || !data.hourlyData || !data.categories) {
      return { hours: [], series: [], allHours: [], hoursWithActivity: [] };
    }

    // Generamos todas las horas del día
    const allHours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
    
    // Encontramos las horas con actividad (ventas > 0)
    const hoursWithActivity = allHours.filter(hour => {
      const hourData = data.hourlyData[hour];
      if (!hourData) return false;
      return Object.values(hourData).some(value => value > 0);
    });

    // Si no hay actividad, mostramos todas las horas para evitar errores
    if (hoursWithActivity.length === 0) {
      return { hours: allHours, series: [], allHours, hoursWithActivity: [] };
    }

    // Encontramos la primera y última hora con actividad
    const hourIndices = hoursWithActivity.map(h => parseInt(h.split(':')[0]));
    const firstHourIndex = Math.max(0, Math.min(...hourIndices));
    const lastHourIndex = Math.min(23, Math.max(...hourIndices));

    // Creamos un rango de horas que incluya todas las horas con actividad
    // Si el rango es muy pequeño (menos de 8 horas), aseguramos que muestre al menos 8 horas o todas las disponibles
    const minDisplayHours = 8;
    let startHourIndex = firstHourIndex;
    let endHourIndex = lastHourIndex;
    
    if (endHourIndex - startHourIndex + 1 < minDisplayHours) {
      const midPoint = Math.floor((startHourIndex + endHourIndex) / 2);
      const halfRange = Math.ceil(minDisplayHours / 2);
      
      startHourIndex = Math.max(0, midPoint - halfRange);
      endHourIndex = Math.min(23, midPoint + halfRange);
      
      // Ajustamos si llegamos a los límites
      if (startHourIndex === 0) {
        endHourIndex = Math.min(23, startHourIndex + minDisplayHours - 1);
      }
      if (endHourIndex === 23) {
        startHourIndex = Math.max(0, endHourIndex - minDisplayHours + 1);
      }
    }

    // Creamos el rango final de horas a mostrar
    const hours = allHours.slice(startHourIndex, endHourIndex + 1);
    
    const activeCategories = Object.entries(data.categories)
      .filter(([id]) => hours.some(hour => (data.hourlyData[hour]?.[id] || 0) > 0))
      .map(([id, name]) => ({ id, name }));
    
    const series = activeCategories.map((category, index) => ({
      id: category.id,
      label: category.name,
      data: hours.map(hour => data.hourlyData[hour]?.[category.id] || 0),
      stack: 'total',
      color: [
        theme.palette.primary.main,
        theme.palette.secondary.main,
        theme.palette.error.main,
        theme.palette.warning.main,
        theme.palette.info.main
      ][index % 5]
    }));
    
    return {
      hours,
      series,
      allHours,
      hoursWithActivity
    };
  };

  const { hours, series, allHours, hoursWithActivity } = transformDataForChart();

  if (error) return <div>Error: {error}</div>;

  return (
    <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
      <CardContent>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 1,
          flexWrap: 'wrap',
          gap: 1
        }}>
          <Typography component="h2" variant="subtitle2" gutterBottom>
            Ventas por día
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                const dateStr = e.target.value;
                if (dateStr) {
                  setSelectedDate(dateStr);
                }
              }}
              style={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: '4px',
                padding: '6px 10px',
                backgroundColor: theme.palette.background.paper,
                minWidth: '150px'
              }}
            />
          </Box>
        </Box>

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
                  ${totalSales.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>
                <Stack direction="row" alignItems="center" gap={0.5}>
                  <Chip
                    size="small"
                    color={growthPercentage >= 0 ? 'success' : 'error'}
                    label={`${growthPercentage >= 0 ? '+' : ''}${growthPercentage.toFixed(1)}%`}
                  />
                  {growthPercentage >= 0 ? (
                    <ArrowUpward fontSize="small" color="success" />
                  ) : (
                    <ArrowDownward fontSize="small" color="error" />
                  )}
                </Stack>
              </Stack>

              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {formatDisplayDate(selectedDate)}
              </Typography>
            </Stack>

            <Box sx={{ overflowX: 'auto', overflowY: 'hidden' }}>
              {hours.length < 24 && hoursWithActivity.length > 0 && (
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Mostrando actividad de {hours[0]} a {hours[hours.length-1]}
                </Typography>
              )}
              <BarChart
                borderRadius={8}
                xAxis={[{
                  scaleType: 'band',
                  data: hours,
                  categoryGapRatio: 0.3,
                  tickLabelStyle: {
                    angle: 45,
                    textAnchor: 'start',
                    fontSize: 12,
                    fill: theme.palette.text.primary
                  }
                }]}
                series={series}
                height={250}
                margin={{ 
                  left: 50, 
                  right: 20, 
                  top: 20, 
                  bottom: 50
                }}
                grid={{ horizontal: true }}
                slotProps={{
                  legend: { 
                    hidden: true,
                  },
                  tooltip: {
                    content: ({ series, dataIndex }) => {
                      const hour = hours[dataIndex];
                      const activeSeries = series.filter(s => s.data[dataIndex] > 0);
                      const total = activeSeries.reduce((sum, s) => sum + s.data[dataIndex], 0);
                      
                      if (activeSeries.length === 0) {
                        return (
                          <Box sx={{ p: 1 }}>
                            <Typography variant="subtitle2">{hour}</Typography>
                            <Typography>No hubo ventas en esta hora</Typography>
                          </Box>
                        );
                      }

                      return (
                        <Box sx={{ p: 1, minWidth: 200 }}>
                          <Typography variant="subtitle2" gutterBottom>
                            {hour} - Total: ${total.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </Typography>
                          {activeSeries.map(s => (
                            <Box key={s.id} sx={{ 
                              display: 'flex', 
                              justifyContent: 'space-between',
                              mb: 0.5
                            }}>
                              <Typography variant="body2">{s.label}</Typography>
                              <Typography variant="body2" fontWeight="medium">
                                ${s.data[dataIndex].toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      );
                    }
                  }
                }}
              />
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
}