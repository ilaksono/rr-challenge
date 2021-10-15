// Server is used as an API - transferring data from 

require('dotenv').config();
const app = require('express')();
const db = require('./utils/db');
const { pool } = require('./utils/pool');
const { seedOrders } = require('./db/seeds');
const orderUtils = require('./utils/orderUtils')();
const { done, errorResponse } = require('./utils/globalSettings');
const {
  PORT
} = process.env


const ordersController = async (req, res) => {
  const {
    type
  } = req.query;

  switch (type) {
    case 'unassigned':
      await orderUtils.getUnassignedOrder(req, res);
      break;

    default:
      return errorResponse(res, 'Invalid order requesst type')
  }
}

app.get('/api/orders', async (req, res) => {
  await ordersController(req, res);
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
// app.get('/test2', async (req, res) => {
//   try {
//     await seedOrders();
//     res.send('it worked');
//   } catch(er) {
//     console.error(er);
//   }
// });