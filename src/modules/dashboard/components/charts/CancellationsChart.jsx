import StatCard from "./StatCard";

const cancellationsData =   {
    title: 'Cancelaciones',
    value: '325',
    interval: 'Últimos 30 días',
    trend: 'down',
    data: [
      1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820,
      780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300, 220,
    ],
  };


export default function CancellationsChart() {
  return <StatCard {...cancellationsData} />;
}
