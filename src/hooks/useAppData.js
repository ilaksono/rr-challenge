import { useReducer } from 'react';
import axios, {
  GET_UNASSIGNED,
  GET_ALL_DRIVERS,
  GET_ALL_SUPPLIERS,
  GET_ALL_CUSTOMERS,
  GET_ALL_ADDRESSES,
  GET_ASSIGNED_ORDERS
} from 'ax';
import { useEffect } from 'react';

const SET_WILD_PROPS = 'SET_PROPERTIES_CUSTOM';
const UPDATE_ORDERS = 'UPDATE_ORDERS_OBJECT'

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
    case UPDATE_ORDERS: {
      const {
        orders
      } = action;
      return {
        ...state,
        orders
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
    },
    hash: {}
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
    list: [],
    hash: {}
  },
  view: {
    drivers: [1,2]
  }
}

const useAppData = () => {

  const [appData, dispatch] = useReducer(reducer, init)

  const {
    drivers,
    orders,
    suppliers,
    customers,
    addresses,
    view
  } = appData
  const fetchUnassignedOrders = async () => {

    try {
      const res = await axios(GET_UNASSIGNED);
      // ;
      if (res && Array.isArray(res)) {
        const payload = {
          list: res,
        }
        dispatch({
          type: SET_WILD_PROPS,
          par: 'orders',
          child: 'unassigned',
          payload
        })
      }
    } catch (er) {
      console.error(er);
    }
  }
  const fetchAssignedOrders = async () => {
    try {
      const res = await axios(GET_ASSIGNED_ORDERS);
      console.log(res)
      if (res && Array.isArray(res)) {
        const payload = {
          list: res,
        }
        dispatch({
          type: SET_WILD_PROPS,
          par: 'orders',
          child: 'assigned',
          payload
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
        ;
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
        ;
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
        ;
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
        ;
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
  const updateAddressesHash = () => {
    const payload = addresses.list?.reduce(
      (acc, address) => {
        acc[address.id] = address;
        return acc;
      },
      {}
    )
    dispatch({ type: SET_WILD_PROPS, par: 'addresses', child: 'hash', payload });
  }

  const addOrderToList = order => {

    if (!order.driver_id) {
      const payload = {
        list: [order, ...orders.unassigned.list]
      };
      return dispatch({
        type: SET_WILD_PROPS,
        par: 'orders',
        child: 'unassigned',
        payload
      })
    } else {
      const payload = {
        list: [order, ...orders.assigned.list]
      }
      return dispatch({
        type: SET_WILD_PROPS,
        par: 'orders',
        child: 'assigned',
        payload
      })
    }
  }
  const updateOrdersHash = () => {
    const combinedArray = orders.assigned.list
      .concat(orders.unassigned.list);

    const payload = combinedArray.reduce(
      (acc, order) => {
        acc[order.id] = order;
        return acc;
      },
      {}
    )
    dispatch({ type: SET_WILD_PROPS, par: 'orders', child: 'hash', payload });
  }

  const moveOrderToList = (newOrder,
    old = 'unassigned',
    dest = 'assigned') => {
    const oldList = [...orders[old].list]
    const oldIdx = oldList.findIndex(order => order.id === newOrder.id);
    oldList.splice(oldIdx, 1);
    const payloadA = {
      list: oldList
    }
    newOrder.isNew = true;
    const newList = [newOrder, ...orders[dest].list];
    const payloadB = {
      list: newList
    };
    dispatch({ type: UPDATE_ORDERS, orders: { [old]: payloadA, [dest]: payloadB } })
  }

  const deleteOrderThenAdd = newOrder => {
    const oldList = [...orders.assigned.list]
    const oldIdx = oldList.findIndex(order => order.id === newOrder.id);
    oldList.splice(oldIdx, 1);
    const payload = {
      list: oldList
    }
    dispatch({type: SET_WILD_PROPS, par:'orders', child: 'assigned', payload});
    setTimeout(() => {
      newOrder.isNew = true;
      const newList = [newOrder, ...oldList];
      const payloadB = {
        list: newList
      };
      dispatch({type: SET_WILD_PROPS, par:'orders', child: 'assigned', payload: payloadB});
    }, 400)

  }

  const modifyDriverView = (index, value) => {
    const payload = [...view.drivers];
    payload[index] = Number(value);
    dispatch({type: SET_WILD_PROPS, par: 'view', child: 'drivers', payload})
  }

  useEffect(() => {
    fetchUnassignedOrders();
    fetchDrivers();
    fetchSuppliers();
    fetchCustomers();
    fetchAddresses();
    fetchAssignedOrders();
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
  useEffect(() => {
    if (addresses.list.length)
      updateAddressesHash();
    // eslint-disable-next-line
  }, [addresses.list])


  useEffect(() => {
    if (orders.assigned.list.length || orders.unassigned.list.length)
      updateOrdersHash();
    // eslint-disable-next-line
  }, [orders.assigned.list, orders.unassigned.list])

  return {
    appData,
    fetchUnassignedOrders,
    addDriverToList,
    addOrderToList,
    moveOrderToList,
    modifyDriverView,
    deleteOrderThenAdd
  }

}
export default useAppData;