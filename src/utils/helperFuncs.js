export const formatDate = (date) => {
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
    supp_address_json = appData.addresses.hash[order.source_address_id];
  if (order.destination_address_id)
    cust_address_json = appData.addresses.hash[order.destination_address_id];

  if (supp_address_json)
    supp = appData.suppliers.hash[supp_address_json.supplier_id]
  if (cust_address_json)
    cust = appData.customers.hash[cust_address_json.customer_id]

  if (order.driver_id)
    driver = appData.drivers.hash[order.driver_id];

  const json = {
    ...order,
    end_time: new Date(order.end_time).toJSON().slice(0, 16),
    start_time: new Date(order.start_time).toJSON().slice(0, 16),
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
  console.log(json);
  return json;
}
export const formatFullName = (fname, lname) =>
  `${fname} ${lname}`

export const isDriverBooked = (driverOrders = [], order) => {
  for (const assigned of driverOrders) {
    const start = new Date(assigned.start_time).getTime();
    const end = new Date(assigned.end_time).getTime();
    const candidateStart = new Date(order.start_time).getTime();
    const candidateEnd = new Date(order.end_time).getTime();
    if (candidateStart >= start && candidateStart <= end)
      return true;
    if (candidateEnd >= start && candidateStart <= end)
      return true;
  }
}

export const transformDateFormat = (d) => {
  return new Date(d).toJSON().slice(0, 16);
}