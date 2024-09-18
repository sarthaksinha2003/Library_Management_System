import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import 'chart.js/auto';
import axios from "axios";
import "./ReportPage.css";

const ReportsPage = () => {
  const [booksData, setBooksData] = useState([]);

  // Fetch books data from MongoDB
  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/books/search?query="); // Fetch all books
        setBooksData(response.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching books data:", error);
      }
    };
    fetchBooksData();
  }, []);

  // Calculate available and not available counts
  const availableCount = booksData.filter(book => book.available).length;
  const notAvailableCount = booksData.length - availableCount;

  // Group books by genre and count borrowed books per genre
  const genreDemandData = booksData.reduce((acc, book) => {
    if (!acc[book.genre]) {
      acc[book.genre] = 0;
    }
    if (!book.available) {
      acc[book.genre] += 1; // Increment demand for borrowed books
    }
    return acc;
  }, {});

  // Sort books by borrowCount and limit to top 10
  const topBorrowedBooks = booksData
    .sort((a, b) => b.borrowCount - a.borrowCount)
    .slice(0, 10); // Limit to top 10 most borrowed books

  // Data for the bar chart showing availability
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

  // Data for the pie chart showing genres in demand
  const pieChartGenreData = {
    labels: Object.keys(genreDemandData), // Genre names
    datasets: [
      {
        label: 'Books in Demand by Genre',
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(54, 162, 235, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 206, 86, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
        data: Object.values(genreDemandData), // Demand counts by genre
      }
    ]
  };

  // Data for the top 10 most borrowed books
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

  // Chart options with fix for the tooltip in pie chart
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
            if (context.raw !== null) label += context.raw; // Fix for pie chart tooltips
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
        
        {/* Books in Demand by Genre Pie Chart */}
        <div className="chart-item pie-chart">
          <h3>Books in Demand by Genre (Pie Chart)</h3>
          <Pie data={pieChartGenreData} options={options} />
        </div>

        <div className="bar-charts">
          {/* Book Availability Bar Chart */}
          <div className="chart-item bar-chart">
            <h3>Book Availability Report (Bar Chart)</h3>
            <Bar data={barChartData} options={options} />
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
