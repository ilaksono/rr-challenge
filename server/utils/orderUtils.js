const { pool } = require('./pool')
const { done, errorResponse } = require('./globalSettings');
const { queryUnassignedOrders,
  queryMakeOrder,
  queryUpdateTable,
queryAssignedOrders } = require('./sqlQueries');
const errorMessages = require('./errorMessages');

const getUnassignedOrders = async (req, res) => {
  try {
    const resq = await pool.query({
      text: queryUnassignedOrders
    });
    if (resq?.rows)
      return done(res, resq.rows);
    return errorResponse(res, errorMessages.failedUnassignedOrders)
  } catch (er) {
    console.error(er);
    return errorResponse(res, errorMessages.queryFailed)

  }
}
const getAssignedOrders = async (req, res) => {
  try {
    const resq = await pool.query({
      text: queryAssignedOrders
    });
    if (resq?.rows)
      return done(res, resq.rows);
    return errorResponse(res, errorMessages.failedUnassignedOrders)
  } catch (er) {
    console.error(er);
    return errorResponse(res, errorMessages.queryFailed)

  }
}

const makeOrder = async (req, res) => {
  const {
    cost,
    revenue,
    driverId,
    source_address_id,
    destination_address_id,
    resSupplierAddressId,
    resCustomerAddressId,
    end_time,
    start_time,
    description
  } = req.body;
  if (!description)
    return errorResponse(res, "Please add a description");
  const values = [
    cost * 100,
    revenue * 100,
    start_time,
    end_time,
    description,
    destination_address_id || resCustomerAddressId,
    source_address_id || resSupplierAddressId,
  ];
  if(driverId)
    values.push(driverId);
  console.log(values);
    try {
    const resq = await pool.query({
      text: queryMakeOrder({driverId}),
      values
    });
    if (resq?.rows)
      return done(res, resq.rows);
    return errorResponse(res, errorMessages.queryFailed)
  } catch (er) {
    console.error(er);
    return errorResponse(res, errorMessages.queryFailed)

  }
}

const updateOrder = async (req, res) => {
  const {
    description,
    driver_id,
    cost_cents,
    revenue_cents,
    source_address_id,
    destination_address_id,
    start_time,
    end_time
  } = req.body;
  
  const params = Object.entries({
    description,
    driver_id,
    cost_cents,
    revenue_cents,
    source_address_id,
    destination_address_id,
    start_time,
    end_time
  }).filter(([key, value]) => value)
  .reduce((acc, each) => {
    acc[each[0]] = each[1];
    return acc;
  }, {});

  console.log(params);

  try {
    const resq = await pool.query({
      text: queryUpdateTable(params, 'orders')
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
  getUnassignedOrders,
  makeOrder,
  getAssignedOrders,
  updateOrder
}
