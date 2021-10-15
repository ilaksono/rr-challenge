const { Pool } = require('pg')
const {
  DB_HOST,
  DB_NAME,
} = process.env;
const connectionString = `postgresql://${DB_HOST}/${DB_NAME}`
const pool = new Pool({
  connectionString
})

module.exports = {
  pool
};
