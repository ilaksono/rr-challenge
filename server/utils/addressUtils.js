const { pool } = require('./pool')
const { done, errorResponse } = require('./globalSettings');
const { queryMakeAddress,
  queryAllAddresses } = require('./sqlQueries');
const errorMessages = require('./errorMessages');

// get route method for fetching addresses using 'pg.Pool'
// call done(res, data) to send response
const getAllAddresses = async (req, res) => {
  try {
    const resq = await pool.query({
      text: queryAllAddresses
    });
    if (resq?.rows)
      return done(res, resq.rows);
    return errorResponse(res, errorMessages.queryFailed)
  } catch (er) {
    
    return errorResponse(res, errorMessages.queryFailed)

  }
}

// create address
const makeAddress = async (req, res) => {
  try {
    const {
      address,
      city,
      state,
      country,
      postal,
      customer_id,
      supplier_id
    } = req.body
    const values = [
      address,
      city,
      state,
      postal,
      country,
      supplier_id || customer_id,
    ]
    const resq = await pool.query({
      text: queryMakeAddress({ customer_id, supplier_id }),
      values
    });
    if (resq?.rows) {
      done(res, resq.rows);
      return resq.rows; 
    }return errorResponse(res, errorMessages.queryFailed)

  } catch (er) {
    
    return errorResponse(res, errorMessages.queryFailed)
  }
}

module.exports = {
  getAllAddresses,
  makeAddress
}
