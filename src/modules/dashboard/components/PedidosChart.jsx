import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';

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

function getDaysInMonth(month, year) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString('en-US', { month: 'short' });
  const days = Array.from({ length: date.getDate() }, (_, i) => `${monthName} ${i + 1}`);
  return days;
}

export default function PedidosChart() {
  const data = getDaysInMonth(4, 2024);

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Pedidos diarios
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
            <Typography variant="h4" component="p">13,277</Typography>
            <Chip size="small" color="success" label="+35%" />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Pedidos por día en los últimos 30 días
          </Typography>
        </Stack>

        <LineChart
          colors={['#6ec6ff', '#2196f3', '#1565c0']}
          xAxis={[{
            scaleType: 'point',
            data,
            tickInterval: (index, i) => (i + 1) % 5 === 0,
          }]}
          series={[
            {
              id: 'local',
              label: 'Pedidos en local',
              data: [...Array(30)].map(() => Math.floor(Math.random() * 3000)),
              area: true,
              stack: 'total',
              stackOrder: 'ascending',
              curve: 'linear',
              showMark: false,
            },
            {
              id: 'domicilio',
              label: 'Pedidos a domicilio',
              data: [...Array(30)].map(() => Math.floor(Math.random() * 3000)),
              area: true,
              stack: 'total',
              stackOrder: 'ascending',
              curve: 'linear',
              showMark: false,
            },
            {
              id: 'pickup',
              label: 'Pedidos para recoger',
              data: [...Array(30)].map(() => Math.floor(Math.random() * 3000)),
              area: true,
              stack: 'total',
              stackOrder: 'ascending',
              curve: 'linear',
              showMark: false,
            },
          ]}
          height={250}
          margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          sx={{
            '& .MuiAreaElement-series-local': { fill: "url('#local')" },
            '& .MuiAreaElement-series-domicilio': { fill: "url('#domicilio')" },
            '& .MuiAreaElement-series-pickup': { fill: "url('#pickup')" },
          }}
          slotProps={{ legend: { hidden: true } }}
        >
          <AreaGradient color="#1565c0" id="local" />
          <AreaGradient color="#2196f3" id="domicilio" />
          <AreaGradient color="#6ec6ff" id="pickup" />
        </LineChart>
      </CardContent>
    </Card>
  );
}
