const { pool } = require('./pool')
const { done, errorResponse } = require('./globalSettings');
const { queryMakeAddress,
  queryAllAddresses } = require('./sqlQueries');
const errorMessages = require('./errorMessages');

const getAllAddresses = async (req, res) => {
  try {
    const resq = await pool.query({
      text: queryAllAddresses
    });
    if (resq?.rows)
      return done(res, resq.rows);
    return errorResponse(res, errorMessages.queryFailed)
  } catch (er) {
    console.error(er);
  }
}

const makeAddress = async (req, res) => {
  try {
    const {
      fname,
      lname
    } = req.body
    console.log(fname);
    if (!fname) {
      console.log('no fname')
      return errorResponse(res, 'Please add a driver name');
    }
    const resq = await pool.query({
      text: queryMakeAddress({ fname, lname }),
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
  getAllAddresses,
  makeAddress
}
