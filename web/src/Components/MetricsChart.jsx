import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Books',
      data: [4000, 3000, 2000, 2500, 3000, 4000, 3500, 4500, 4200, 3800, 5700, 5000],
      borderColor: '#3498db',
      backgroundColor: 'rgba(52, 152, 219, 0.2)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Users',
      data: [2400, 1398, 9500, 4700, 5200, 4400, 7700, 8500, 9000, 6000, 6500, 3500],
      borderColor: '#2ecc71',
      backgroundColor: 'rgba(46, 204, 113, 0.2)',
      fill: true,
      tension: 0.4,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Library Books and Users Analytics',
    },
  },
};

const MetricsChart = () => {
  return (
    <div className="metrics-chart">
      <Line data={data} options={options} />
    </div>
  );
};

export default MetricsChart;
