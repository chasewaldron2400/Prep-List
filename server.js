const express = require('express');
// Import and require Pool (node-postgres)
// We'll be creating a Connection Pool. Read up on the benefits here: https://node-postgres.com/features/pooling
const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const pool = new Pool(
  {
    // TODO: Enter PostgreSQL username
    user: '',
    // TODO: Enter PostgreSQL password
    password: 'Michael2400!',
    host: 'localhost',
    database: 'inventory_db'
  },
  console.log(`Connected to the inventory database.`)
)

pool.connect();

// API endpoint to fetch data
app.get('/api/items', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT s.name as station, i.name as item, i.par_quantity
      FROM items i
      JOIN stations s ON i.station_id = s.id
      ORDER BY s.name, i.name
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching items');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
