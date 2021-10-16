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
  }
}

const makeCustomer = async (req, res) => {
  try {
    const {
      fname, 
      lname
    } = req.body
    console.log(fname);
    if(!fname) {
      console.log('no fname')
      return errorResponse(res, 'Please add a driver name');
    }
    const resq = await pool.query({
      text: queryMakeCustomer({fname, lname}),
      values: [fname, lname].filter(each => each)
    });
    if (resq?.rows)
      return done(res, resq.rows);
    return errorResponse(res, errorMessages.queryFailed)

  } catch (er) {
    console.error(er);

  }
}

module.exports = {
  getAllCustomers,
  makeCustomer
}
