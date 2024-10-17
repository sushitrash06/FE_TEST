import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from 'chart.js';

ChartJS.register(ArcElement);

interface BranchChartProps {
    data: { branchName: string; trafficCount: number }[];
  }
  
  const BranchChart: React.FC<BranchChartProps> = ({ data }) => {
    const chartData = {
      labels: data.map(item => item.branchName),
      datasets: [
        {
          data: data.map(item => item.trafficCount),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        },
      ],
    };
  
    return <Doughnut data={chartData} />;
  };
  
  export default BranchChart;
  