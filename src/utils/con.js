export const rrBlue = '#1e55bf';

export const tzOffset = new Date().getTimezoneOffset() / 60;

export const testData = {
  "drivers": [
    {
      "id": 1,
      "driver_fname": "Larry",
      "driver_lname": "Wheels"
    },
    {
      "id": 2,
      "driver_fname": "Barry",
      "driver_lname": "Keeles"
    }
  ],
  "orders": {
    "unassigned": [
      {
        "id": 1,
        "driver_id": 1,
        "source_address_id": 1,
        "destination_address_id": 2,
        "cost_cents": 100,
        "start_time": "2020-10-10T13:30:00.000Z",
        "end_time": "2020-10-10T13:31:00.000Z",
        "revenue_cents": 100
      }
    ],
    "assigned": [
      {
        "id": 2,
        "driver_id": 1,
        "source_address_id": 1,
        "destination_address_id": 2,
        "start_time": "2020-10-10T13:28:00.000Z",
        "end_time": "2020-10-10T13:29:00.000Z",
        "cost_cents": 100,
        "revenue_cents": 100
      }
    ]
  },
  "suppliers": [
    {
      "id": 1,
      "supp_fname": "Supplier",
      "supp_lname": "Joe"
    }
  ],
  "customers": [
    {
      "id": 1,
      "cust_fname": "Customer",
      "cust_lname": "Jane"
    }
  ],
  "addresses": [
    {
      "id": 1,
      "supplier_id": 1,
      "city": "Toronto"
    },
    {
      "id": 2,
      "customer_id": 1,
      "city": "Barrie"
    }
  ]
}