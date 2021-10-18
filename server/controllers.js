const orderUtils = require('./utils/orderUtils');
const driverUtils = require('./utils/driverUtils');
const supplierUtils = require('./utils/supplierUtils');
const customerUtils = require('./utils/customerUtils');
const addressUtils = require('./utils/addressUtils');
const { errorResponse } = require('./utils/globalSettings');
// const livesocket = require('./livesocket')

const ordersController = async (req, res, broadcastUpdateOrder) => {
  const {
    type
  } = req.query;
  let response = [];
  switch (type) {
    case 'unassigned':
      await orderUtils
        .getUnassignedOrders(req, res);
      return;
    case 'assigned':
      await orderUtils
        .getAssignedOrders(req, res);
      return;
    case 'create':
      response = await orderUtils
        .makeOrder(req, res);
      break;
    case 'update':
      response = await orderUtils
        .updateOrder(req, res);
      break;
    case 'unassignOrder':
      response = await orderUtils
        .setOrderUnassigned(req, res)
      break;
    case 'delete':
      response = await orderUtils
        .deleteOrder(req, res)
      break;
    case 'unassignOrders':
      response = await orderUtils
        .unassignDriverOrders(req, res)
      break;

    default:
      return errorResponse(res, 'Invalid order request type')
  }
  broadcastUpdateOrder(response, type);

}
const suppliersController = async (req, res) => {
  const {
    type
  } = req.query;

  switch (type) {
    case 'all':
      await supplierUtils
        .getAllSuppliers(req, res);
      break;

    case 'create':
      await supplierUtils
        .makeSupplier(req, res);
      break;

    default:
      return errorResponse(res, 'Invalid order request type')
  }
}
const customersController = async (req, res) => {
  const {
    type
  } = req.query;

  switch (type) {
    case 'all':
      await customerUtils
        .getAllCustomers(req, res);
      break;
    case 'create':
      await customerUtils
        .makeCustomer(req, res);
      break;

    default:
      return errorResponse(res, 'Invalid order request type')
  }
}

const driversController = async (req, res) => {
  const {
    type
  } = req.query;

  switch (type) {
    case 'all':
      await driverUtils
        .getAllDrivers(req, res);
      break;
    case 'create':
      await driverUtils
        .makeDriver(req, res);
      break;
    case 'delete':
      await driverUtils
        .deleteDriver(req, res);
      break;
    default:
      return errorResponse(res, 'Invalid driver request type')
  }
}
const addressesController = async (req, res) => {
  const {
    type
  } = req.query;

  switch (type) {
    case 'all':
      await addressUtils
        .getAllAddresses(req, res);
      break;
    case 'create':
      await addressUtils
        .makeAddress(req, res);
      break;
    default:
      return errorResponse(res, 'Invalid driver request type')
  }
}

module.exports = {
  ordersController,
  driversController,
  addressesController,
  customersController,
  suppliersController
}