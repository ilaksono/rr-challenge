# Markdowns
 - README [(/README.md)](./README.md)
 - FEATURES [(/FEATURES.md)](./FEATURES.md)
 - TESTS [(/TESTS.md)](./TESTS.md)

# Environment Requirements:
  - Node >=14.17
  - local psql database >= 9.x

# Start Instructions:
  - run: `git clone https://github.com/ilaksono/rr-challenge rr-challenge-il && cd rr-challenge-il`
  - Start FE: `npm i && npm start`
  - Start BE: `cd server && npm i && npm start` 
  - Test: run: `npm run test`
  - Test Coverage: run: `CI=true npm test -- --env=jsdom --coverage`
  - public site: https://rr-challenge-il.netlify.app

# Database Instructions:  
## If postgres is not installed, Install postgres on mac 
  in the command line:
  - install libpq `brew install libpq`
    - update PATH
    - if using zsh shell:
    - run `echo 'export PATH="/usr/local/opt/libpq/bin:$PATH"' >> ~/.zshrc`
    - run `source ~/.zshrc`
    - if using bash shell:
      - run `echo 'export PATH="/usr/local/opt/libpq/bin:$PATH"' >> ~/.bash_profile`
      - run `source ~/.bash_profile`
  - run command `cd server` from the project root
  - connect to psql database
  `sudo psql -U postgres`
  - when it prompts to type in a password `password: ` enter your computer password
  - run sql command `CREATE DATABASE rr;`
  - run sql command `\c rr`
  - run `\i ./db/migrations.sql`
    - create/drop tables
  - run `\i ./db/seeds.sql`
    - insert seeds for suppliers, customers, drivers
  - move on to `Dev Environment Instructions`

  ## Windows
    - https://www.2ndquadrant.com/en/blog/pginstaller-install-postgresql/
  ## Linux
    - https://www.postgresqltutorial.com/install-postgresql-linux/

# Dev Envrionment Instructions
  - If you don't have node installed, [instructions here](https://www.pluralsight.com/guides/getting-started-with-nodejs)
   - Or you can install node version manager: [instructions here](https://github.com/nvm-sh/nvm)
  - copy the contents `.env.example` file in folder `/server` in the repo 
  - paste the contents in a new file and save it as `.env` inside `/server`
  - in the command line, change directory to `/server` and run `npm start`
  - open a new command line tab and cd to the root of the project - run `npm start`
  - if you are not using a PORT=8000, you must go into the root/package.json and modify the proxy value to `localhost:[PORT]` to match the port you provided
  - to add `orders` seeds - go to url in browser `localhost:[PORT]/seed`

# Technologies used:
  - FE: React, Bootstrap
  - BE: Node, Express
  - DB: Postgres
 

# Additional Features:
  1. Added Supplier entity
  2. Added Customer entity
  3. Added Addresses entity


# Database Model:
## There are 5 entities - Database  ERD:
<!-- !["Data ERD"](https://github.com/ilaksono/rr-challenge/blob/main/docs/db-erd.png)   -->
<img src='https://github.com/ilaksono/rr-challenge/blob/main/docs/db-erd.png' alt='Data ERD' style="width:65%;"/>


  1. Each Order consists of 1 Supplier Address, 1 Customer Address, and 1 Driver (each 1 to Many relationships)
  2. Each Order can have many Drivers
  3. A Driver handles many orders, but 1 at a time
  4. Each Driver drives only 1 vehicle
  5. A Supplier can have many Addresses
  6. A Customer can have many Addresses
  7. Each Address includes a street address, city, country, postal, timezone offset (calculated), and customer/supplier

# Current Bugs & Needed Improvements:
  - modify Driver <> Vehicle relationship to handle: 1 to Many || Many to Many
  - add data pagination on backend for slicing large lists
  - adding payments + invoicing and remit-to (payable) additional addresses on invoices
  - Adding UI elements - such as maps/geolocaiton apis for easier location selection
  - Should add:
    - form validation for country/city/state in address table
    - form validation driver_insurance of drivers and standard format
    - More test coverage
  - Optimize animations on OrderListItem
  - CSV Uploading: 
    - will add/modify orders; but a bug where order start and end conflicting times can be added to a driver - can be fixed with time validation when parsing the data before the insert is run


# Screenshots and Video Demos
  !["Demo on Mobile"](https://github.com/ilaksono/rr-challenge/blob/main/docs/rr-video-demo.mov)
  <video src='/docs/rr-video-demo.mov' width=180/>

----

<img src='https://github.com/ilaksono/rr-challenge/blob/main/docs/main-view.png' alt='Main View - Desktop' style="width:80%;"/>

----

<img src='https://github.com/ilaksono/rr-challenge/blob/main/docs/driver-form.png' alt='Driver Form - Mobile' style="width:200px;"/>

# Custom Hooks 
  - `useAlertData`: controls alert popup display, text, and children
    - main trigger: 
      - createAlert(
        text: string | node, 
        type: string = success
        )

  - `useAppData`: (useReducer) controls global state entities: 
    - orders, drivers, suppliers, customers, and addresses
    - initialValue = {
      orders: {
        unassigned: {
          list: [],
        },
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
        drivers: [1, 2]
    }

  - `useConfirmModal`: controls custom prompt - display, text, title text, and button submit handler
    - main trigger: 
      - createModal(
        body: string | node,
        title: string,
        confirm = () => {},
        btnText = 'Submit'
      )

  - `useCreateForm`: controls form data in OrderCreateForm and DriverCreateForm
    - main change handle:
      - handleCreateFormChange(event)

  - `useDropZone`: stores drop data when dragged item enters/leaves a controlled boundary - DriverView or OrderView
    - stores `on` state - true if dragged item is inside boundary, false if outside
    - `id` number represents the driver_id
    - `type` string =`'driver'` | `'order'`

  - `useErrorToast`: controls error popup text and display
    - main trigger:
      - createError(
        body: string | node
      )

  - `useLoadingModal`: controls a loading modal that covers page to control user's accessibility according to certain operations - repetitive triggers of updating sensitive data 
  
# API Requests
  - axios request library
  - api endpoints: 
    - `/api/orders`
    - `/api/drivers`
    - `/api/suppliers`
    - `/api/customers`
    - `/api/addresses`
  - uses a query parameter `?type=` in URI to determine which backend switch `/server/controllers.js`

## Directory Layout

```
.
├── ./docs
│   └── ./docs/features
├── ./public
│   └── ./public/images
├── ./server
│   ├── ./server/db
│   └── ./server/utils
└── ./src
    ├── ./src/ax              # axios wrapper
    ├── ./src/components
    │   ├── ./src/components/Modal
    │   ├── ./src/components/__tests__
    │   ├── ./src/components/drivers
    │   ├── ./src/components/general
    │   ├── ./src/components/orders
    │   ├── ./src/components/popovers
    │   └── ./src/components/suppliers
    ├── ./src/context
    ├── ./src/hooks
    ├── ./src/sass
    ├── ./src/utils
    └── ./src/views

```

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
  - 2021-10-18:
    - Had some issues with stale state and dispatch for useAppData in websocket handler
    - tried using ref callbacks but failed
    - Fixed by passing a ref to the callback instead of using state
  - 2021-10-19:
    - The Drag and Drop event handlers not triggering in Safari and FireFox 93
    - onDragLeave handlers is different between  
