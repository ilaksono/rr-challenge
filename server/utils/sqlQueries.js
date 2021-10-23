// Module exports the api queries used to SELECT, INSERT, UPDATE 
// the 5 tables in the app: Orders, Suppliers, Drivers, Customers, Addresses 

// queries that work for all tables
const queryUpdateTable = (params = {}, tableName = 'orders') => {

  // [[key, value], ...]
  const paramsArr = Object.keys(params);
  let query = `UPDATE ${tableName} SET `;
  let count = 1;
  for (const key of paramsArr) {
    if (count !== 1)
      query += ',';
    query += ` ${key}=$${count++}`
  }
  query += ` WHERE id=$${count}
  RETURNING *`;

  return query;
}



// order queries
const queryUnassignedOrders = `
select * from orders 
WHERE NOT EXISTS (
  select * from drivers 
  where drivers.id=orders.driver_id
  ) AND is_deleted=false
  ORDER BY id
  ;`

const queryAssignedOrders = `
  select * from orders 
  WHERE EXISTS (
    select * from drivers 
    where drivers.id=orders.driver_id
    ) AND is_deleted=false
    ORDER BY id
    ;
    
    `

const queryMakeOrder = (params = {}) => {

  if (params.driverId)
    return `
INSERT INTO orders (
  cost_cents, 
  revenue_cents, 
  start_time, 
  end_time, 
  description,
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
  ) RETURNING *;`

  return `
  INSERT INTO orders (
    cost_cents, 
    revenue_cents, 
    start_time, 
    end_time, 
    description,
    destination_address_id,
    source_address_id
    ) VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6,
      $7
    ) RETURNING *;`
}

const queryMakeOrderList = (list = []) => {
  if (!list.length)
    return;
  let qs = `
  INSERT INTO orders (
    cost_cents, 
    revenue_cents, 
    start_time, 
    end_time, 
    description,
    destination_address_id,
    source_address_id,
    driver_id
    ) VALUES`;
  for (let i = 0; i < list.length; i++) {
    if (i !== 0) {
      qs += `,`;
    }
    qs += ` ($${i * 8 + 1}, $${i * 8 + 2}, $${i * 8 + 3}, $${i * 8 + 4}, $${i * 8 + 5}, $${i * 8 + 6}, $${i * 8 + 7}, $${i * 8 + 8})`
  }
  qs += ' RETURNING *;'
  return qs;
}
const queryUpdateOrderList = (list = []) => {

  if (!list.length)
    return;

  let qs = `INSERT INTO orders (
    id, 
    cost_cents,
    revenue_cents,
    start_time,
    end_time,
    description,
    destination_address_id,
    source_address_id,
    driver_id    
    ) VALUES`

  for (let i = 0; i < list.length; i++) {
     qs += ` ($${i * 9 + 1}, $${i * 9 + 2}, $${i * 9 + 3}, $${i * 9 + 4}, $${i * 9 + 5}, $${i * 9 + 6}, $${i * 9 + 7}, $${i * 9 + 8}, $${i * 9 + 9})`
    if (i < list.length - 1)
      qs += ',';
  }

  qs += ` ON CONFLICT (id) DO UPDATE 
    SET cost_cents = excluded.cost_cents, 
        revenue_cents = excluded.revenue_cents,
        start_time = excluded.start_time, 
        end_time = excluded.end_time, 
        description = excluded.description, 
        destination_address_id = excluded.destination_address_id, 
        source_address_id = excluded.source_address_id, 
        driver_id = excluded.driver_id,
        created_at = orders.created_at
        RETURNING *;`;

  return qs;

}

const queryUnassignOrder = `
UPDATE orders SET driver_id=null
WHERE id=$1
RETURNING *;
`;

const queryUnassignDriverOrders = `
UPDATE orders SET driver_id=null
WHERE driver_id=$1
RETURNING *;
`

const queryDeleteOrder = `
UPDATE orders SET is_deleted=true
WHERE id=$1
RETURNING *;
`;

// driver queries
const queryAllDrivers = `
SELECT * FROM drivers 
WHERE is_deleted=false
ORDER BY id DESC;`;

const queryMakeDriver = `
INSERT INTO drivers (
  driver_fname, 
  driver_lname, 
  vehicle_make, 
  vehicle_model, 
  vehicle_year,
  driver_insurance
  ) VALUES (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6
  ) RETURNING *;`;

const queryDeleteDriver = `
UPDATE drivers 
SET is_deleted=true
WHERE id=$1
RETURNING *;
`;

// supplier queries
const queryAllSuppliers = `
SELECT * FROM suppliers 
ORDER BY id DESC;`;

const queryMakeSupplier = `
  INSERT INTO suppliers (
    supp_fname, 
    supp_lname
    ) VALUES (
      $1::text,
      $2
  ) RETURNING *;`;



// customer queries
const queryAllCustomers = `
SELECT * FROM customers 
ORDER BY id DESC;`;

const queryMakeCustomer = `
  INSERT INTO customers (
    cust_fname, 
    cust_lname 
    ) VALUES (
      $1::text,
      $2
  ) RETURNING *;`;

// address queries

const queryAllAddresses = `
SELECT * FROM addresses 
ORDER BY id DESC;`;

const queryMakeAddress = (params = {}) => {

  if (params.supplier_id)
    return `
  INSERT INTO addresses (
    address, 
    city,
    state,
    postal,
    country,
    supplier_id
    ) VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6
  ) RETURNING *;`;

  return `
  INSERT INTO addresses (
    address, 
    city,
    state,
    postal,
    country,
    customer_id
    ) VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6
  ) RETURNING *;`;

}

module.exports = {
  queryUnassignedOrders,
  queryAssignedOrders,
  queryMakeOrder,
  queryMakeOrderList,
  queryUnassignOrder,
  queryDeleteOrder,
  queryUnassignDriverOrders,
  queryAllDrivers,
  queryMakeDriver,
  queryDeleteDriver,
  queryAllSuppliers,
  queryMakeSupplier,
  queryAllCustomers,
  queryMakeCustomer,
  queryAllAddresses,
  queryMakeAddress,
  queryUpdateTable,
  queryUpdateOrderList
};