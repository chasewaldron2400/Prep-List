-- Active: 1723505728753@@127.0.0.1@5432@inventory_db
-- Table for stations
DROP DATABASE IF EXISTS inventory_db;
CREATE DATABASE inventory_db;

CREATE USER cwald WITH PASSWORD 'Michael2400!';
GRANT ALL PRIVILEGES ON DATABASE inventory_db TO cwald;

SELECT * FROM stations;

-- Insert a station
INSERT INTO stations (name) VALUES ('Grill');

SELECT id FROM stations WHERE name = 'Grill';
 
CREATE TABLE stations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

-- Table for items
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    station_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    par_quantity INTEGER NOT NULL,
    FOREIGN KEY (station_id) REFERENCES stations(id)
);
