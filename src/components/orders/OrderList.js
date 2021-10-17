import OrderListItem from './OrderListItem';

const OrderList = ({ list = [] }) => {

 
  const parsedList = list.map(order =>
    <OrderListItem
    key={order.id}
      {...order}
    />
  )
  return parsedList;
}
export default OrderList;