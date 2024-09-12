const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/bookCatalog', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

  const bookSchema = new mongoose.Schema({
    title: String,
    author: String
  });
  
  const Book = mongoose.model('Book', bookSchema);

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

app.get('/books/search', async (req, res) => {
  const { query } = req.query;
  console.log(query)
  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
