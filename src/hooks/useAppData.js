// Application State that holds the necessary data
// drivers list and hash, 
// orders lists (assigned, unassigned) and hashes
// suppliers list and hash
// customers list and hash
// addresses list and hash
// view - the two driver's order windows being viewed

import { useReducer, useRef } from 'react';
import axios, {
  GET_UNASSIGNED,
  GET_ALL_DRIVERS,
  GET_ALL_SUPPLIERS,
  GET_ALL_CUSTOMERS,
  GET_ALL_ADDRESSES,
  GET_ASSIGNED_ORDERS,
  CREATE_SUPPLIER,
  CREATE_CUSTOMER,
  CREATE_ADDRESS,
} from 'ax';
import { useEffect, useCallback } from 'react';
import { initAppData as init } from 'utils/initStates';
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



const useAppData = () => {

  const [appData, dispatch] = useReducer(reducer, init)
  const cbRef = useRef({
    updateOrders: () => { }
  })
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

  const updateUnassignedOrders = (update = []) => {
    const list = [...orders.assigned.list];
    update.forEach(order => {
      const idx = list.findIndex(each => each.id === order.id);
      list.splice(idx, 1);
    })
    const assignedPayload = {
      list
    }
    const unassignedPayload = {
      list: [...update, ...orders.unassigned.list]
    }
    dispatch({
      type: SET_WILD_PROPS,
      par: 'orders',
      child: 'assigned',
      payload: assignedPayload
    })
    dispatch({
      type: SET_WILD_PROPS,
      par: 'orders',
      child: 'unassigned',
      payload: unassignedPayload
    })
  }

  const addOrderToList = order => {

    order.isNew = true;
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
  const deleteOrder = (id, key) => {
    const list = [...orders[key].list]
    const idx = list.findIndex(order => order.id === id);
    list.splice(idx, 1);
    const payload = {
      list
    }
    dispatch({
      type: SET_WILD_PROPS,
      par: 'orders', child: key,
      payload
    })

  }
  const updateOrdersHash = () => {
    // const combinedArray = orders.assigned.list
    //   .concat(orders.unassigned.list);

    const payloadPre = orders.assigned.list
      .reduce(
        (acc, order, idx) => {
          acc[order.id] = order;
          acc[order.id].index = idx;
          acc[order.id].keyName = 'assigned'
          return acc;
        },
        {}
      )
    const payload = orders.unassigned.list
      .reduce(
        (acc, order, idx) => {
          acc[order.id] = order;
          acc[order.id].index = idx;
          acc[order.id].keyName = 'unassigned'
          return acc;
        },
        payloadPre
      )
    dispatch({ type: SET_WILD_PROPS, par: 'orders', 
    child: 'hash', payload
    });
  }
  const handleCreateSupplier = async (createForm) => {

    if (createForm.supplierId && createForm.source_address_id && !createForm.supplierChecked)
      return { id: createForm.source_address_id };
    try {
      if (!createForm.supp_city)
        throw new Error('Please add the Supplier city');
      const res = await axios(CREATE_SUPPLIER, 'post', createForm);
      if (res) {
        const addressJson = {
          address: createForm.supp_address,
          city: createForm.supp_city,
          postal: createForm.supp_postal,
          state: createForm.supp_state,
          country: createForm.supp_country,
          supplier_id: res[0].id,
        }
        const payload = [res[0], ...suppliers.list];
        dispatch({
          type: SET_WILD_PROPS,
          par: 'suppliers',
          child: 'list',
          payload
        })
        return handleCreateAddress(addressJson)
      }
    } catch (er) {
      throw new Error('Please select a supplier or add supplier details');
    }
  }
  const handleCreateCustomer = async (createForm) => {
    if (createForm.customerId && createForm.destination_address_id && !createForm.customerChecked)
      return { id: createForm.destination_address_id };
    try {
      if (!createForm.cust_city)
        throw new Error('Please add the Customer city');
      const res = await axios(CREATE_CUSTOMER, 'post', createForm);
      if (res) {
        const addressJson = {
          address: createForm.cust_address,
          city: createForm.cust_city,
          postal: createForm.cust_postal,
          state: createForm.cust_state,
          country: createForm.cust_country,
          customer_id: res[0].id,
        }
        const payload = [res[0], ...customers.list];
        dispatch({
          type: SET_WILD_PROPS,
          par: 'customers',
          child: 'list',
          payload
        })

        return handleCreateAddress(addressJson)

      }
    } catch (er) {
      throw new Error('Please select a customer or add customer details');
    }

  }
  const addAddressesList = (list = []) => {

    const payload = [...list.filter(each => each), ...addresses.list];
    dispatch({
      type: SET_WILD_PROPS,
      par: 'addresses',
      child: 'list',
      payload
    })
  }

  const handleCreateAddress = async (payload) => {
    try {
      const res = await axios(CREATE_ADDRESS, 'post', payload)
      if (res) {

        return res[0]
      }
    } catch (er) {
      throw new Error('Could not create address')
    }
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

  const deleteOrderThenAdd = (newOrder, key = 'assigned') => {
    const oldList = [...orders[key].list]
    const oldIdx = oldList.findIndex(order => order.id === newOrder.id);
    if (oldIdx < 0) return;
    oldList.splice(oldIdx, 1);
    const payload = {
      list: oldList
    }
    dispatch({ type: SET_WILD_PROPS, par: 'orders', child: 'assigned', payload });
    // setTimeout(() => {
    newOrder.isNew = true;
    const newList = [newOrder, ...oldList];
    const payloadB = {
      list: newList
    };
    dispatch({ type: SET_WILD_PROPS, par: 'orders', child: 'assigned', payload: payloadB });
    // }, 400)
    return true;
  }

  const modifyDriverView = (index, value) => {
    const payload = [...view.drivers];
    payload[index] = Number(value);
    dispatch({ type: SET_WILD_PROPS, par: 'view', child: 'drivers', payload })
  }

  const deleteDriverAppData = (id) => {
    const payload = [...drivers.list];
    const idx = payload.findIndex(driver => driver.id === id);

    payload.splice(idx, 1);
    dispatch({ type: SET_WILD_PROPS, par: 'drivers', child: 'list', payload });

  }


  const refreshDriverView = () => {
    if (!Object.values(drivers.hash).length) return;
    const payload = view.drivers.map(id =>
      !drivers.hash[id] ? drivers.list[0].id : id
    );
    dispatch({
      type: SET_WILD_PROPS,
      par: 'view',
      child: 'drivers',
      payload
    })
  }

  cbRef.current.updateOrders = (list) => {
    const assignedList = [...orders.assigned.list];
    const unassignedList = [...orders.unassigned.list];
    list.forEach(order => {
      const oldOrder = orders.hash[order.id]
      if(oldOrder) {
        const {keyName, index} = oldOrder.keyName

      }


    })
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
    refreshDriverView()
  }, [drivers.hash])

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



  useEffect(() => { // on mount - add websocket listener to trigger render on update
    const baseURL = process.env.REACT_APP_WEBSOCKET_URL || 'ws://localhost:8000';
    const socket = new WebSocket(baseURL);
    socket.onopen = () => {
      socket.send('ping');
    };
    socket.addEventListener('message', function (event) {
      const data = JSON.parse(event.data);
      console.log(data);

    });
    return () => socket.close();
  }, []);
  return {
    appData,
    fetchUnassignedOrders,
    addDriverToList,
    addOrderToList,
    moveOrderToList,
    modifyDriverView,
    deleteOrderThenAdd,
    handleCreateAddress,
    handleCreateCustomer,
    handleCreateSupplier,
    addAddressesList,
    deleteOrder,
    updateUnassignedOrders,
    deleteDriverAppData
  }

}
export default useAppData;