// order queries
const queryAssignedOrders = `
select * from driver_order 
JOIN orders 
ON driver_order.order_id=orders.id 
WHERE NOT EXISTS (
  select * from drivers 
  where id=driver_id
  );`

const queryMakeOrder = `
INSERT INTO orders (
  cost_cents, 
  revenue_cents, 
  start_time, 
  end_time, 
  description,
  customer_id,
  supplier_id,
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
  ) RETURNING *;
`

// driver queries
const queryAllDrivers = `
SELECT * FROM drivers;`;

const queryMakeDriver = `
INSERT INTO drivers (
  driver_fname, 
  driver_lname, 
  vehicle_make, 
  vehicle_model, 
  vehicle_year
  ) VALUES (
    $1,
    $2,
    $3,
    $4,
    $5
  ) RETURNING *;`;

// supplier queries
const queryAllSuppliers = `
SELECT * FROM suppliers;`;

const queryMakeSupplier = (params = {}) => {
  let ph1, ph2 = Symbol('default');

  if (params.fname)
    ph1 = Symbol('$1');
  if (params.lname) {
    if (params.fname)
      ph2 = Symbol('$2');
    else ph2 = Symbol('$1');
  }

  return `
  INSERT INTO suppliers (
    supp_fname, 
    supp_lname, 
    ) VALUES (
      ${ph1},
      ${ph2},
  ) RETURNING *;`;

}

// customer queries
const queryAllCustomers = `
SELECT * FROM customers;`;

const queryMakeCustomer = (params = {}) => {
  let ph1, ph2 = Symbol('default');

  if (params.fname)
    ph1 = Symbol('$1');
  if (params.lname) {
    if (params.fname)
      ph2 = Symbol('$2');
    else ph2 = Symbol('$1');
  }

  return `
  INSERT INTO customers (
    cust_fname, 
    cust_lname, 
    ) VALUES (
      ${ph1},
      ${ph2},
  ) RETURNING *;`;

}

// address queries

const queryAllAddresses = `
SELECT * FROM addresses;`;

const queryMakeAddress = (params = {}) => {
  let ph1, ph2 = Symbol('null');

  if (params.supplier_id)
    ph1 = Symbol('$6');
  if (params.lname) {
    if (params.supplier_id)
      ph2 = Symbol('$7');
    else ph2 = Symbol('$6');
  }

  return `
  INSERT INTO addresses (
    address, 
    city,
    state,
    postal,
    country,
    supplier_id,
    customer_id
    ) VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      ${ph1},
      ${ph2}
  ) RETURNING *;`;

}

module.exports = {
  queryAssignedOrders,
  queryAllDrivers,
  queryMakeDriver,
  queryMakeOrder,
  queryAllSuppliers,
  queryMakeSupplier,
  queryAllCustomers,
  queryMakeCustomer,
  queryAllAddresses,
  queryMakeAddress
};