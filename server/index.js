const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const studentsRoutes = require('./routes/students');
const loanRoutes = require('./routes/loans');

app.use('/api/students', studentsRoutes);
app.use('/api/loans', loanRoutes);

const booksRoutes = require('./routes/books');

app.use('/api/books', booksRoutes);

app.get('/api/test', (req, res) => {
  res.json({ message: 'API working correctly' });
});

const port = 3001;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
