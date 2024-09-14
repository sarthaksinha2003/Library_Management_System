import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import "./Catalog.css";
import ReportPage from "../../ReportPage"; // Import the ReportsPage component

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
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

  return (
    <div className="catalog">
      {/* Welcome message shown before the search bar */}
      <h1 className="welcome-message">
        {showPopularBooks && books.length === 0
          ? "Welcome to the Library"
          : ""}
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
            <div className="featured-book featured-book-top">
              <h3>Alice in Wonderland</h3>
              <p className="author">Lewis Carroll</p>
            </div>
            <div className="featured-book featured-book-top">
              <h3>Bhagavad Gita</h3>
              <p className="author">Maharishi Veda Vyasa</p>
            </div>
          </div>
          <div className="featured-book-container">
            <div className="featured-book featured-book-bottom">
              <h3>The Catcher in the Rye</h3>
              <p className="author">J.D. Salinger</p>
            </div>
            <div className="featured-book featured-book-bottom">
              <h3>Ramayana</h3>
              <p className="author">Valmiki</p>
            </div>
            <div className="featured-book featured-book-bottom">
              <h3>The Hobbit</h3>
              <p className="author">J.R.R. Tolkien</p>
            </div>
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
                <p className={`availability ${book.available ? 'available' : 'unavailable'}`}>
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
