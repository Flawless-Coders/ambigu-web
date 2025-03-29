import { Card, CardContent, Stack, Typography, Box, useMediaQuery, useTheme } from '@mui/material';
import { Gauge } from '@mui/x-charts/Gauge';
import { useEffect, useState } from 'react';
import api from '../../../auth/services/api';


export default function BestWaitersChart({order}) {
    const [waiters, setWaiters] = useState([]);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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

    // Determinar el número de waiters a mostrar según el tamaño de pantalla
    const visibleWaiters = isExtraSmallScreen ? 3 : isSmallScreen ? 4 : waiters;
    const displayWaiters = visibleWaiters === waiters ? waiters : waiters.slice(0, visibleWaiters);

    // Calcular el tamaño dinámico del gauge
    const gaugeSize = isExtraSmallScreen ? 80 : isSmallScreen ? 90 : 100;

    return (
        <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
            <CardContent>
                <Typography component="h2" variant="subtitle2" sx={{ mb: 2 }}>
                    Meseros mejor calificados
                </Typography>

                <Stack 
                    direction="row" 
                    justifyContent="space-around" 
                    alignItems="center"
                    flexWrap="nowrap" 
                    sx={{ overflowX: 'auto', pb: 1 }}
                >
                    {displayWaiters.map((w, index) => (
                        <Box key={index} textAlign="center" sx={{ minWidth: gaugeSize, px: 1 }}>
                            <Gauge
                                value={w.avgRating}
                                valueMax={5}
                                width={gaugeSize}
                                height={gaugeSize}
                            />
                            <Typography variant="body2" sx={{ mt: 1 }} noWrap>
                                {w.name}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
}