const { pool } = require('./pool')
const { done, errorResponse } = require('./globalSettings');
const { queryMakeSupplier,
  queryAllSuppliers } = require('./sqlQueries');
const errorMessages = require('./errorMessages');

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

const makeSupplier = async (req, res) => {
  try {
    const {
      supp_fname,
      supp_lname
    } = req.body
    // if(!supp_fname) {
    //   console.log('no supp_fname')
    //   return errorResponse(res, 'Please add a supplier name');
    // }
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
