import React, { useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import 'chart.js/auto';
import axios from "axios";
import 'chartjs-plugin-datalabels';
import "./ReportPage.css";

const ReportsPage = () => {
  const [booksData, setBooksData] = useState([]);

  
  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/books/search?query=");
        setBooksData(response.data); 
      } catch (error) {
        console.error("Error fetching books data:", error);
      }
    };
    fetchBooksData();
  }, []);

  
  const availableCount = booksData.filter(book => book.available).length;
  const notAvailableCount = booksData.length - availableCount;

  
  const genreDemandData = booksData.reduce((acc, book) => {
    if (!acc[book.genre]) {
      acc[book.genre] = 0;
    }
    if (!book.available) {
      acc[book.genre] += 1;
    }
    return acc;
  }, {});

  
  const topBorrowedBooks = booksData
    .sort((a, b) => b.borrowCount - a.borrowCount)
    .slice(0, 10); 

  
  const barChartData = {
    labels: ['Available', 'Not Available'],
    datasets: [
      {
        label: 'Books Availability',
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', 
          'rgba(255, 99, 132, 0.6)'  
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)', 
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1,
        data: [availableCount, notAvailableCount],
        barPercentage: 0.6, 
      }
    ]
  };

  
  const colors = [
    'rgba(75, 192, 192, 0.6)', 
    'rgba(255, 99, 132, 0.6)', 
    'rgba(153, 102, 255, 0.6)', 
    'rgba(255, 206, 86, 0.6)', 
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    'rgba(201, 203, 207, 0.6)',
    'rgba(255, 99, 71, 0.6)',
    'rgba(255, 215, 0, 0.6)',
    'rgba(0, 255, 127, 0.6)'
  ];

  
  const pieChartGenreData = {
    labels: Object.keys(genreDemandData),
    datasets: [
      {
        label: 'Books in Demand by Genre',
        backgroundColor: Object.keys(genreDemandData).map((_, index) => colors[index % colors.length]),
        borderColor: Object.keys(genreDemandData).map((_, index) => colors[index % colors.length].replace('0.6', '1')),
        borderWidth: 1,
        data: Object.values(genreDemandData),
      }
    ]
  };

  
  const mostBorrowedData = {
    labels: topBorrowedBooks.map(book => book.title),
    datasets: [
      {
        label: 'Top 10 Most Borrowed Books',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
        data: topBorrowedBooks.map(book => book.borrowCount),
      }
    ]
  };

  
  const borrowingTrendsData = booksData.reduce((acc, book) => {
    if (book.borrowHistory && book.borrowHistory.length > 0) {
      book.borrowHistory.forEach(borrow => {
        const date = new Date(borrow.date).toLocaleDateString();
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date] += 1;
      });
    }
    return acc;
  }, {});


  const lineChartData = {
    labels: Object.keys(borrowingTrendsData),
    datasets: [
      {
        label: 'Borrowing Trends Over Time',
        data: Object.values(borrowingTrendsData),
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.1,
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        grid: { display: true },
      },
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
        grid: { display: true },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: { font: { size: 16 } },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || '';
            if (label) label += ': ';
            if (context.raw !== null) label += context.raw;
            return label;
          },
        },
      },

      datalabels: {
        anchor: 'end',
        align: 'end',
        color: '#333',
        formatter: (value) => {
          return value;
        },
      },
    },
  };

  return (
    <div className="reports-section">
      <h2>Reports</h2>
      <div className="chart-container">
        <div className="chart-row">
          {/* Books in Demand by Genre Pie Chart */}
          <div className="chart-item pie-chart">
            <h3>Books in Demand by Genre (Pie Chart)</h3>
            <Pie data={pieChartGenreData} options={options} />
          </div>

          {/* Book Availability Bar Chart */}
          <div className="chart-item bar-chart">
            <h3>Book Availability Report (Bar Chart)</h3>
            <Bar data={barChartData} options={options} />
            <p className="availability-description">
              This chart provides insights into the availability of books in our library. A higher number of available books indicates better accessibility for our readers. 
              Explore our collection and find your next read!
            </p>
          </div>
        </div>

        <div className="chart-row">
          {/* Borrowing Trends Over Time Line Chart */}
          <div className="chart-item line-chart">
            <h3>Borrowing Trends Over Time (Line Chart)</h3>
            <Line data={lineChartData} options={options} />
          </div>

          {/* Most Borrowed Books Bar Chart - Top 10 */}
          <div className="chart-item bar-chart">
            <h3>Top 10 Most Borrowed Books (Bar Chart)</h3>
            <Bar data={mostBorrowedData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
