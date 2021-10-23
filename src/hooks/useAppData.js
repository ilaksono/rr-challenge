// Application State that holds the necessary data
// drivers list and hash, 
// orders lists (assigned, unassigned) and hashes
// suppliers list and hash
// customers list and hash
// addresses list and hash
// view - the two driver's order windows being viewed

import {
  useReducer, useRef,
  useEffect
} from 'react';
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

  const [appData = {}, dispatch] = useReducer(reducer, init)
  const dataRef = useRef({
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
    drivers: {
      list: [],
      hash: {}
    },
  })


  dataRef.current = appData;
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
      const res = await axios(
        GET_UNASSIGNED,
      );
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
      (acc, driver, idx) => {
        acc[driver.id] = driver;
        acc[driver.id].index = idx;
        return acc;
      },
      {}
    )
    dispatch({ type: SET_WILD_PROPS, par: 'drivers', child: 'hash', payload });
  }
  const updateSuppliersHash = () => {
    const payload = suppliers.list?.reduce(
      (acc, supplier, idx) => {
        acc[supplier.id] = supplier;
        acc[supplier.id].index = idx;
        return acc;
      },
      {}
    )
    dispatch({ type: SET_WILD_PROPS, par: 'suppliers', child: 'hash', payload });
  }
  const updateCustomersHash = () => {
    const payload = customers.list?.reduce(
      (acc, customer, idx) => {
        acc[customer.id] = customer;
        acc[customer.id].index = idx;
        return acc;
      },
      {}
    )
    dispatch({ type: SET_WILD_PROPS, par: 'customers', child: 'hash', payload });
  }
  const updateAddressesHash = () => {
    const payload = addresses.list?.reduce(
      (acc, address, idx) => {
        acc[address.id] = address;
        acc[address.id].index = idx;
        return acc;
      },
      {}
    )
    dispatch({ type: SET_WILD_PROPS, par: 'addresses', child: 'hash', payload });
  }

  const updateUnassignedOrders = (update = []) => {
    const list = [...orders.assigned.list];
    update.forEach(order => {
      const idx = orders.hash[order.id].index;
      list.splice(idx, 1);
    })
    const assignedPayload = {
      list
    }
    const unassignedPayload = {
      list: orders.unassigned.list.concat([update])
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

  const addOrderToList = (order = {}) => {

    order.isNew = true;
    if (!order.driver_id) {
      const payload = {
        list: orders.unassigned.list.concat(order)
      };
      return dispatch({
        type: SET_WILD_PROPS,
        par: 'orders',
        child: 'unassigned',
        payload
      })
    } else {
      const payload = {
        list: orders.assigned.list.concat(order)
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
    const idx = orders.hash[id].index
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
    console.log(orders.assigned, orders.unassigned, 'hash');
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
    dispatch({
      type: SET_WILD_PROPS, par: 'orders',
      child: 'hash', payload
    });
  }
  const handleCreateSupplier = async (createForm) => {

    if (createForm.supplierId && createForm.source_address_id && !createForm.supplierChecked) {
      return { id: createForm.source_address_id };
    }
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
        const addressRes = await handleCreateAddress(addressJson)
        return addressRes
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
        const addressRes = await handleCreateAddress(addressJson)
        return addressRes;
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
    const oldIdx = orders.hash[newOrder.id].index
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
    const oldIdx = orders.hash[newOrder.id].index;
    if (oldIdx < 0) return;
    oldList.splice(oldIdx, 1);
    const payload = {
      list: oldList
    }
    dispatch({ type: SET_WILD_PROPS, par: 'orders', child: 'assigned', payload });
    // setTimeout(() => {
    newOrder.isNew = true;
    const newList = oldList.concat(newOrder);
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
    const idx = drivers.hash[id].index;

    payload.splice(idx, 1);
    dispatch({ type: SET_WILD_PROPS, par: 'drivers', child: 'list', payload });

  }


  const refreshDriverView = () => {
    if (!drivers.list.length)
      return dispatch({
        type: SET_WILD_PROPS,
        par: 'view',
        child: 'drivers',
        payload: [0, 0]
      })
    if (!Object.values(drivers.hash).length) return;
    // const payload = view.drivers.map(id =>
    //   !drivers.hash[id] ? drivers.list[0].id : id
    // );
    let payload = [];
    for (const driver of drivers.list) {
      if (payload.length === 2) break;
      if (drivers.hash[driver.id]
        && !payload.includes(driver.id)
      ) {
        payload.push(driver.id)
      }
    }
    if (payload.length === 1)
      payload[1] = payload[0];
    if (payload.length === 0)
      payload = [0, 0]
    dispatch({
      type: SET_WILD_PROPS,
      par: 'view',
      child: 'drivers',
      payload
    })
  }

  const updateOrdersLive = (list = [], oldData = dataRef) => {
    console.log(dataRef.current);
    const cpy = {
      assigned: [...oldData.current.orders.assigned.list],
      unassigned: [...oldData.current.orders.unassigned.list]
    }
    list.forEach(order => {
      const oldOrder = oldData.current.orders.hash[order.id]
      if (oldOrder) {
        const { keyName } = oldOrder
        if (!!oldOrder.driver_id === !order.driver_id) {
          const newKeyName = keyName === 'assigned' ? 'unassigned' : 'assigned'
          order.isNew = true;
          cpy[newKeyName].push(order);
          // appData is stale, need to use ref data
          const idx = cpy[keyName].findIndex(each => each.id === order.id);
          cpy[keyName].splice(idx, 1);
          return;
        }
        const idx = cpy[keyName].findIndex(each => each.id === order.id);
        cpy[keyName][idx] = order;

        return;
      }
      order.isNew = true;
      if (order.driver_id)
        cpy.assigned.push(order);
      else cpy.unassigned.push(order);
    })
    const ordersCpy = {
      assigned: {
        list: cpy.assigned
      },
      unassigned: {
        list: cpy.unassigned
      }
    }
    console.log(cpy);
    dispatch({ type: UPDATE_ORDERS, orders: ordersCpy })
  }

  const deleteOrdersLive = (list = [], oldData = {}) => {
    // const cpyList = [...]
    const cpy = {
      assigned: {
        list: [...oldData.current.orders.assigned.list]
      },
      unassigned: {
        list: [...oldData.current.orders.unassigned.list]
      },
    }

    const orderList = list.map(order => oldData.current.orders.hash[order.id]).sort((a, b) => b.index - a.index);
    orderList.forEach(each => {
      cpy[each.keyName].list.splice(each.index, 1);
    })
    dispatch({ type: UPDATE_ORDERS, orders: cpy })
  }
  const updateDriversLive = (list = [], oldData = {}) => {
    const payload = [...oldData.current.drivers.list];
    list.forEach(driver => {
      const oldDriver = oldData.current.drivers.hash[driver.id];
      if (oldDriver) {
        payload[oldDriver.index] = driver;
        return;
      }
      payload.unshift(driver);
    });

    dispatch({
      type: SET_WILD_PROPS,
      par: 'drivers',
      child: 'list',
      payload
    });
  }
  const deleteDriversLive = (list = [], oldData = {}) => {
    const payload = [...oldData.current.drivers.list];
    const newList = list.map(each => oldData.current.drivers.hash[each.id])
      .sort((a, b) => b.index - a.index);
    newList.forEach(each => {
      payload.splice(each.index, 1);
    });

    dispatch({
      type: SET_WILD_PROPS,
      par: 'drivers',
      child: 'list',
      payload
    });
  }
  const updateListLive = (list = [], oldData = {}, type = 'suppliers') => {
    const data = oldData.current[type];
    const payload = [...data.list];
    list.forEach(each => {
      const oldItem = data.hash[each.id];
      if (oldItem) {
        payload[oldItem.index] = each;
        return;
      }
      payload.unshift(each);
    });

    dispatch({
      type: SET_WILD_PROPS,
      par: type,
      child: 'list',
      payload
    });
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
      // console.log(data);
      if (data.key === 'orders') {
        if (data.type === 'delete')
          deleteOrdersLive(data.orders, dataRef);
        else updateOrdersLive(data.orders, dataRef);
      } else if (data.key === 'drivers') {
        if (data.type === 'delete')
          deleteDriversLive(data.drivers, dataRef);
        else updateDriversLive(data.drivers, dataRef);
      } else if (['suppliers', 'customers', 'addresses'].includes(data.key)) {
        updateListLive(data.list, dataRef, data.key)
      }

    });
    return () => {
      socket.close()
    };
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
    deleteDriverAppData,
    updateOrdersLive
  }

}
export default useAppData;