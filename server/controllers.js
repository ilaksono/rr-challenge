const orderUtils = require('./utils/orderUtils');
const driverUtils = require('./utils/driverUtils');
const supplierUtils = require('./utils/supplierUtils');
const customerUtils = require('./utils/customerUtils');
const addressUtils = require('./utils/addressUtils');
const { errorResponse } = require('./utils/globalSettings');

const ordersController = async (req, res) => {
  const {
    type
  } = req.query;

  switch (type) {
    case 'unassigned':
      await orderUtils
        .getUnassignedOrders(req, res);
      break;
    case 'create':
      await orderUtils
        .makeOrder(req, res);
      break;
    case 'assigned':
      await orderUtils
        .getAssignedOrders(req, res);
      break;
    case 'update':
      await orderUtils
        .updateOrder(req, res);
      break;

    default:
      return errorResponse(res, 'Invalid order request type')
  }
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