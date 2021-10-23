const { pool } = require('./pool')
const { done, errorResponse } = require('./globalSettings');
const { queryMakeSupplier,
  queryAllSuppliers } = require('./sqlQueries');
const errorMessages = require('./errorMessages');

// get route method for fetching suppliersusing 'pg.Pool'
// call done(res, data) to send response
const getAllSuppliers = async (req, res) => {
  try {
    const resq = await pool.query({
      text: queryAllSuppliers
    });
    if (resq?.rows)
      return done(res, resq.rows);
    return errorResponse(res, errorMessages.queryFailed)
  } catch (er) {

    return errorResponse(res, errorMessages.queryFailed)

  }
}

// create supplier
const makeSupplier = async (req, res) => {
  try {
    const {
      supp_fname,
      supp_lname
    } = req.body
    const resq = await pool.query({
      text: queryMakeSupplier,
      values: [supp_fname || 'Example', supp_lname || 'Supplier']
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
  getAllSuppliers,
  makeSupplier
}
