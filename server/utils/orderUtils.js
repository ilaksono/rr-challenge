const pool = require('./pool')
const { done, errorResponse } = require('./utils/globalSettings');
const { queryAssignedOrders } = require('./sqlQueries');
const errorMessages = require('./errorMessages');
module.exports = () => {

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

  return {
    getUnassignedOrders
  }
}