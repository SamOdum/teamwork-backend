// src/usingDB/models/index.js
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE,
} = process.env;

const connectionString = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
});


const dbQuery = {
  /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   */
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool
        .query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

module.exports = dbQuery;
