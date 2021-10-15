import {useState, useEffect} from 'react';
import axios, {GET_UNASSIGNED} from 'ax';

const init = {
  loading: false,
  list: [],

}

const UnassignedOrderList = () => {

  const [unassignedOrders, setUnassignedOrders] = useState(init)
  const fetchUnassignedOrder = async () => {
    
    try {
      const res = await axios(GET_UNASSIGNED);
      console.log(res);
      console.log();
    } catch(er) {
      console.error(er);
    }
  }
  
  useEffect(()=> {
    
  }, [])

}
export default UnassignedOrderList;