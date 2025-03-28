import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';

export default function CategoriesChart() {
  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Ventas por categoría
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
            <Typography variant="h4" component="p">1.3M</Typography>
            <Chip size="small" color="error" label="-8%" />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Últimos 6 meses
          </Typography>
        </Stack>

        <BarChart
          borderRadius={8}
          colors={['#1565c0', '#42a5f5', '#90caf9']}
          xAxis={[{
            scaleType: 'band',
            categoryGapRatio: 0.5,
            data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
          }]}
          series={[
            {
              id: 'comida',
              label: 'Comida',
              data: [1200, 1400, 1800, 1600, 2000, 1700],
              stack: 'A',
            },
            {
              id: 'bebida',
              label: 'Bebidas',
              data: [900, 1000, 950, 1100, 980, 1050],
              stack: 'A',
            },
            {
              id: 'postre',
              label: 'Postres',
              data: [400, 500, 450, 520, 480, 470],
              stack: 'A',
            },
          ]}
          height={250}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{ legend: { hidden: true } }}
        />
      </CardContent>
    </Card>
  );
}
