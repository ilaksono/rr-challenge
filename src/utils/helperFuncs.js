
export const formatDate = (date) => {
  if (!date) return '';
  const time = new Date(date).getTime();
  let diff = (new Date().getTime() - time) / 1000;
  let unit;
  const obj = formatDiffString(diff);
  unit = obj.unit;
  diff = obj.diff;

  return `${diff} ${unit} ago`;
}
export const formatDiffString = (d, u = 'second') => {
  let unit = u;
  let diff = d;
  if (diff >= 60) {
    // convert to minutes
    diff /= 60;
    unit = "minute";
    if (diff >= 60) {
      // '' hours
      diff /= 60;
      unit = "hour";
      if (diff >= 24) {
        // '' days
        diff /= 24;
        unit = "day";
        if (diff >= 30) {
          // '' months
          diff /= 30;
          unit = "month";
          if (diff >= 12) {
            // '' years
            diff /= 12;
            unit = "year";
          }
        }
      }
    }
  }
  diff = parseInt(diff);
  if (diff !== 1) unit += "s";
  return { diff, unit };
}

export const determineOrderInformation = (order, appData) => {
  let supp,
    cust,
    supp_address_json,
    cust_address_json,
    driver = {};

  if (order.source_address_id)
    supp_address_json = appData.addresses.hash[order.source_address_id] || {};
  if (order.destination_address_id)
    cust_address_json = appData.addresses.hash[order.destination_address_id] || {};

  if (supp_address_json)
    supp = appData.suppliers.hash[supp_address_json.supplier_id] || {}
  if (cust_address_json)
    cust = appData.customers.hash[cust_address_json.customer_id] || {}

  if (order.driver_id)
    driver = appData.drivers.hash[order.driver_id];

  const jsonOrderInformation = {
    ...order,
    end_time: new Date(order.end_time).toJSONLocal().slice(0, 16),
    start_time: new Date(order.start_time).toJSONLocal().slice(0, 16),
    supplier_name: formatFullName(supp.supp_fname, supp.supp_lname),
    customer_name: formatFullName(cust.cust_fname, cust.cust_lname),
    driver_name: formatFullName(driver.driver_fname, driver.driver_lname),
    driverId: order.driver_id,
    supplierId: supp_address_json.supplier_id,
    customerId: cust_address_json.customer_id,
    supp_address: supp_address_json.address,
    supp_city: supp_address_json.city,
    supp_state: supp_address_json.state,
    supp_country: supp_address_json.country,
    supp_postal: supp_address_json.postal,
    cust_address: cust_address_json.address,
    cust_city: cust_address_json.city,
    cust_state: cust_address_json.state,
    cust_country: cust_address_json.country,
    cust_postal: cust_address_json.postal,
    supplierChecked: false,
    customerChecked: false,
    revenue: (order.revenue_cents / 100).toFixed(2),
    cost: (order.cost_cents / 100).toFixed(2)
  };
  return jsonOrderInformation;
}
export const formatFullName = (fname = '', lname = '') =>
  `${fname} ${lname}`

export const inTransitClass = ({ start_time, end_time, driver_id }) => {
  const now = new Date().getTime();
  const start = new Date(start_time).getTime();
  const end = new Date(end_time).getTime();
  const isScheduled = now >= start && now <= end;
  const isDone = now >= end
  if (!driver_id) {
    if (isDone)
      return 'transit-past-due'
    return 'not-in-transit';
  }
  if (!isDone && isScheduled)
    return 'in-transit';
  return 'transit-completed'
}

export const kebobToTitle = (str = '') => {
  if (!str) return str;
  return str.split('-').map(each => each[0].toUpperCase() + each.slice(1)).join(' ')
}

export const isDriverBooked = (driverOrders = [], order) => {
  for (const assigned of driverOrders) {
    if (assigned.id === order.id)
      continue;
    const start = new Date(assigned.start_time).getTime();
    const end = new Date(assigned.end_time).getTime();
    const candidateStart = new Date(order.start_time).getTime();
    const candidateEnd = new Date(order.end_time).getTime();
    if (candidateStart >= start && candidateStart <= end)
      return true;
    if (candidateEnd >= start && candidateStart <= end)
      return true;
  }
  return false
}

export const makeDateTimeString = dString => {
  if (!new Date(dString).getTime())
    throw new Error('Not a valid date');
  let offset = new Date().getTimezoneOffset() / 60;
  let suffix = (Math.round(offset * 100)).toString();
  let operator = '-';
  if (offset < 0) {
    offset *= -1;
    operator = '+';
  }
  if (suffix.length <= 3)
    suffix = '0' + suffix;

  return `${dString}:00${operator}${suffix}`;
}

export const formatMDTimeShort = d => {
  if (!d) return 'Time not available';
  let dat = d;
  if (typeof dat === 'string') {
    dat = d.replace(' ', 'T')
  }
  const timezoneName = new Date().toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2];

  const da = new Date(dat);
  const day = da.getDate();
  const mons = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const hr = da.getHours();
  let min = da.getMinutes();
  if (min < 10)
    min = `0${min}`;

  return `${mons[da.getMonth()]} ${day} at ${hr}:${min} ${timezoneName}`;
}


export const transformDateFormat = (d) => {
  if (!d) return ''
  return new Date(d).toJSONLocal().slice(0, 16);
}
export const formatOrderDate = (d) => {
  if (!d) return '';
  const da = new Date(d).toTimeString().slice(0, 5);
  return da;
}

export const formatOrdersCsv = (appData) => {
  const csvData = [];
  csvData[0] = [
    'order_id',
    'driver_fname',
    'driver_lname',
    'driver_insurance_policy_number',
    'driver_vehicle_make',
    'driver_vehicle_model',
    'driver_vehicle_year',
    'order_description',
    'source_address',
    'source_address_city',
    'source_address_country',
    'source_address_postal',
    'destination_address',
    'destination_address_city',
    'destination_address_country',
    'desintation_address_postal',
    'start_time',
    'end_time',
    'revenue_dollars',
    'cost_dollars'

  ];
  const {
    drivers,
    orders,
    addresses
  } = appData;
  const list = orders.assigned.list
    .concat(orders.unassigned.list);
  list.forEach(order => {
    const source = addresses.hash[order.source_address_id] || {};
    const destination = addresses.hash[order.destination_address_id] || {};
    const driver = drivers.hash[order.driver_id] || {};
    const entry = [
      order.id,
      driver.driver_fname,
      driver.driver_lname,
      driver.driver_insurance,
      driver.vehicle_make,
      driver.vehicle_model,
      driver.vehicle_year,
      order.description,
      source.address,
      source.city,
      source.country,
      source.postal,
      destination.address,
      destination.city,
      destination.country,
      destination.postal,
      order.start_time,
      order.end_time,
      order.revenue_cents / 100,
      order.cost_cents / 100
    ];
    csvData.push(entry)
  });
  return csvData;
}