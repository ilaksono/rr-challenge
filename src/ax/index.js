import axios from 'axios';


// order api routes
export const GET_UNASSIGNED = '/api/orders?type=unassigned';
export const CREATE_ORDER = '/api/orders?type=create';
export const GET_ASSIGNED_ORDERS = '/api/orders?type=assigned'
export const UPDATE_ORDER = '/api/orders?type=update'
export const UNASSIGN_ORDER = '/api/orders?type=unassignOrder'
export const DELETE_ORDER = '/api/orders?type=delete'
export const UNASSIGN_ORDERS = '/api/orders?type=unassignOrders'

// driver api routes
export const GET_ALL_DRIVERS = '/api/drivers?type=all'
export const CREATE_DRIVER = '/api/drivers?type=create';
export const DELETE_DRIVER ='/api/drivers?type=delete';

// supplier api routes
export const GET_ALL_SUPPLIERS = '/api/suppliers?type=all'
export const CREATE_SUPPLIER = '/api/suppliers?type=create';

// customer api routes
export const GET_ALL_CUSTOMERS = '/api/customers?type=all'
export const CREATE_CUSTOMER = '/api/customers?type=create';

// address api routes
export const GET_ALL_ADDRESSES = '/api/addresses?type=all'
export const CREATE_ADDRESS = '/api/addresses?type=create';


const isValidResponse = (res) => {
  if (res.data.data || (!res.data.msg && (res.data.status === 'success')))
    return true;
  return false;
}

const axiosWrapper = async (url, method = 'get', body = {}, headers = {}) => {
  try {
    const axiosMethod = axios[method];

    const res = await axiosMethod(url, body, headers);
    if(!isValidResponse(res)) {
      console.error(res);
      throw new Error(res.data.msg);
    }
    return res.data.data;
  } catch (er) {
    throw new Error(er.message);
  }

}
export default axiosWrapper;