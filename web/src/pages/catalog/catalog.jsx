import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import "./Catalog.css";
import ReportPage from "../../ReportPage"; // Import the ReportsPage component

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]); // Separate state for popular books
  const [showPopularBooks, setShowPopularBooks] = useState(true);

  const fetchBooks = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/books/search?query=${query}`
      );
      setBooks(response.data);
      setShowPopularBooks(false);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const debouncedFetchBooks = useCallback(
    debounce((query) => {
      if (query) {
        fetchBooks(query);
      } else {
        setBooks([]);
        setShowPopularBooks(true);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedFetchBooks(searchTerm);
  }, [searchTerm, debouncedFetchBooks]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Fetch popular books on component load
  useEffect(() => {
    const fetchPopularBooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/books/search?query=`
        );
        // Sort books by borrowCount and take the top 5
        const sortedBooks = response.data.sort(
          (a, b) => b.borrowCount - a.borrowCount
        );
        setPopularBooks(sortedBooks.slice(0, 5));
      } catch (error) {
        console.error("Error fetching popular books:", error);
      }
    };

    if (showPopularBooks) {
      fetchPopularBooks();
    }
  }, [showPopularBooks]);

  return (
    <div className="catalog">
      {/* Welcome message shown before the search bar */}
      <h1 className="welcome-message">
        {showPopularBooks && books.length === 0 ? "Welcome to the Library" : ""}
      </h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <i className="search-icon">&#x1F50D;</i>
      </div>

      {showPopularBooks && books.length === 0 ? (
        <div className="featured-books">
          <h2>Popular Books</h2>
          <div className="featured-book-container">
            {popularBooks.map((book) => (
              <div className="featured-book" key={book._id}>
                <h3>{book.title}</h3>
                <p className="author">{book.author}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="book-list">
          {books.length > 0 ? (
            books.map((book) => (
              <div className="book-card" key={book._id}>
                <h3>{book.title}</h3>
                <p className="author">Author: {book.author}</p>
                {/* Display availability status */}
                <p
                  className={`availability ${
                    book.available ? "available" : "unavailable"
                  }`}
                >
                  {book.available ? "Available" : "Not Available"}
                </p>
              </div>
            ))
          ) : (
            <p>No books found.</p>
          )}
        </div>
      )}

      {/* Include the ReportsPage component at the bottom */}
      <ReportPage />
    </div>
  );
};

export default Catalog;
