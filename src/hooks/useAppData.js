import { useReducer } from 'react';
import axios, {
  GET_UNASSIGNED,
  GET_ALL_DRIVERS
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
  }
}

const useAppData = () => {

  const [appData, dispatch] = useReducer(reducer, init)

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
    const cpy = [driver,...appData.drivers.list];
    dispatch({type: SET_WILD_PROPS, par: 'drivers', child: 'list', payload: cpy});
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
  const updateDriversHash = () => {
    const payload = appData.drivers.list?.reduce(
      (acc, driver) => {
        acc[driver.id] = driver;
        return acc;
      },
      {}
    )
    dispatch({ type: SET_WILD_PROPS, par: 'drivers', child: 'hash', payload });
  }
  useEffect(() => {
    fetchDrivers();
  }, [])

  useEffect(() => {
    updateDriversHash();

    // eslint-disable-next-line
  }, [appData.drivers.list])

  return {
    appData,
    fetchUnassignedOrders,
    addDriverToList
  }

}
export default useAppData;