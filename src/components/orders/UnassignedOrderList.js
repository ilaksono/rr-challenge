import { useState, useEffect, useContext } from 'react';
import GeneralSpinner from 'components/general/GeneralSpinner';
import AppContext from 'context/AppContext';
import OrderList from './OrderList';

const init = {
  loading: false,
  list: [],
}

const UnassignedOrderList = () => {

  const [loading, setloading] = useState(false);


  const {
    fetchUnassignedOrders
  } = useContext(AppContext);

  const handleMount = () => {
    setloading(true);
    fetchUnassignedOrders();
    setloading(false);
  }

  useEffect(() => {
    handleMount();

    // eslint-disable-next-line
  }, [])
  return (
    <div>
      {
        loading ?
          <GeneralSpinner />
          : <OrderList />
      }
    </div>
  )

}
export default UnassignedOrderList;