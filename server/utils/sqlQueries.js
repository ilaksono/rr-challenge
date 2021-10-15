const queryAssignedOrders = `
select * from driver_order 
JOIN orders 
ON driver_order.order_id=orders.id 
WHERE NOT EXISTS (
  select * from drivers 
  where id=driver_id
  );`

  module.exports = {
    queryAssignedOrders
  };