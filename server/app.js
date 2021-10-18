// use express and add controllers + routes
const express = require('express')();
const app = require('./middleware')(express);
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

// uses put for delete routes
// because delete request bodies are stripped in http
app.put('/api/orders', async (req, res) => {
  await ordersController(req, res);
})

app.get('/api/drivers', async (req, res) => {
  await driversController(req, res);
})
app.post('/api/drivers', async (req, res) => {
  await driversController(req, res);
})
app.put('/api/drivers', async (req, res) => {
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
  PORT = 8000
} = process.env

// Port and listen 
app.listen(PORT, () => console.log('Listening on: ', PORT));

module.exports = app;