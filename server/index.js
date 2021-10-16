// Server is used as an API - transferring data from 

require('dotenv').config();
const app = require('express')();
const db = require('./utils/db');
const { pool } = require('./utils/pool');
const { seedOrders } = require('./db/seeds');
const orderUtils = require('./utils/orderUtils');
const driverUtils = require('./utils/driverUtils');
const supplierUtils = require('./utils/supplierUtils');
const customerUtils = require('./utils/customerUtils');
const addressUtils = require('./utils/addressUtils');

const { done, errorResponse } = require('./utils/globalSettings');
const cors = require('cors');
const bodyParser = require('body-parser');

const {
  PORT
} = process.env

app.use(cors());
app.use(bodyParser.json());


const ordersController = async (req, res) => {
  const {
    type
  } = req.query;

  switch (type) {
    case 'unassigned':
      await orderUtils.getUnassignedOrders(req, res);
      break;
    case 'create':
      await orderUtils.makeOrder(req, res);
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
      await supplierUtils.getAllSuppliers(req, res);
      break;

    case 'create':
      await supplierUtils.makeSupplier(req, res);
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
      await customerUtils.getAllCustomers(req, res);
      break;
    case 'create':
      await customerUtils.makeCustomer(req, res);
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
      await driverUtils.getAllDrivers(req, res);
      break;
    case 'create':
      await driverUtils.makeDriver(req, res);
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
      await addressUtils.getAllAddresses(req, res);
      break;
    case 'create':
      await addressUtils.makeAddress(req, res);
      break;
    default:
      return errorResponse(res, 'Invalid driver request type')
  }
}

app.get('/api/orders', async (req, res) => {
  await ordersController(req, res);
})
app.post('/api/orders', async (req, res) => {
  await ordersController(req, res);
})
app.post('/api/drivers', async (req, res) => {
  await driversController(req, res);
})
app.get('/api/drivers', async (req, res) => {
  await driversController(req, res);
})
app.get('/api/suppliers', async (req, res) => {
  await suppliersController(req, res);
})
app.post('/api/suppliers', async (req, res) => {
  await suppliersController(req, res);
})
app.get('/api/customers', async (req, res) => {
  await customersController(req, res);
})
app.post('/api/customers', async (req, res) => {
  await customersController(req, res);
})
app.get('/api/addresses', async (req, res) => {
  await addressesController(req, res);
})
app.post('/api/addresses', async (req, res) => {
  await addressesController(req, res);
})


// Port to listen 
app.listen(PORT, () => console.log('Listening on: ', PORT));

// app.get('/', async (req, res) => {
//   res.send('hi');
// });


// app.get('/test', async (req, res) => {
//   try {
//     const qs = `
//       SELECT * FROM suppliers;
//     `;
//     const qp = [];
//     const rez = await pool.query(qs, qp);
//     console.log(rez.rows)
//   } catch(er) {
//     console.error(er);
//   }

// });
app.get('/test2', async (req, res) => {
  try {
    await seedOrders();
    res.send('it worked');
  } catch (er) {
    console.error(er);
  }
});