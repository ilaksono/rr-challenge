import axios from 'axios';

export const GET_UNASSIGNED = '/api/orders?type=unassigned';
export const GET_ALL_DRIVERS = '/api/drivers?type=all'
export const CREATE_DRIVER = '/api/drivers?type=create';

const isValidResponse = (res) => {
  if (res.data.data || (!res.data.msg && (res.data.status === 'success')))
    return true;
  return false;
}

const axiosWrapper = async (url, method = 'get', body = {}, headers = {}) => {
  try {
    const axiosMethod = method === 'get'
      ? axios.get : axios.post;

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