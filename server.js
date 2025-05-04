// Import Express framework
const express = require('express');

const cors = require('cors');


// Import PostgreSQL connection pool from 'pg'
const { Pool } = require('pg');

// Define the port (default to 3001 if not set in environment variables)
const PORT = process.env.PORT || 3001;

// Create an Express application
const app = express();

// =====================
// Middleware
// =====================
app.use(cors());
// Parse URL-encoded data (from forms)
app.use(express.urlencoded({ extended: false }));

// Parse incoming JSON data (from APIs or frontend fetch)
app.use(express.json());

// =====================
// PostgreSQL Database Connection
// =====================

const pool = new Pool({
  user: 'cwald',                // Your PostgreSQL username
  password: 'Michael2400!',     // Your PostgreSQL password
  host: 'localhost',            // Server location
  database: 'inventory_db'      // Your database name
});

// Test the connection when the server starts
pool.connect()
  .then(() => console.log("Connected to the inventory database."))
  .catch((err) => console.error("Connection error", err.stack));

// =====================
// API Endpoints
// =====================

// GET /stations
// Returns all available stations (e.g., Grill, Fry, Prep)
app.get('/stations', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM stations');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// GET /items/:stationId
// Returns all items for a specific station, along with their storage location
app.get('/items/:stationId', async (req, res) => {
  const stationId = parseInt(req.params.stationId); // ensure it's a number

  if (isNaN(stationId)) {
    return res.status(400).json({ error: 'Invalid station ID' });
  }

  try {
    const result = await pool.query(
      `SELECT items.id, items.name, items.par_quantity, items.unit, locations.name AS location_name
       FROM items
       JOIN locations ON items.location_id = locations.id
       WHERE items.station_id = $1`,
      [stationId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


// GET /locations
// Returns all storage locations (e.g., Basement, 1st Floor Prep)
app.get('/locations', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM locations');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// PUT /items/:itemId/location
// Updates the location of a specific item (used by admin or UI to reassign storage)
app.put('/items/:itemId/location', async (req, res) => {
  const itemId = req.params.itemId;
  const { location_id } = req.body;

  try {
    await pool.query(
      'UPDATE items SET location_id = $1 WHERE id = $2',
      [location_id, itemId]
    );
    res.json({ message: 'Location updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// =====================
// Start the Express server
// =====================
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
