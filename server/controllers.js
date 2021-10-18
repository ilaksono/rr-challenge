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
const suppliersController = async (req, res, broadcastUpdateList) => {
  const {
    type
  } = req.query;
  let response = [];

  switch (type) {
    case 'all':
      await supplierUtils
        .getAllSuppliers(req, res);
      return;

    case 'create':
     response = await supplierUtils
        .makeSupplier(req, res);
      break;

    default:
      return errorResponse(res, 'Invalid order request type')
  }
  broadcastUpdateList(response, type, 'suppliers')
}
const customersController = async (req, res, broadcastUpdateList) => {
  const {
    type
  } = req.query;

  let response = [];

  switch (type) {
    case 'all':
      await customerUtils
        .getAllCustomers(req, res);
      return;
    case 'create':
     response = await customerUtils
        .makeCustomer(req, res);
      break;

    default:
      return errorResponse(res, 'Invalid order request type')
  }
  broadcastUpdateList(response, type, 'customers')
}

const driversController = async (req, res, broadcastUpdateDriver) => {
  const {
    type
  } = req.query;
  let response = [];

  switch (type) {
    case 'all':
      await driverUtils
        .getAllDrivers(req, res);
      return;
    case 'create':
      response = await driverUtils
        .makeDriver(req, res);
      break;
    case 'delete':
      response = await driverUtils
        .deleteDriver(req, res);
      break;
    default:
      return errorResponse(res, 'Invalid driver request type')
  }
  broadcastUpdateDriver(response, type)
}

const addressesController = async (req, res, broadcastUpdateList) => {
  const {
    type
  } = req.query;
  let response = []

  switch (type) {
    case 'all':
      await addressUtils
        .getAllAddresses(req, res);
      return;
    case 'create':
     response =  await addressUtils
        .makeAddress(req, res);
      break;
    default:
      return errorResponse(res, 'Invalid driver request type')
  }
  broadcastUpdateList(response, type, 'addresses')
}

module.exports = {
  ordersController,
  driversController,
  addressesController,
  customersController,
  suppliersController
}