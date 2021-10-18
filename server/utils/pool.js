const { Pool } = require('pg')
const {
  DB_HOST,
  DB_NAME,
  DATABASE_URL
} = process.env;
const connectionString = DATABASE_URL || `postgresql://${DB_HOST}/${DB_NAME}`
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
})

module.exports = {
  pool
};
