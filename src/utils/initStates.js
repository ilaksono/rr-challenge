export const initOrderForm = {
  driver_name: '',
  revenue: 0,
  cost: 0,
  start_time: new Date().toJSON().slice(0, 16),
  end_time: new Date().toJSON().slice(0, 16),
  description: '',
  supplier_name: '',
  customer_name: '',
  cust_fname: '',
  cust_lname: '',
  supp_fname: '',
  supp_lname: '',
  driverId: 0,
  supplierId: 0,
  customerId: 0,
  supplierChecked: false,
  customerChecked: false,
  supp_address: '',
  supp_city: '',
  supp_postal: '',
  supp_country: '',
  supp_state: '',
  cust_address: '',
  cust_city: '',
  cust_postal: '',
  cust_country: '',
  cust_state: '',
  source_address_id: 0,
  destination_address_id: 0
};

export const initAppData = {
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
    drivers: [0, 0]
  }
}