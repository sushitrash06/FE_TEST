import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js";

ChartJS.register(ArcElement);

interface GateChartProps {
  data: { gateName: string; trafficCount: number }[];
}

const GateChart: React.FC<GateChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.gateName),
    datasets: [
      {
        label: "Traffic Count by Gate",
        data: data.map((item) => item.trafficCount),
        backgroundColor:  ["#2A515F",, "#00458F", "#FFCE56"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Traffic Count by Gate" },
    },
  };

  return (
    <div className="w-10/12 h-80 mx-auto">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default GateChart;
