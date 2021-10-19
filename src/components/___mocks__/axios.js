// Mock database
import * as axRoutes from 'ax';
const appData = {
  drivers: [
    {
      id: 1,
      driver_fname: 'Larry',
      driver_lname: 'Wheels',
    },
    {
      id: 2,
      driver_fname: 'Barry',
      driver_lname: 'Keeles',
    }
  ],
  orders: {
    unassigned: [
      {
        id: 1,
        driver_id: 1,
        source_address_id: 1,
        destination_address_id: 2,
        cost_cents: 100,
        start_time: "2020-10-10T13:30:00.000Z",
        end_time: "2020-10-10T13:31:00.000Z",
        revenue_cents: 100
      }
    ],
    assigned: [
      {
        id: 2,
        driver_id: 1,
        source_address_id: 1,
        destination_address_id: 2,
        start_time: "2020-10-10T13:28:00.000Z",
        end_time: "2020-10-10T13:29:00.000Z",
        cost_cents: 100,
        revenue_cents: 100
      }
    ],

  },
  suppliers: [
    {
      id: 1,
      supp_fname: 'Supplier',
      supp_lname: 'Joe',
    }
  ],
  customers: [
    {
      id: 1,
      cust_fname: 'Customer',
      cust_lname: 'Jane'
    }
  ],
  addresses: [
    {
      id: 1,
      supplier_id: 1,
      city: 'Toronto'
    },
    {
      id: 2,
      customer_id: 1,
      city: 'Barrie'
    }
  ]
};

const validUrlResponse = (data) => {
  return Promise.reject({
    data,
    status: 200,
    statusText: "OK"
  })
}

const invalidUrlResponse = Promise.reject({
  status: 500,
  statusText: "failure",
  data: null,
  message: 'Invalid URL'
});

// Mock axios promise

const axios = {

  // mock GET requests
  get: jest.fn(url => {
    switch (url) {
      // all drivers
      case axRoutes.GET_ALL_DRIVERS:
        return validUrlResponse(appData.drivers)
      // all unassigned orders
      case axRoutes.GET_UNASSIGNED:
        return validUrlResponse(appData.orders.unassigned)
      // all assigned orders
      case axRoutes.GET_ASSIGNED_ORDERS:
        return validUrlResponse(appData.orders.assigned);
      // all addresses
      case axRoutes.GET_ALL_ADDRESSES:
        return validUrlResponse(appData.orders.addresses)
      // default invalid route
      default:
        return invalidUrlResponse;
    }
  }),
  put: jest.fn((url, payload) => {
    /* Resolve updating orders data */
    switch (url) {
      case axRoutes.DELETE_ORDER: {
        const {
          order_id
        } = payload;
        let type = 'assigned';
        const isOrderMatch = order => order.id === order_id
        let idx = appData.orders.assigned.findIndex(isOrderMatch);
        if (idx < 0) {
          type = 'unassigned';
          idx = appData.orders.unassigned.findIndex(isOrderMatch);
        }
        if (idx < 0)
          return invalidUrlResponse
        appData.orders[type][idx].is_deleted = true;
        const data = [appData.orders[type][idx]]
        return validUrlResponse(data)
      }
      default:
        return invalidUrlResponse
    }

  }),
  post: jest.fn((url, payload) => {
    /* Resolve updating orders data */
    switch (url) {
      case axRoutes.CREATE_DRIVER: {
        const {
          fname,
          lname,
          make,
          model,
          year
        } = payload;
        const drivers = appData.drivers;
        appData.drivers.push({
          id: drivers.length + 1,
          driver_fname: fname,
          driver_lname: lname,
          make,
          model,
          year
        });
        const data = [appData.orders[type][idx]]
        return validUrlResponse(data)
      }
      default:
        return invalidUrlResponse
    }

  }),
};
export default axios;