import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface PaymentMethodChartProps {
  data: {
    BCA: number;
    BRI: number;
    BNI: number;
    DKI: number;
    Mandiri: number;
    Flo: number;
    KTP: number;
  };
}

const PaymentMethodChart: React.FC<PaymentMethodChartProps> = ({ data }) => {
  const chartData = {
    labels: ['BCA', 'BRI', 'BNI', 'DKI', 'Mandiri', 'Flo', 'KTP'],
    datasets: [
      {
        label: 'Traffic Count by Payment Method',
        data: [data.BCA, data.BRI, data.BNI, data.DKI, data.Mandiri, data.Flo, data.KTP],
        backgroundColor: [
          '#36A2EB',
          '#FF6384',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6D6D',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'Traffic Count by Payment Method' },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default PaymentMethodChart;
