import StatCard from './StatCard'

const today = new Date();
const fakeData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(today);
  date.setDate(today.getDate() - (29 - i)); // genera días hacia atrás
  return {
    fecha: date.toISOString(),
    pedidos: Math.floor(200 + Math.random() * 800), // valores aleatorios entre 200 y 1000
  };
});

const ordersData = {
  title: 'Pedidos totales',
  value: '14k',
  interval: 'Últimos 30 días',
  trend: 'up',
  data: fakeData,
};

export default function TotalOrdersChart() {
  return <StatCard {...ordersData} />;
}