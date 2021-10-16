import OrderListItem from './OrderListItem';

const OrderList = ({ list = [] }) => {

  if (!list.length)
    return (

      <div
        style={{
          position: 'relative'
        }}
      >
        <OrderListItem />
      </div>
    )

  const parsedList = list.map(order =>
    <OrderListItem
      {...order}
    />
  )
  return parsedList;
}
export default OrderList;