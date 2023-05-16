const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configure MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'benita_db'
});

// Connect to MySQL
connection.connect();

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// ...existing code...

// // Default route
// app.get('/', (req, res) => {
//     res.send('Welcome to the Student API');
//   });
  
//   // ...existing code...
  

// Get all students
app.get('/students', (req, res) => {
  const query = 'SELECT * FROM students';

  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Get a student by ID
app.get('/students/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM students WHERE id = ?';

  connection.query(query, [id], (error, results) => {
    if (error) throw error;
    res.send(results[0]);
  });
});

// Create a new student
app.post('/students', (req, res) => {
  const { name, age, grade } = req.body;
  const query = 'INSERT INTO students (name, age, grade) VALUES (?, ?, ?)';

  connection.query(query, [name, age, grade], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Update a student by ID
app.put('/students/:id', (req, res) => {
  const { id } = req.params;
  const { name, age, grade } = req.body;
  const query = 'UPDATE students SET name = ?, age = ?, grade = ? WHERE id = ?';

  connection.query(query, [name, age, grade, id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Delete a student by ID
app.delete('/students/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM students WHERE id = ?';

  connection.query(query, [id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
