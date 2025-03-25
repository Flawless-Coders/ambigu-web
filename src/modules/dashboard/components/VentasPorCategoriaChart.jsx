import React, { useRef, useState, useEffect } from 'react';
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

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const data = {
  labels: ['Comida', 'Bebida', 'Postres', 'Snacks', 'Otros'],
  datasets: [
    {
      label: 'Ventas por categoría',
      data: [300, 150, 100, 80, 70],
      backgroundColor: ['#2196f3', '#4caf50', '#ff9800', '#9c27b0', '#607d8b'],
    },
  ],
};

export default function VentasPorCategoriaChart() {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm')); // xs o sm
  const isMedium = useMediaQuery(theme.breakpoints.down('md')); // xs o sm

  // Detectar tamaño real del contenedor
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

  // Cambiar dinámicamente la posición de la leyenda
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
            flexDirection: isSmall ? 'column' : 'row', // ✅ cambio responsivo
            position: 'relative',
            minHeight: 0,
          }}
        >
          {dimensions.width > 0 && dimensions.height > 0 && (
            <Pie
              data={data}
              options={chartOptions}
              width={dimensions.width}
              height={dimensions.height}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
