import OrderListItem from './OrderListItem';
import useSortMode from 'hooks/useSortMode';
import SortOrders from './SortOrders';
const OrderList = ({ list = [] }) => {
  const {
    sort,
    handleSort,
    handleChangeSort
  } = useSortMode();

  const determineList = () => {
    return handleSort(list);
  }
 
  const parsedList = determineList().map(order =>
    <OrderListItem
    key={order.id}
      {...order}
    />
  )
  return (
    <>
    <SortOrders 
    length={list.length}
    sort={sort}
    handleChange={handleChangeSort}
    />

    <div className='view-header rr-flex-row'>
        <div>
          Source to Destination
        </div>
        <div>Revenue | Cost</div>
      </div>
    <div className='order-list'>
      {parsedList}

    </div>
    </>
  )
}
export default OrderList;