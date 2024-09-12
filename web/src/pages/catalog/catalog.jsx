import React, { useState } from 'react';
import './Catalog.css';

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', available: true },
    { id: 2, title: '1984', author: 'George Orwell', available: false },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', available: true },
    { id: 4, title: 'The Catcher in the Rye', author: 'J.D. Salinger', available: false },
  ]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="catalog">
      <h1>Library Catalog</h1>
      
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

      <div className="book-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div className="book-card" key={book.id}>
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Status: {book.available ? 'Available' : 'Not Available'}</p>
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
};

export default Catalog;
