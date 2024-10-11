import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import "./Catalog.css";
import ReportPage from "../../ReportPage";

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [books, setBooks] = useState([]); 
  const [popularBooks, setPopularBooks] = useState([]); 
  const [isSearching, setIsSearching] = useState(false); 
  const [noBooksFound, setNoBooksFound] = useState(false);

  const fetchBooks = async (query) => {
    try {
      setIsSearching(true); 
      const response = await axios.get(
        `http://localhost:5001/books/search?query=${query}`
      );
      setBooks(response.data); 
      setNoBooksFound(response.data.length === 0); 
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setIsSearching(false); 
    }
  };

  const fetchPopularBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/books/search?query=`);
      const sortedBooks = response.data.sort((a, b) => b.borrowCount - a.borrowCount);
      setPopularBooks(sortedBooks.slice(0, 5)); 
    } catch (error) {
      console.error("Error fetching popular books:", error);
    }
  };

  const debouncedFetchBooks = useCallback(
    debounce((query) => {
      if (query) {
        fetchBooks(query); 
      } else {
        setBooks([]); 
        setNoBooksFound(false); 
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchPopularBooks();
  }, []);

  
  useEffect(() => {
    debouncedFetchBooks(searchTerm); 
  }, [searchTerm, debouncedFetchBooks]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="catalog">
      <h1 className="welcome-message">
        {books.length === 0 && searchTerm === "" ? "Welcome to the Library" : ""}
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

      {searchTerm ? ( 
        <>
          {isSearching ? ( 
            <p>Searching...</p>
          ) : (
            <>
              {noBooksFound ? ( 
                <p>No books found.</p>
              ) : (
                <div className="book-list">
                  {books.map((book) => (
                    <div className="book-card" key={book._id}>
                      <h3>{book.title}</h3>
                      <p className="author">Author: {book.author}</p>
                      <p className={`availability ${book.available ? "available" : "unavailable"}`}>
                        {book.available ? "Available" : "Not Available"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </>
      ) : ( // If no search term, show popular books
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
      )}

      <ReportPage />
    </div>
  );
};

export default Catalog;
