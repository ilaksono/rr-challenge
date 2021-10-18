// Express Server API

require('dotenv').config();

// app is created in ./app
const app = require('./app');
const { seedOrders, seedSupplierCustomerAddresses } = require('./db/seeds');

// seeder route
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