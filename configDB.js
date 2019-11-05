const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
});

// module.exports = { pool };

//  ////////

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Tables
 */
const createTables = () => {
  const queryText = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  CREATE TABLE IF NOT EXISTS
      employees ( 
        userId uuid DEFAULT uuid_generate_v4 (), 
        firstname VARCHAR(255) NOT NULL,
        lastName VARCHAR(225) NOT NULL, 
        email VARCHAR(225) NOT NULL, 
        password VARCHAR(225) NOT NULL, 
        gender VARCHAR(225) NOT NULL, 
        jobRole VARCHAR(225) NOT NULL, 
        department VARCHAR(225) NOT NULL, 
        address VARCHAR(225) NOT NULL,
        PRIMARY KEY (userId)
      )`;

  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS employees';
  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables,
};

require('make-runnable');
