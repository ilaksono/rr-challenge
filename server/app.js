// use express and 

const app = require('express')();
const {
  ordersController,
  driversController,
  addressesController,
  customersController,
  suppliersController
} = require('./controllers');

app.get('/api/orders', async (req, res) => {
  await ordersController(req, res);
})
app.post('/api/orders', async (req, res) => {
  await ordersController(req, res);
})
app.put('/api/orders', async (req, res) => {
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


const {
  PORT
} = process.env

// Port to listen 
app.listen(PORT, () => console.log('Listening on: ', PORT));

module.exports = app;