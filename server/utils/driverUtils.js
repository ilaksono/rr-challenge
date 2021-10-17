const { pool } = require('./pool')
const { done, errorResponse } = require('./globalSettings');
const { queryAllDrivers,
  queryMakeDriver } = require('./sqlQueries');
const errorMessages = require('./errorMessages');

const getAllDrivers = async (req, res) => {
  try {
    const resq = await pool.query({
      text: queryAllDrivers
    });
    if (resq?.rows)
      return done(res, resq.rows);
    return errorResponse(res, errorMessages.queryFailed)
  } catch (er) {
    console.error(er);
    return errorResponse(res, errorMessages.queryFailed)

  }
}

const makeDriver = async (req, res) => {
  try {
    const {
      fname,
      lname,
      make,
      model,
      year
    } = req.body
    console.log(fname);
    if(!fname) {
      console.log('no fname')
      return errorResponse(res, 'Please add a driver name');
    }
    const resq = await pool.query({
      text: queryMakeDriver,
      values: [fname, lname, make, model, Number(year)]
    });
    if (resq?.rows)
      return done(res, resq.rows);
    return errorResponse(res, errorMessages.queryFailed)

  } catch (er) {
    console.error(er);
    return errorResponse(res, errorMessages.queryFailed)


  }
}

module.exports = {
  getAllDrivers,
  makeDriver
}
