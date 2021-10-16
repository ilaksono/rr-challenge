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
    console.error(er);
  }
}

const makeSupplier = async (req, res) => {
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
      text: queryMakeSupplier({fname, lname}),
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
  getAllSuppliers,
  makeSupplier
}
