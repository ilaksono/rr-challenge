const { pool } = require('./pool')
const { done, errorResponse } = require('./globalSettings');
const { queryUnassignedOrders,
  queryMakeOrder,
  queryUpdateTable,
  queryUnassignOrder,
  queryAssignedOrders,
  queryDeleteOrder,
  queryUnassignDriverOrders
} = require('./sqlQueries');
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
  if (driverId)
    values.push(driverId);
  console.log(values);
  try {
    const resq = await pool.query({
      text: queryMakeOrder({ driverId }),
      values
    });
    if (resq?.rows) {
      done(res, resq.rows);
      return resq.rows
    } return errorResponse(res, errorMessages.queryFailed)
  } catch (er) {
    console.error(er);
    return errorResponse(res, errorMessages.queryFailed)

  }
}
const setOrderUnassigned = async (req, res) => {

  const {
    order_id
  } = req.body
  try {
    const resq = await pool.query({
      text: queryUnassignOrder,
      values: [order_id]
    });
    if (resq?.rows) {
      done(res, resq.rows);
      return resq.rows
    } return errorResponse(res, errorMessages.queryFailed)
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
    end_time,
    id
  } = req.body;

  const paramsArr = Object.entries({
    description,
    driver_id,
    cost_cents,
    revenue_cents,
    source_address_id,
    destination_address_id,
    start_time,
    end_time
  }).filter(([key, value]) => value)
  if (!paramsArr.length)
    return done(res, []);
  const params = paramsArr
    .reduce((acc, each) => {
      acc[each[0]] = each[1];
      return acc;
    }, {});

  console.log(params);

  try {
    const resq = await pool.query({
      text: queryUpdateTable(params, 'orders'),
      values: Object.values(params).concat(id)
    });
    if (resq?.rows) {
      done(res, resq.rows);
      return resq.rows
    }
    return errorResponse(res, errorMessages.queryFailed)
  } catch (er) {
    console.error(er);
    return errorResponse(res, errorMessages.queryFailed)

  }
}
const deleteOrder = async (req, res) => {
  const {
    order_id
  } = req.body;


  try {
    const resq = await pool.query({
      text: queryDeleteOrder,
      values: [order_id]
    });
    if (resq?.rows) {
      done(res, resq.rows);
      return resq.rows
    } return errorResponse(res, errorMessages.queryFailed)
  } catch (er) {
    console.error(er);
    return errorResponse(res, errorMessages.queryFailed)
  }
}

const unassignDriverOrders = async (req, res) => {

  const {
    driver_id
  } = req.body;

  console.log(driver_id);
  try {
    const resq = await pool.query({
      text: queryUnassignDriverOrders,
      values: [driver_id]
    });
    if (resq?.rows) {
      done(res, resq.rows);
      return resq.rows
    } return errorResponse(res, errorMessages.queryFailed)
  } catch (er) {
    console.error(er);
    return errorResponse(res, errorMessages.queryFailed)
  }
}


module.exports = {
  getUnassignedOrders,
  makeOrder,
  getAssignedOrders,
  updateOrder,
  setOrderUnassigned,
  deleteOrder,
  unassignDriverOrders
}
