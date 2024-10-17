import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js";
import React from "react";

ChartJS.register(ArcElement);

interface BranchChartProps {
  data: { branchName: string; trafficCount: number }[];
}

const BranchChart: React.FC<BranchChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.branchName),
    datasets: [
      {
        data: data.map((item) => item.trafficCount),
        backgroundColor: [
          "#00458F",
          "#FFCE56",
          "#818945",
          "#2A515F",
          "#6F85B5",
        ],
      },
    ],
  };

  return (
    <div className="w-64 h-64 mx-auto">
      <Doughnut
        data={chartData}
        options={{ maintainAspectRatio: false, responsive: true }}
      />
    </div>
  );
};

export default BranchChart;
