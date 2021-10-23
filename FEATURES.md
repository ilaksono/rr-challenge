# Markdowns
 - README [(/README.md)](./README.md)
 - FEATURES [(/FEATURES.md)](./FEATURES.md)
 - TESTS [(/TESTS.md)](./TESTS.md)

# Bonus Features and Ideas for Improvements

1. `Display total revenue/cost per driver`
  - this sum is displayed in each driver container at the bottom
    - revenue in green; cost in red

  <img src='https://github.com/ilaksono/rr-challenge/blob/main/docs/features/total-rev-cost.png' alt='Total Revenue and Cost' style="width:320px;"/>

- React Component File: [TotalRevenueCost.js](./src/components/drivers/TotalRevenueCost.js)

---

2. `Allow editing revenue/cost when order is assigned to a driver, so the totals become dynamic`
  - Clicking the pencil icon triggers a form inside a modal that enables editting any of these values for that order:
      - cost
      - revenue
      - driver
      - description
      - start time
      - end time
      - destination address
      - source address
    <img src='https://github.com/ilaksono/rr-challenge/blob/main/docs/features/edit-rev-cost.png' alt='Edit Revenue and Cost' style="width:320px;"/>

- [TotalRevenueCost.js](./src/components/orders/CreateOrderForm.js)

---

3. `Clean and visually appealing UI; thought-through UX` 
  - UX: Total order counts at top of driver and order sections
    - [SortOrders.js](./src/components/orders/SortOrders.js)
  - Simple alerts and toasts to inform users
    - success alerts and error toasts
    - [Updates.js](./src/components/general/Updates.js)
  - Simple animations to add user interaction 
    - drag and dropping orders between windows - custom built hooks from scratch
      - [drag-order.mov](./docs/features/drag-order.mov)
    - animations on OrderListItem for movement and sense of user interaction 
    - [useDropZone.js](./src/components/hooks/useDropZone.js)
  - in CreateOrderForm: added scrollable windows for selecting a driver, source, and destination for orders to select previously input records. 
  - in OrderListItem: added transit status color dots to show status + a legend for informative content
    - [OrderListItem.js](./src/components/orders/OrderListItem.js)
    - <img src='https://github.com/ilaksono/rr-challenge/blob/main/docs/features/transit-information.png' alt='Transit Information' style="width:320px;"/>
  - Popovers on: 
    - Source + Destination -  describes the locations for departure and arrival
      - [useDropZone.js](./src/components/popovers/AddressPopover.js)
      - <img src='https://github.com/ilaksono/rr-challenge/blob/main/docs/features/address-popover.png' alt='Address Popover' style="width:180;"/>
    - Start and End times - describes the date+time of depart / arrival and corresponding order status
      - [OrderTimePopover.js](./src/components/popovers/OrderTimePopover.js)
      - <img src='https://github.com/ilaksono/rr-challenge/blob/main/docs/features/time-popover.png' alt='Time Popover' style="width:180;"/>
  - Added sort feature to `OrderList` for easier access
    - <img src='https://github.com/ilaksono/rr-challenge/blob/main/docs/features/sort-list.png' alt='Sort Options' style="width:240px;"/>
---
4. `More details about drivers and orders can be viewed and edited. You can think what other information we might be relevant to the system`
  - Added edittable supplier address information by manual input
  - Added edittable customer address information by manual input
  - added driver insurance to driver form - can be viewed by downloading orders via csv file
    - <img src='https://github.com/ilaksono/rr-challenge/blob/main/docs/driver-form.png' alt='Driver Form - Mobile' style="width:160px;"/>
---
5. `Orders have start and end times, and a driver can’t have two orders that overlap in time`
  - Every order is checked for overlapping start and end times for the driver before create/update of orders in the database
    - [helperFuncs.js -> isDriverBooked](./src/utils/helperFuncs.js)
---
6. `Ability to create new drivers and/or orders`
  - both are available by clicking the buttons: `Create a Driver` and `Create Order`
    - <img src='https://github.com/ilaksono/rr-challenge/blob/main/docs/order-form.png' alt='Order Form' style="width:240px;"/>
---
7. `Ability to delete drivers and/or orders`
  - Both are implented, triggered by: 
    - hovering over an order and clicking the delete-icon
    - hovering over the driver window and clicking the delete-icon at the bottom-right of the driver window
      - [DeleteIcon.js](./src/components/general/DeleteIcon.js)
      - <img src='https://github.com/ilaksono/rr-challenge/blob/main/docs/features/delete-btns.png' alt='Delete Buttons' style="width:160px;"/>


---
8. `Persist data either in a database of your choice (make sure the documentation is clear enough for us to run it)`
  - uses postgreSQL db - documentation is available in [(/README.md)](./README.md) for dev setup
---
9. `Or give us an ERD of your database model` 
   - screenshot of ERD can be found at `/docs/db-erd.png`
---
10. `Ability to download CSV data through the web interface`
  - uses react-csv library to download a csv file for all orders with column attributes:
    - order_id
    - driver_fname
    - driver_lname
    - order_description
    - source_address
    - source_address_city
    - source_address_country
    - source_address_postal
    - destination_address
    - destination_address_city
    - destination_address_country
    - destination_address_postal
    - start_time
    - end_time
    - revenue
    - cost
  - [OrderDownload.js](./src/components/orders/OrderDownload.js)
  - <img src='https://github.com/ilaksono/rr-challenge/blob/main/docs/features/download-btn.png' alt='Delete Buttons' style="width:160px;"/>
  ---  
11. `Two users of the app can see each other’s changes in real-time`
  - uses `ws` on BE for live server messages
  - uses `WebSocket` object on FE with message handlers to update all data entities
  - [livesocket.js](./server/livesocket.js)
---
12. `Deploy the app somewhere / containerize it`
  - Netlify link: https://rr-challenge-il.netlify.app/  
  - Heroku server (for api routes) idles for ~10 seconds
  ---
13. `Ability to upload and download CSV data through the web interface`
  - trigger upload interface by clicking `Upload` button
    - [OrderUpload.js](./src/components/orders/OrderUpload.js)
    - <img src='https://github.com/ilaksono/rr-challenge/blob/main/docs/features/upload-interface.png' alt='Upload CSV Interface' style="width:400px;"/>
  - Download all orders by clicking `Download` button
---
14. `Anything else you can think of!`    
  - Added supplier, customer, address entities
    - Enables relationship between supplier <> addresses and customer <> addresses 
    - improves data integrity and reduces redundancy
  - Ability to change order's source address and destination address
  - Ability to Sort `orders` by attributes:
    - Creation date
    - Order ID
    - Departure time
    - Arrival time
    - Revenue
    - Cost
    - Revenue - Cost difference
    - Customer 
    - Supplier
  - Calculated order status and elements to display status
    - Animated dots
    - Popover legend (tooltip)
    - blue dots: order completed
      - Blue was chosen over green to prevent red-green color issues
    - red dots: order needs to be assigned
    - yellow dots: order delivery in progress
    - black: order is past-due(expired and unassigned)
