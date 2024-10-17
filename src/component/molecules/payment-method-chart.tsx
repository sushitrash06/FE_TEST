import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PaymentMethodChartProps {
  data: {
    BCA: number;
    BRI: number;
    BNI: number;
    DKI: number;
    Mandiri: number;
    Tunai: number;
    DinasOpr: number;
    DinasMitra: number;
    DinasKary: number;
  };
}

const PaymentMethodChart: React.FC<PaymentMethodChartProps> = ({ data }) => {
  const chartData = {
    labels: [
      "BCA",
      "BRI",
      "BNI",
      "DKI",
      "Mandiri",
      "Tunai",
      "DinarOpr",
      "DinasMitra",
      "DinasKary",
    ],
    datasets: [
      {
        label: "Traffic Count by Payment Method",
        data: [
          data.BCA,
          data.BRI,
          data.BNI,
          data.DKI,
          data.Mandiri,
          data.Tunai,
          data.DinasOpr,
          data.DinasMitra,
          data.DinasKary,
        ],
        backgroundColor: [
          "#ACBBD7",
          "#00458F",
          "#FFCE56",
          "#818945",
          "#2A515F",
          "#6F85B5",
          "#3B629E",
          "#9D9933",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Traffic Count by Payment Method" },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-10/12 h-80 mx-auto">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default PaymentMethodChart;
