const { pool } = require('./pool')
const { done, errorResponse } = require('./globalSettings');
const { queryAssignedOrders } = require('./sqlQueries');
const errorMessages = require('./errorMessages');

const getUnassignedOrders = async (req, res) => {
  try {
    const resq = await pool.query({
      text: queryAssignedOrders
    });
    if (resq?.rows)
      return done(res, resq.rows);
    return errorResponse(res, errorMessages.failedUnassignedOrders)
  } catch (er) {
    console.error(er);
  }
}

const makeOrder = async (req, res) => {
  const {
    cost,
    revenue,
    driverId,
    supplierId,
    customerId,
    end_time,
    start_time,
    description
  } = req.body;
  if (!description)
    return errorResponse(res, "Please add a description");
  try {
    const resq = await pool.query({
      text: queryAssignedOrders,
      values: [
        cost * 100,
        revenue * 100,
        start_time,
        end_time,
        description,
        customerId,
        supplierId,
        driverId
      ]
    });
    if (resq?.rows)
      return done(res, resq.rows);
    return errorResponse(res, errorMessages.queryFailed)
  } catch (er) {
    console.error(er);
  }
}

module.exports = {
  getUnassignedOrders,
  makeOrder
}
