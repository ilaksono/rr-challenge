const { pool } = require('../utils/pool');

const seedOrders = async () => {
  const exampleOrders = [
    {
      driverFname: 'Steve',
      revenue: 420000,
      cost: 10000,
      description: 'Construction Materials',
      start_time: '2020-10-10 09:30:00',
      end_time: '2020-10-11 13:30:00'
    },
    {
      driverFname: 'Steve',
      revenue: 394845,
      cost: 7138,
      description: 'Construction Materials',
      start_time: '2021-10-10 09:30:00',
      end_time: '2021-10-11 13:30:00'

    }, {
      driverFname: 'Steve',
      revenue: 195052,
      cost: 26388,
      description: 'Wood and Lumber',
      start_time: '2021-10-12 09:30:00',
      end_time: '2021-10-13 13:30:00'

    }, {
      driverFname: 'Steve',
      revenue: 499145,
      cost: 11698,
      description: 'Wood and Lumber',
      start_time: '2021-10-14 09:30:00',
      end_time: '2021-10-15 13:30:00'
    }, {
      driverFname: 'Chris',
      revenue: 673972,
      cost: 27917,
      description: 'Meat',
      start_time: '2020-10-10 09:30:00',
      end_time: '2020-10-11 13:30:00'
    }, {
      driverFname: 'Chris',
      revenue: 361808,
      cost: 53791,
      description: 'Meat',
      start_time: '2020-10-12 09:30:00',
      end_time: '2020-10-13 13:30:00'

    }, {
      driverFname: 'Chris',
      revenue: 534591,
      cost: 42069,
      description: 'Fresh Produce',
      start_time: '2021-04-20 04:20:00',
      end_time: '2021-04-20 16:20:00'

    }, {
      driverFname: 'Chris',
      revenue: 742978,
      cost: 17113,
      description: 'Farm Supplies',
      start_time: '2021-10-10 09:30:00',
      end_time: '2021-10-10 13:30:00'

    }, {
      driverFname: 'Chris',
      revenue: 723198,
      cost: 31038,
      description: 'Cheetos',
      start_time: '2021-10-11 09:30:00',
      end_time: '2021-10-12 13:30:00'
    }, {
      driverFname: 'Alex',
      revenue: 420000,
      cost: 10000,
      description: 'Rose Rocket Swag Shirts',
      start_time: '2020-10-14 09:30:00',
      end_time: '2020-10-14 13:30:00'
    },
  ];

  try {
    for (const order of exampleOrders) {
      const qsDriver = `
      SELECT * FROM drivers WHERE driver_fname=$1::text
      `;
      const qp = [order.driverFname];
      const qsCustomerAddress = `
      SELECT * FROM addresses
      WHERE customer_id IS NOT NULL;`;
      const qsSupplierAddress = `
      SELECT * FROM addresses
      WHERE supplier_id IS NOT NULL;
      `;

      const resDriver = await pool.query({
        text: qsDriver,
        values: qp
      });

      const driverId = resDriver.rows[0].id;
      const resCustomer = await pool.query({
        text: qsCustomerAddress,
        // values: []
      });
      const resSupplier = await pool.query({
        text: qsSupplierAddress,
        // values: []
      });

      const customerId = resCustomer.rows[0].id;
      const supplierId = resSupplier.rows[0].id;

      const qsOrder = `
      INSERT INTO orders (
        start_time, 
        end_time, 
        cost_cents,
        description,
        revenue_cents,
        destination_address_id,
        source_address_id,
        driver_id
        ) VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8
        ) 
        RETURNING *;`;
      const qpOrder = [
        order.start_time,
        order.end_time,
        order.cost,
        order.description,
        order.revenue,
        customerId,
        supplierId,
        driverId
      ];
      console.log(qpOrder);
      const resOrder = await pool.query({ text: qsOrder, values: qpOrder });
      const orderId = resOrder.rows[0]?.id;

      // const qsDriverOrder = `
      //   INSERT INTO driver_order (
      //     driver_id,
      //     order_id
      //   ) VALUES (  
      //     $1,
      //     $2
      //   ) RETURNING *;`;
      // const qpDriverOrder = [
      //   driverId,
      //   orderId
      // ];
      // const resDriverOrder = await pool.query({text: qsDriverOrder, values: qpDriverOrder});
      console.log(orderId);

    }
  } catch (er) {
    throw new Error(er.message);
  }
}

const seedSupplierCustomerAddresses = async () => {

  try {

    const qsCustomer = `
  SELECT * FROM customers;`;
    const customerRows = await pool.query({
      text: qsCustomer
    });
    const customerId = customerRows.rows[0].id

    const qsSupplier = `
  SELECT * FROM suppliers;`;
    const supplierRows = await pool.query({
      text: qsSupplier
    });
    const supplierId = supplierRows.rows[0].id

    for (const { id } of supplierRows.rows) {

      const qsAddressSupplier = `
    INSERT INTO addresses (
      supplier_id,
      address,
      city,
      state,
      postal,
      country
      ) VALUES (
        $1,
        '${id * 100} Rain st.',
        'Toronto',
        'Ontario',
        'D4F 2G3',
        'Canada'
        );`;


      const addressRowsB = await pool.query({
        text: qsAddressSupplier,
        values: [id]
      });

      console.log(addressRowsB)
    }

    for (const { id } of customerRows.rows) {

      const qsAddressCustomer = `
        INSERT INTO addresses (
          customer_id,
          address,
          city,
          state,
          postal,
          country
        ) VALUES (
          $1,
          '${id * 100} Main st.',
          'Barrie',
          'Ontario',
          'A1B 2C3',
          'Canada'
        );`;
      const addressRowsA = await pool.query({
        text: qsAddressCustomer,
        values: [id]
      });
      console.log(addressRowsA);
    }
  } catch (er) {
    throw new Error(er.message)
  }

}
module.exports = {
  seedOrders,
  seedSupplierCustomerAddresses
}