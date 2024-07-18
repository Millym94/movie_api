const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = 3000;

// Top 10 movies
const topMovies = [
  { title: 'Moulin Rouge!', year: 2001, director: 'Baz Luhrmann' },
  { title: 'Scott Pilgrim Vs. The World', year: 2010, director: 'Edgar Wright' },
  { title: 'The Dark Knight', year: 2008, director: 'Christopher Nolan' },
  { title: 'The Fifth Element', year: 1997, director: 'Luc Besson' },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003, director: 'Peter Jackson' },
  { title: 'Dune: Part One', year: 2021, director: 'Denis Velleneuve' },
  { title: "Harry Potter and the Sorcerer's Stone", year: 2001, director: 'Chris Columbus' },
  { title: 'White Christmas', year: 1954, director: 'Michael Curtiz' },
  { title: 'The Matrix', year: 1999, director: 'Lana Wachowski, Lilly Wachowski' },
  { title: 'The Iron Giant', year: 1999, director: 'Brad Bird' }
];

// Middleware to log requests
app.use(morgan('combined'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define the /movies route
app.get('/movies', (req, res) => {
  res.json(topMovies);
});

// Define the / route
app.get('/', (req, res) => {
  res.send('Welcome to the Movie API!');
});

// GET request for the documentation endpoint
app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:3000/`);
});
