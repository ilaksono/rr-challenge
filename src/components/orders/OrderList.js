import OrderListItem from './OrderListItem';

const OrderList = ({ list = [] }) => {

 
  const parsedList = list.map(order =>
    <OrderListItem
    key={order.id}
      {...order}
    />
  )
  return (
    <div className='order-list'>
      {parsedList}

    </div>
  )
}
export default OrderList;