import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { LineChart } from '@mui/x-charts/LineChart';

export default function StatCard({ title, value, interval, trend, data }) {
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

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          {title}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1 }}
        >
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
          {interval}
        </Typography>
        <LineChart
          series={[
            {
              id: 'trend',
              data: data,
              showMark: false,
              area: true,
            },
          ]}
         
          height={80}
          margin={{ top: 5, bottom: 5, left: 5, right: 5 }}
          slotProps={{
            legend: { hidden: true },
          }}
          grid={{ horizontal: false, vertical: false }}
        />
      </CardContent>
    </Card>
  );
}
