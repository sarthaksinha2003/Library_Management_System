import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookCatalog = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/books/search?query=${query}`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    if (query) {
      fetchBooks();
    }
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title or author"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {books.map((book) => (
          <li key={book._id}>{book.title} by {book.author}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookCatalog;
