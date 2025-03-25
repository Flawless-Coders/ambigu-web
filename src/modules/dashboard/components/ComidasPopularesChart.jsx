import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const data = [
  { label: 'Hamburguesa', value: 50000 },
  { label: 'Pizza', value: 35000 },
  { label: 'Tacos', value: 10000 },
  { label: 'Otros', value: 5000 },
];

const comidas = [
  { name: 'Hamburguesa', value: 50, color: 'hsl(220, 25%, 65%)' },
  { name: 'Pizza', value: 35, color: 'hsl(220, 25%, 45%)' },
  { name: 'Tacos', value: 10, color: 'hsl(220, 25%, 30%)' },
  { name: 'Otros', value: 5, color: 'hsl(220, 25%, 20%)' },
];

export default function ComidasPopularesChart() {
  return (
    <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          Comidas más pedidas
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PieChart
            colors={['hsl(220, 20%, 65%)', 'hsl(220, 20%, 42%)', 'hsl(220, 20%, 35%)', 'hsl(220, 20%, 25%)']}
            margin={{ left: 80, right: 80, top: 80, bottom: 80 }}
            series={[{ data, innerRadius: 75, outerRadius: 100, paddingAngle: 0 }]}
            height={260}
            width={260}
            slotProps={{ legend: { hidden: true } }}
          />
        </Box>
        {comidas.map((item, index) => (
          <Stack key={index} direction="row" sx={{ alignItems: 'center', gap: 2, pb: 2 }}>
            <Box sx={{ width: 12, height: 12, bgcolor: item.color, borderRadius: '50%' }} />
            <Stack sx={{ gap: 1, flexGrow: 1 }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: '500' }}>{item.name}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{item.value}%</Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={item.value}
                sx={{
                  [`& .${linearProgressClasses.bar}`]: {
                    backgroundColor: item.color,
                  },
                }}
              />
            </Stack>
          </Stack>
        ))}
      </CardContent>
    </Card>
  );
}
