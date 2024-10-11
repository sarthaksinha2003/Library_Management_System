import React, { useState } from 'react';
import './style.css';
import MetricsChart from '../../components/MetricsChart';

const LibraryDashboard: React.FC = () => {
  const books = [
    { title: "To Kill a Mockingbird", author: "Harper Lee", image: "https://m.media-amazon.com/images/I/81gepf1eMqL._AC_UF1000,1000_QL80_.jpg" },
    { title: "1984", author: "George Orwell", image: "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg" },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", image: "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg" },
    { title: "Pride and Prejudice", author: "Jane Austen", image: "https://m.media-amazon.com/images/I/81wgcld4wxL.jpg" },
    { title: "The Catcher in the Rye", author: "J.D. Salinger", image: "https://m.media-amazon.com/images/I/51b5YG6Y1rL.jpg" },
    { title: "The Hobbit", author: "J.R.R. Tolkien", image: "https://m.media-amazon.com/images/I/91b0C2YNSrL._AC_UF1000,1000_QL80_.jpg" },
    { title: "Moby Dick", author: "Herman Melville", image: "https://th.bing.com/th/id/R.ba483c4c1e796ab1a9a69e1fc4d7f9ce?rik=J83UY7dc%2bUDq4Q&riu=http%3a%2f%2fwww.makaobora.co.ke%2fbora%2fwp-content%2fuploads%2f2020%2f03%2fmoby-dick-222.jpg&ehk=i0RlinIuMAi41HxKFmhD5WCI8MZKkpzbBUiDz5ysrnU%3d&risl=&pid=ImgRaw&r=0" },
    { title: "War and Peace", author: "Leo Tolstoy", image: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781524864989/war-and-peace-9781524864989_hr.jpg" },
    { title: "Crime and Punishment", author: "Fyodor Dostoevsky", image: "https://th.bing.com/th/id/R.d5ae75157f51383307d507121ff1190b?rik=5WLeqBrKWOTfSQ&riu=http%3a%2f%2fwww.simbasible.com%2fwp-content%2fuploads%2f2020%2f12%2f22-8-768x1156.jpg&ehk=M5%2b8wUqUhNgdjLuALcNtWklP83XJtgrBRQnnYbVNOt0%3d&risl=&pid=ImgRaw&r=0" },
    { title: "The Lord of the Rings", author: "J.R.R. Tolkien", image: "https://m.media-amazon.com/images/I/91dSMhdIzTL._AC_UF1000,1000_QL80_.jpg" }
  ];

  const [showChart, setShowChart] = useState(false);

  const toggleChartVisibility = () => {
    setShowChart(prev => !prev); // Toggle the chart visibility
  };

  const handleSearchClick = () => {
    window.location.href = "/search-catalog"; // Redirect to search catalog page
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Library</h2>
<hr />
        <ul className="sidebar-options">
          <li>•  Home</li>
          <li>•  Lending</li>
          <li>•  Query</li>
          <li>•  My Books</li>
          <li>•  Notifications</li>
          <li>•  Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Search bar (replaced with info and search button) */}
        <div className="search-bar-replacement">
          <div className="library-summary">
            <h3>Welcome to the Digital Library</h3>
          </div>
          <button onClick={handleSearchClick} className="search-catalog-button">
            Go to Search Catalog
          </button>
        </div>

        {/* Book display */}
        <div className="book-grid">
          {books.map((book, index) => (
            <div key={index} className="book-item">
              <img src={book.image} alt={book.title} />
              <div className="book-item-details">
                <h4>{book.title}</h4>
                <p>{book.author}</p>
              </div>
            </div>
          ))}
        </div>

        {/* New button to toggle chart visibility */}
        <button onClick={toggleChartVisibility} className="toggle-chart-button">
          {showChart ? 'Hide Charts' : 'Show Charts'}
        </button>

        {/* Conditional rendering of MetricsChart */}
        {showChart && (
          <section>
            <h3>Metrics and Reports</h3>
            <MetricsChart />
          </section>
        )}


      </main>
    </div>
  );
};

<<<<<<< HEAD
export default LibraryDashboard;
=======
export default SamplePage;
 
>>>>>>> f608e430c01d78c756bc8b71f7a1cac480afd9f5
