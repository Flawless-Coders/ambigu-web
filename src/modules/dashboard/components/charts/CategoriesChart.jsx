import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import api from '../../../auth/services/api';
import { format, parseISO, eachDayOfInterval, eachMonthOfInterval, subDays, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';

export default function CategoriesChart() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [range, setRange] = useState('last6months');
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/dashboard/orders-by-category/${range}`);
        setData(response.data);
        
        // Calcular total de ventas
        const salesData = Object.values(response.data.data).flatMap(period => Object.values(period));
        const currentTotal = salesData.reduce((sum, value) => sum + value, 0);
        setTotalSales(currentTotal);
        
      } catch (err) {
        setError(err.message || 'Error al cargar datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [range]);

  const handleRangeChange = (event) => {
    setRange(event.target.value);
  };

  // Función para formatear fechas según el rango
  const formatDateLabel = (dateString, currentRange) => {
    const date = parseISO(dateString);
    switch(currentRange) {
      case 'last7days':
      case 'last30days':
        return format(date, 'EEE dd', { locale: es }); // Ej: "Lun 21"
      case 'lastmonth':
        return format(date, 'EEE dd', { locale: es }); // Ej: "Lun 21"
      case 'last6months':
        return format(date, 'MMM yyyy', { locale: es }); // Ej: "Mar 2023"
      default:
        return dateString;
    }
  };

  // Generar todas las etiquetas posibles para el rango seleccionado
  const generateAllLabels = () => {
    const now = new Date();
    switch(range) {
      case 'last7days':
        return eachDayOfInterval({
          start: subDays(now, 6),
          end: now
        }).map(date => format(date, 'yyyy-MM-dd'));
      case 'last30days':
      case 'lastmonth':
        return eachDayOfInterval({
          start: subDays(now, range === 'last30days' ? 29 : 30),
          end: now
        }).map(date => format(date, 'yyyy-MM-dd'));
      case 'last6months':
        return eachMonthOfInterval({
          start: subMonths(now, 5),
          end: now
        }).map(date => format(date, 'yyyy-MM'));
      default:
        return [];
    }
  };

  // Transformar datos para el gráfico
  const transformDataForChart = () => {
    if (!data) return { labels: [], series: [] };
    
    const allLabels = generateAllLabels();
    const categories = data.categories;
    
    // Usar las primeras 3 categorías para el gráfico apilado
    const mainCategories = categories.slice(0, 3);
    
    const series = mainCategories.map((category, index) => ({
      id: category.toLowerCase().replace(/\s+/g, '-'),
      label: category,
      data: allLabels.map(label => {
        // Buscar el dato correspondiente en la respuesta del API
        const periodData = data.data[label] || {};
        return periodData[category] || 0;
      }),
      stack: 'A',
      color: ['#1565c0', '#42a5f5', '#90caf9'][index]
    }));
    
    return {
      labels: allLabels.map(label => formatDateLabel(label, range)),
      series
    };
  };

  const { labels, series } = transformDataForChart();

  const rangeToText = {
    'last7days': 'Últimos 7 días',
    'last30days': 'Últimos 30 días',
    'lastmonth': 'Mes anterior',
    'last6months': 'Últimos 6 meses'
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography component="h2" variant="subtitle2" gutterBottom>
            Ventas por categoría
          </Typography>
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="range-select-label">Rango</InputLabel>
            <Select
              labelId="range-select-label"
              value={range}
              label="Rango"
              onChange={handleRangeChange}
            >
              <MenuItem value="last7days">Últimos 7 días</MenuItem>
              <MenuItem value="last30days">Últimos 30 días</MenuItem>
              <MenuItem value="lastmonth">Mes anterior</MenuItem>
              <MenuItem value="last6months">Últimos 6 meses</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {loading ? (
          <>
            <Skeleton variant="text" width="40%" height={40} />
            <Skeleton variant="rectangular" height={250} sx={{ mt: 2 }} />
          </>
        ) : (
          <>
            <Stack sx={{ justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h4" component="p">
                ${totalSales.toLocaleString()}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {rangeToText[range]}
              </Typography>
            </Stack>

            <BarChart
              borderRadius={8}
              xAxis={[{
                scaleType: 'band',
                data: labels,
                categoryGapRatio: range === 'last6months' ? 0.5 : 0.2,
              }]}
              series={series}
              height={300}
              margin={{ 
                left: 70, 
                right: 20, 
                top: 20, 
                bottom: range === 'last6months' ? 20 : 50 // Más espacio para etiquetas de días
              }}
              grid={{ horizontal: true }}
              slotProps={{ 
                legend: { hidden: true },
                xAxis: {
                  tickLabelStyle: {
                    angle: range === 'last6months' ? 0 : 45,
                    textAnchor: 'start',
                    fontSize: 12,
                  },
                },
              }}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}