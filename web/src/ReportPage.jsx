import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import 'chart.js/auto';
import "./ReportPage.css";

const ReportsPage = () => {
  const [booksData, setBooksData] = useState([
    { title: "Alice in Wonderland", available: true, borrowCount: 10 },
    { title: "Bhagavad Gita", available: false, borrowCount: 5 },
    { title: "The Catcher in the Rye", available: true, borrowCount: 8 },
    { title: "Ramayana", available: true, borrowCount: 12 },
    { title: "The Hobbit", available: false, borrowCount: 7 },
    { title: "Moby-Dick", available: false, borrowCount: 3 },
    { title: "Emma", available: true, borrowCount: 15 },
  ]);

  // Count available and not available books
  const availableCount = booksData.filter(book => book.available).length;
  const notAvailableCount = booksData.length - availableCount;

  // Data for Book Availability Bar Chart (existing)
  const barChartData = {
    labels: ['Available', 'Not Available'],
    datasets: [
      {
        label: 'Books Availability',
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
        data: [availableCount, notAvailableCount],
      }
    ]
  };

  // Data for Book Availability Pie Chart
  const pieChartData = {
    labels: ['Borrowed', 'Available'],
    datasets: [
      {
        label: 'Books Availability',
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
        data: [availableCount, notAvailableCount],
      }
    ]
  };

  // Data for Most Borrowed Books Bar Chart
  const mostBorrowedData = {
    labels: booksData.map(book => book.title),
    datasets: [
      {
        label: 'Borrow Count',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
        data: booksData.map(book => book.borrowCount),
      }
    ]
  };

  // Options for charts
  const options = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: true,
        },
      },
      y: {
        beginAtZero: true,
        min: 0,
        ticks: {
          stepSize: 1, // Increment by 1
        },
        grid: {
          display: true,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 16,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          },
        },
      },
    },
  };
  

  return (
    <div className="reports-section">
      <h2>Reports</h2>
      <div className="chart-container">
        <div className="chart-item">
          <h3>Book Availability Report (Bar Chart)</h3>
          <Bar data={barChartData} options={options} />
        </div>
        <div className="chart-item pie-chart">
          <h3>Book Availability (Pie Chart)</h3>
          <Pie data={pieChartData} options={options} />
        </div>
        <div className="chart-item">
          <h3>Most Borrowed Books (Bar Chart)</h3>
          <Bar data={mostBorrowedData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
