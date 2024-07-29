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

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Return a list of ALL movies to the user
app.get('/movies', (req, res) => {
  res.json(topMovies);
});

// Return data about a single movie by title
app.get('/movies/:title', (req, res) => {
  res.send('Successful GET request returning data about a single movie by title');
});

// Return data about a genre by name
app.get('/genres/:name', (req, res) => {
  res.send('Successful GET request returning data about a genre by name');
});

// Return data about a director by name
app.get('/directors/:name', (req, res) => {
  res.send('Successful GET request returning data about a director by name');
});

// Allow new users to register
app.post('/users', (req, res) => {
  console.log('POST /users');
  res.send('Successful POST request allowing new users to register');
});

// Allow users to update their user info
app.put('/users/:username', (req, res) => {
  console.log('PUT /users/:username');
  res.send('Successful PUT request allowing users to update their user info');
});

// Allow users to add a movie to their list of favorites
app.post('/users/:username/movies/:movieId', (req, res) => {
  console.log('POST /users/:username/movies/:movieId');
  res.send('Successful POST request allowing users to add a movie to their list of favorites');
});

// Allow users to remove a movie from their list of favorites
app.delete('/users/:username/movies/:movieId', (req, res) => {
  console.log('DELETE /users/:username/movies/:movieId');
  res.send('Successful DELETE request allowing users to remove a movie from their list of favorites');
});

// Allow existing users to deregister
app.delete('/users/:username', (req, res) => {
  console.log('DELETE /users/:username');
  res.send('Successful DELETE request allowing existing users to deregister');
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
  console.log(`Server is running at http://localhost:3000`);
});
