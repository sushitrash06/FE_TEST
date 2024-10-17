import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement } from 'chart.js';

ChartJS.register(ArcElement);

interface ShiftChartProps {
  data: {
    shift1: number;
    shift2: number;
    shift3: number;
  };
}

const ShiftChart: React.FC<ShiftChartProps> = ({ data }) => {
  const chartData = {
    labels: ['Shift 1', 'Shift 2', 'Shift 3'],
    datasets: [
      {
        data: [data.shift1, data.shift2, data.shift3],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return <Doughnut data={chartData} />;
};

export default ShiftChart;
