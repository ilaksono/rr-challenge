const { pool } = require('./pool')
const { done, errorResponse } = require('./globalSettings');
const { queryMakeCustomer,
  queryAllCustomers } = require('./sqlQueries');
const errorMessages = require('./errorMessages');

const getAllCustomers = async (req, res) => {
  try {
    const resq = await pool.query({
      text: queryAllCustomers
    });
    if (resq?.rows)
      return done(res, resq.rows);
    return errorResponse(res, errorMessages.queryFailed)
  } catch (er) {
    console.error(er);
    return errorResponse(res, errorMessages.queryFailed)

  }
}

const makeCustomer = async (req, res) => {
  try {
    const {
      cust_fname, 
      cust_lname
    } = req.body
    console.log(cust_fname);
    // if(!cust_fname) {
    //   console.log('no cust_fname')
    //   return errorResponse(res, 'Please add a driver name');
    // }
    const resq = await pool.query({
      text: queryMakeCustomer,
      values: [cust_fname || 'Example', cust_lname || 'Customer']
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
  getAllCustomers,
  makeCustomer
}
