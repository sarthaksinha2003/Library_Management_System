import React, { useState } from 'react';
import axios from 'axios';
import './LendingPage.css'; 

const LendingPage = () => {
  const [bookId, setBookId] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [userId, setUserId] = useState('');  // Changed variable name to userId
  const [dueDate, setDueDate] = useState('');
  const [message, setMessage] = useState('');

  const handleLendBook = async (e) => {
    e.preventDefault();
    
    if (!bookId && !bookTitle) {
      setMessage('Please provide either a Book ID or a Book Title.');
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:5002/lending', {
        bookId,
        bookTitle,  
        lenderName: userId,  // Send userId as lenderName
        dueDate,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      setMessage('Book not available');
    }
  };

  return (
    <main className="lending-page">
      <div className="lending-form">
        <h2>Lend a Book</h2>
        <form onSubmit={handleLendBook}>
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
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <button type="submit">Lend Book</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </main>
  );
};

export default LendingPage;
