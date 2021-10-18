// use express and add controllers + routes
const app = require('express')();
// const app = require('./middleware')(express);
const cors = require('cors');
const bodyParser = require('body-parser');

const {
  ordersController,
  driversController,
  addressesController,
  customersController,
  suppliersController
} = require('./controllers');

const { seedOrders, seedSupplierCustomerAddresses } = require('./db/seeds');

module.exports = ({
  broadcastUpdateOrder, 
  broadcastUpdateDriver,
  broadcastUpdateList}) => {

  app.use(cors());
  app.use(bodyParser.json());
  
  app.get('/api/orders', async (req, res) => {
    await ordersController(req, res, broadcastUpdateOrder);
  })
  app.post('/api/orders', async (req, res) => {
    await ordersController(req, res,broadcastUpdateOrder);
  })
  // uses put for delete routes
  // because delete request bodies are stripped in http
  app.put('/api/orders', async (req, res) => {
    await ordersController(req, res, broadcastUpdateOrder);
  })
  
  app.get('/api/drivers', async (req, res) => {
    await driversController(req, res, broadcastUpdateDriver);
  })
  app.post('/api/drivers', async (req, res) => {
    await driversController(req, res, broadcastUpdateDriver);
  })
  app.put('/api/drivers', async (req, res) => {
    await driversController(req, res, broadcastUpdateDriver);
  })
  app.get('/api/suppliers', async (req, res) => {
    await suppliersController(req, res, broadcastUpdateList);
  })
  app.post('/api/suppliers', async (req, res) => {
    await suppliersController(req, res, broadcastUpdateList);
  })
  app.get('/api/customers', async (req, res) => {
    await customersController(req, res, broadcastUpdateList);
  })
  app.post('/api/customers', async (req, res) => {
    await customersController(req, res, broadcastUpdateList);
  })
  app.get('/api/addresses', async (req, res) => {
    await addressesController(req, res, broadcastUpdateList);
  })
  app.post('/api/addresses', async (req, res) => {
    await addressesController(req, res, broadcastUpdateList);
  })
  
  const {
    PORT = 8000
  } = process.env
  
  app.get('/seed', async (req, res) => {
    try {
      await seedSupplierCustomerAddresses();
      await seedOrders();
      res.send('seed successful');
    } catch (er) {
      console.error(er);
      res.send(er.message);
    }
  });
  return app
}

// Port and listen 
// app.listen(PORT, () => console.log('Listening on: ', PORT));

// module.exports = app;