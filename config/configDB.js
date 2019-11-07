/* eslint-disable no-console */
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

// **CREATE TABLES**

/**
 * Create EMPLOYEES Table
 */
const createEmployeesTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      employees ( 
        userid uuid PRIMARY KEY, 
        firstname VARCHAR(255) NOT NULL,
        lastName VARCHAR(225) NOT NULL, 
        email VARCHAR(225) UNIQUE NOT NULL, 
        password VARCHAR(225) NOT NULL, 
        gender VARCHAR(225) NOT NULL, 
        jobRole VARCHAR(225) NOT NULL, 
        department VARCHAR(225) NOT NULL, 
        address VARCHAR(225) NOT NULL
      )`;

  pool
    .query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create ARTICLES Table
 */
const createArticlesTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      articles(
        articleid UUID PRIMARY KEY,
        title VARCHAR(225) UNIQUE NOT NULL,
        article TEXT NOT NULL,
        createdon TIMESTAMP NOT NULL DEFAULT NOW(),
        userid VARCHAR(225) NOT NULL,
        FOREIGN KEY (userid) REFERENCES employees(userid) ON DELETE CASCADE
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create GIFS Table
 */
const createGifsTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      gifs(
        gifid UUID PRIMARY KEY,
        imageurl TEXT NOT NULL,
        title VARCHAR(225) NOT NULL,
        createdon TIMESTAMP NOT NULL DEFAULT NOW(),
        userid VARCHAR(225) NOT NULL,
        FOREIGN KEY (userid) REFERENCES employees(userid) ON DELETE CASCADE 
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create COMMENTS Table
 */
const createCommentsTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      comments(
        commentid UUID PRIMARY KEY,
        comment TEXT NOT NULL,
        createdon TIMESTAMP NOT NULL DEFAULT NOW(),
        userid VARCHAR(225) NOT NULL,
        articleid VARCHAR(225),
        gifid VARCHAR(225),
        FOREIGN KEY (userid) REFERENCES employees(userid) ON DELETE CASCADE,
        FOREIGN KEY (articleid) REFERENCES articles(articleid) ON DELETE CASCADE,
        FOREIGN KEY (gifid) REFERENCES gifs(gifid) ON DELETE CASCADE
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

// **DROP TABLES**
/**
 * Drop EMPLOYEES Table
 */
const dropEmployeesTable = () => {
  const queryText = 'DROP TABLE IF EXISTS employees returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop ARTICLES Table
 */
const dropArticlesTable = () => {
  const queryText = 'DROP TABLE IF EXISTS articles returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop GIFS Table
 */
const dropGifsTable = () => {
  const queryText = 'DROP TABLE IF EXISTS gifs returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop COMMENTS Table
 */
const dropCommentsTable = () => {
  const queryText = 'DROP TABLE IF EXISTS comments returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createEmployeesTable,
  createArticlesTable,
  createGifsTable,
  createCommentsTable,
  dropEmployeesTable,
  dropArticlesTable,
  dropGifsTable,
  dropCommentsTable,
};

require('make-runnable');
