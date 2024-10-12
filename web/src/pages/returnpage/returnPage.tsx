import React, { useState } from 'react';
import axios from 'axios';
import './ReturnPage.css'; 

const ReturnPage = () => {
  const [bookId, setBookId] = useState('');
  const [bookTitle, setBookTitle] = useState(''); // Optional field for book title
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleReturnBook = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5002/return', { 
        bookId, 
        bookTitle, // Include bookTitle in the request
        userId 
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error returning book');
      console.error(error.response ? error.response.data : error.message);
    }
  };

  return (
    <main className="return-page">
      <div className="return-form">
        <h2>Return a Book</h2>
        <form onSubmit={handleReturnBook}>
          <div className="form-group">
            <label htmlFor="bookId">Book ID (optional)</label>
            <input
              type="text"
              id="bookId"
              name="bookId"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bookTitle">Book Title (optional)</label>
            <input
              type="text"
              id="bookTitle"
              name="bookTitle"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="userId">User ID</label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <button type="submit">Return Book</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </main>
  );
};

export default ReturnPage;
