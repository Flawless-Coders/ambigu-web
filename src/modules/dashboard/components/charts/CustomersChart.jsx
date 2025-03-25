import StatCard from './StatCard'

const customersData = {
    title: 'Clientes',
    value: '1.2k',
    interval: 'Últimos 30 días',
    trend: 'up',
    data: [
        100, 120, 110, 130, 120, 190, 50, 120, 140, 120, 150, 170, 160, 180, 170, 190,
        180, 200, 190, 210, 200, 320, 170, 230, 220, 240, 230, 300, 440, 460,
    ],
}
export default function CustomersChart() {
  return <StatCard {...customersData} />
}
