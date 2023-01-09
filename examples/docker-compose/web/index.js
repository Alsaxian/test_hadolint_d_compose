// For dev purpose, go to http://localhost:8080/users to see the initialized user table.

const express = require('express');
const { Client } = require('pg');

const app = express();

// Set the view engine to pug
app.set('view engine', 'pug');

// Set the views directory
app.set('views', './views');

const client = new Client({
  host: 'db',  // the name of the service defined in docker-compose.yml
  user: 'postgres',
  password: process.env.POSTGRES_PASSWORD,  // leave this blank if you didn't set a password
  database: 'postgres'
});

client.connect();

app.get('/', (req, res) => {
  res.send('Please go to /users to see the list of users.');
});

app.get('/users', async (req, res) => {
  const result = await client.query('SELECT * FROM users');
  res.render('users', { users: result.rows });
});

app.listen(8080, () => {
  console.log('Web server listening on port 8080');
});