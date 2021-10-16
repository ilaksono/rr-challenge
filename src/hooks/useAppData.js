import { useReducer } from 'react';
import axios, {
  GET_UNASSIGNED,
  GET_ALL_DRIVERS,
  GET_ALL_SUPPLIERS,
  GET_ALL_CUSTOMERS,
  GET_ALL_ADDRESSES
} from 'ax';
import { useEffect } from 'react';

const SET_WILD_PROPS = 'SET_PROPERTIES_CUSTOM';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WILD_PROPS: {
      const {
        par,
        child,
        payload
      } = action
      return {
        ...state,
        [par]: {
          ...state[par],
          [child]: payload
        }
      }
    }

    default:
      return state;
  }
}

const init = {
  orders: {

    // unassigned orders
    unassigned: {
      list: [],
    },
    // assigned orders in format {[driver_id]: [Order Model]}
    assigned: {
      list: []
    }
  },
  drivers: {
    list: [],
    hash: {}
  },
  suppliers: {
    list: [],
    hash: {}
  },
  customers: {
    list: [],
    hash: {}
  },
  addresses: {
    list: []
  }
}

const useAppData = () => {

  const [appData, dispatch] = useReducer(reducer, init)

  const {
   drivers,
   orders,
   suppliers,
   customers
  } = appData
  const fetchUnassignedOrders = async () => {

    try {
      const res = await axios(GET_UNASSIGNED);
      // console.log(res);
      if (res && Array.isArray(res)) {
        const data = {
          list: res,
        }
        dispatch({
          type: SET_WILD_PROPS,
          par: 'orders',
          child: 'unassigned',
          data
        })
      }
    } catch (er) {
      console.error(er);
    }
  }

  const addDriverToList = (driver) => {
    const cpy = [driver, ...drivers.list];
    dispatch({ type: SET_WILD_PROPS, par: 'drivers', child: 'list', payload: cpy });
  }

  const fetchDrivers = async () => {
    try {
      const res = await axios(GET_ALL_DRIVERS)
      console.log(res);
      if (res) {

        dispatch({ type: SET_WILD_PROPS, par: 'drivers', child: 'list', payload: res })
      }
    } catch (er) {
      console.error(er);
    }
  }
  const fetchSuppliers = async () => {
    try {
      const res = await axios(GET_ALL_SUPPLIERS)
      console.log(res);
      if (res) {
        dispatch({ type: SET_WILD_PROPS, par: 'suppliers', child: 'list', payload: res })
      }
    } catch (er) {
      console.error(er);
    }
  }
  const fetchCustomers = async () => {
    try {
      const res = await axios(GET_ALL_CUSTOMERS)
      console.log(res);
      if (res) {
        dispatch({ type: SET_WILD_PROPS, par: 'customers', child: 'list', payload: res })
      }
    } catch (er) {
      console.error(er);
    }
  }
  const fetchAddresses = async () => {
    try {
      const res = await axios(GET_ALL_ADDRESSES)
      console.log(res);
      if (res) {
        dispatch({ type: SET_WILD_PROPS, par: 'addresses', child: 'list', payload: res })
      }
    } catch (er) {
      console.error(er);
    }
  }
  const updateDriversHash = () => {
    const payload = drivers.list?.reduce(
      (acc, driver) => {
        acc[driver.id] = driver;
        return acc;
      },
      {}
    )
    dispatch({ type: SET_WILD_PROPS, par: 'drivers', child: 'hash', payload });
  }
  const updateSuppliersHash = () => {
    const payload = suppliers.list?.reduce(
      (acc, supplier) => {
        acc[supplier.id] = supplier;
        return acc;
      },
      {}
    )
    dispatch({ type: SET_WILD_PROPS, par: 'suppliers', child: 'hash', payload });
  }
  const updateCustomersHash = () => {
    const payload = customers.list?.reduce(
      (acc, customer) => {
        acc[customer.id] = customer;
        return acc;
      },
      {}
    )
    dispatch({ type: SET_WILD_PROPS, par: 'customers', child: 'hash', payload });
  }
  useEffect(() => {
    fetchDrivers();
    fetchSuppliers();
    fetchCustomers();
    fetchAddresses();
  }, [])

  useEffect(() => {
    if (drivers.list.length)
      updateDriversHash();
    // eslint-disable-next-line
  }, [drivers.list])
  useEffect(() => {
    if (suppliers.list.length)
      updateSuppliersHash();
    // eslint-disable-next-line
  }, [suppliers.list])
  useEffect(() => {
    if (customers.list.length)
      updateCustomersHash();
    // eslint-disable-next-line
  }, [customers.list])

  return {
    appData,
    fetchUnassignedOrders,
    addDriverToList
  }

}
export default useAppData;