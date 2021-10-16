// order queries
const queryAssignedOrders = `
select * from driver_order 
JOIN orders 
ON driver_order.order_id=orders.id 
WHERE NOT EXISTS (
  select * from drivers 
  where id=driver_id
  );`


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

module.exports = {
  queryAssignedOrders,
  queryAllDrivers,
  queryMakeDriver
};