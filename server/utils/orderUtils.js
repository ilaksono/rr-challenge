const { pool } = require('./pool')
const { done, errorResponse } = require('./globalSettings');
const { queryUnassignedOrders,
  queryMakeOrder,
  queryUpdateTable,
  queryUnassignOrder,
  queryAssignedOrders,
  queryDeleteOrder,
  queryUnassignDriverOrders,
  queryMakeOrderList,
  queryUpdateOrderList
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
    Math.round(cost * 100),
    Math.round(revenue * 100),
    start_time,
    end_time,
    description,
    resCustomerAddressId || destination_address_id,
    resSupplierAddressId || source_address_id,
  ];
  if (driverId)
    values.push(driverId);
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
    cost_cents: Math.round(cost_cents),
    revenue_cents: Math.round(revenue_cents),
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

    return errorResponse(res, errorMessages.queryFailed)
  }
}

const unassignDriverOrders = async (req, res) => {

  const {
    driver_id
  } = req.body;

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
    return errorResponse(res, errorMessages.queryFailed)
  }
}

const updateOrderList = async (req, res) => {
  try {
    const {
      list
    } = req.body;
    let makeValues = [];
    let updateValues = [];
    for (const order of list) {
      if (order.order_id) {
        updateValues.push([
          order.order_id,
          order.cost,
          order.revenue,
          order.order_start_time,
          order.order_end_time,
          order.order_description,
          order.destination_address_id,
          order.source_address_id,
          order.driver_id,
        ]);
      } else {
        makeValues.push([
          order.cost,
          order.revenue,
          order.order_start_time,
          order.order_end_time,
          order.order_description,
          order.destination_address_id,
          order.source_address_id,
          order.driver_id
        ]);
      }
    }
    // const makeValues = list.map(order =>
    //   [
    //     order.cost,
    //     order.revenue,
    //     order.order_start_time,
    //     order.order_end_time,
    //     order.description,
    //     order.destination_address_id,
    //     order.source_address_id,
    //     order.driver_id
    //   ]
    // ).flat()
    const makeText = queryMakeOrderList(makeValues);
    const updateText = queryUpdateOrderList(updateValues);
    makeValues = makeValues.flat();
    updateValues = updateValues.flat();

    let resq, resUpdate;
    if (makeValues.length)
      resq = await pool.query({
        text: makeText,
        values: makeValues
      })
    if (updateValues.length)
      resUpdate = await pool.query({
        text: updateText,
        values: updateValues
      })
    const concatArr = (resq?.rows || []).concat(resUpdate?.rows || []);
    if (concatArr?.length) {
      done(res, concatArr);
      return concatArr
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
  unassignDriverOrders,
  updateOrderList
}
