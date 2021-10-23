const { pool } = require('./pool')
const { done, errorResponse } = require('./globalSettings');
const { queryAllDrivers,
  queryMakeDriver,
  queryDeleteDriver } = require('./sqlQueries');
const errorMessages = require('./errorMessages');

// get route method for fetching drivers using 'pg.Pool'
// call done(res, data) to send response
const getAllDrivers = async (req, res) => {
  try {
    const resq = await pool.query({
      text: queryAllDrivers
    });
    if (resq?.rows)
      return done(res, resq.rows);
    return errorResponse(res, errorMessages.queryFailed)
  } catch (er) {
    
    return errorResponse(res, errorMessages.queryFailed)

  }
}

// create driver
const makeDriver = async (req, res) => {
  try {
    const {
      fname,
      lname,
      make,
      model,
      year,
      driver_insurance
    } = req.body
    if (!fname) {
      return errorResponse(res, 'Please add a driver name');
    }
    const resq = await pool.query({
      text: queryMakeDriver,
      values: [
        fname,
        lname,
        make,
        model,
        Number(year),
        driver_insurance
      ]
    });
    if (resq?.rows) {
      done(res, resq.rows);
      return resq.rows;
    }
    return errorResponse(res, errorMessages.queryFailed)

  } catch (er) {
    
    return errorResponse(res, errorMessages.queryFailed)
  }
}

// deletes driver by updating db record, set is_deleted column
const deleteDriver = async (req, res) => {

  const {
    driver_id
  } = req.body

  try {
    const resq = await pool.query({
      text: queryDeleteDriver,
      values: [driver_id]
    });
    if (resq?.rows) {
      done(res, resq.rows);
      return resq.rows;
    } return errorResponse(res, errorMessages.queryFailed)
  } catch (er) {
    
    return errorResponse(res, errorMessages.queryFailed)

  }
}

module.exports = {
  getAllDrivers,
  makeDriver,
  deleteDriver
}
