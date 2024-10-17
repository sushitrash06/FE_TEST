import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from 'chart.js';

ChartJS.register(ArcElement);

interface GateChartProps {
  data: { gateName: string; trafficCount: number }[];
}

const GateChart: React.FC<GateChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.gateName),
    datasets: [
      {
        label: 'Traffic Count by Gate',
        data: data.map(item => item.trafficCount),
        backgroundColor: '#FF6384',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'Traffic Count by Gate' },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default GateChart;
