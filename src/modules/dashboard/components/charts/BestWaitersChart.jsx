import { Card, CardContent, Stack, Typography, Box } from '@mui/material';
import { Gauge } from '@mui/x-charts/Gauge';
import { useEffect, useState } from 'react';
import api from '../../../auth/services/api';


export default function BestWaitersChart() {
    const [waiters, setWaiters] = useState([]);

useEffect(() => {
    async function fetchWaiters() {
        try {
            const response = await api.get('/dashboard/top5-waiters');
            setWaiters(response.data);
        } catch (error) {
            console.error('Error fetching waiters:', error);
        }
    }

    fetchWaiters();
}, []);

  return (
    <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" sx={{ mb: 2 }}>
          Meseros mejor calificados
        </Typography>

        <Stack direction="row" justifyContent="space-between" flexWrap="wrap" spacing={2}>
          {waiters.map((w, index) => (
            <Box key={index} textAlign="center">
              <Gauge
                value={w.avgRating}
                valueMax={5}
                width={100}
                height={100}
              />
              <Typography variant="body2" sx={{ mt: 1 }}>
                {w.name}
              </Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}