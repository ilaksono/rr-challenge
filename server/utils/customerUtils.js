const { pool } = require('./pool')
const { done, errorResponse } = require('./globalSettings');
const { queryMakeCustomer,
  queryAllCustomers } = require('./sqlQueries');
const errorMessages = require('./errorMessages');


// get route method for fetching customers using 'pg.Pool'
// call done(res, data) to send response
const getAllCustomers = async (req, res) => {
  try {
    const resq = await pool.query({
      text: queryAllCustomers
    });
    if (resq?.rows)
      return done(res, resq.rows);
    return errorResponse(res, errorMessages.queryFailed)
  } catch (er) {

    return errorResponse(res, errorMessages.queryFailed)

  }
}

// create customer
const makeCustomer = async (req, res) => {
  try {
    const {
      cust_fname,
      cust_lname
    } = req.body
    const resq = await pool.query({
      text: queryMakeCustomer,
      values: [cust_fname || 'Example', cust_lname || 'Customer']
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

module.exports = {
  getAllCustomers,
  makeCustomer
}
