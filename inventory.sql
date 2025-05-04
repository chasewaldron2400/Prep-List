-- Active: 1723505728753@@127.0.0.1@5432@inventory_db
-- Table for stations
-- Drop and create database
CREATE DATABASE inventory_db;

-- Connect to inventory_db before running next statements

-- Then, create user and grant privileges
CREATE USER cwald WITH PASSWORD 'Michael2400!';
GRANT ALL PRIVILEGES ON DATABASE inventory_db TO cwald;

-- Switch to the new database (important!)
\c inventory_db

-- Create tables
CREATE TABLE stations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    station_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    par_quantity INTEGER NOT NULL,
    FOREIGN KEY (station_id) REFERENCES stations(id)
    FOREIGN KEY (location_id) REFERENCES locations(id)
);

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

ALTER TABLE items
ADD COLUMN location_id INTEGER,
ADD FOREIGN KEY (location_id) REFERENCES locations(id);

INSERT INTO locations (name) VALUES ('Basement'), ('1st Floor Prep');

SELECT * FROM items WHERE station_id = 1;

ALTER TABLE items ADD COLUMN unit TEXT;


-- Insert sample station
INSERT INTO stations (name) VALUES ('Grill');

-- (Optional) Insert sample item
-- INSERT INTO items (station_id, name, par_quantity) VALUES (1, 'Spatula', 10);

-- Test query
SELECT * FROM stations;
