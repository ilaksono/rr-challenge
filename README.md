# Environment Requirements:
  - Node >14.17
  - local psql > 9.x

# Start Instructions:
  - Start FE: `npm start`
  - connect to psql database
  `sudo psql -U postgres`
  - Start BE: `cd server && npm start` 


# Technologies used:
  - FE: React, Bootstrap
  - BE: Node, Express
  - DB: Postgres
 

# Additional Features:
  1. Added Supplier entity
  2. Added Customer entity
  3. Added Addresses entity


# Assumptions Made:
  1. Each Order consists of 1 Supplier, 1 Customer, and 1 Driver (1 to Many relationships)
  2. Each Order can have many Drivers
  3. A Driver handles many orders, but 1 at a time
  4. Each Driver drives only 1 vehicle
  5. A Supplier can have many Addresses
  6. A Customer can have many Adresses
  7. Each Address includes a street address, city, country, postal, timezone offset (calculated), and customer/supplier

# Bugs/Improvements to make:
  - modify Driver <> Vehicle relationship to handle: 1 to Many || Many to Many
  - add data pagination on backend for slicing large lists
  - adding invoicing and remit-to (payable) addresses on invoices

# Challenges:
  - 2021-10-16:
    - making an insert query using node-pg that can use DEFAULT when the param is falsey for the suppliers table - supp_fname and supp_lname
    - building a solid relationship  between addresses and its customer/supplier that allows null models e.g. using an address for the order's source/destination without adding a new Supplier / Customer
    - Deciding whether to keep Customers and Suppliers in one table called Contacts - or keep them separate
      - Decided to keep them separate because only suppliers have a payable address
      - customers are linked to accounts receivable/debtors/sales orders
      - suppliers are linked to accounts payable/creditors/purchase orders 
  - 2021-10-17:
    - Accounting for timezones (all are currently in UTC) - when calculating the driver's availability for updating an order to a driver