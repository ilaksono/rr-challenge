# Additional Features

1. `Display total revenue/cost per driver`
  - this sum is displayed in each driver container at the bottom
    - revenue in green; cost in red
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
3. `Clean and visually appealing UI; thought-through UX` 
  - Simple alerts and toasts to inform users
    - success alerts and error toasts
  - Simple animations to add user enjoyability 
    - drag and dropping orders between windows
  - added scrollable windows in order forms for selecting a driver, source, and destination for orders

4. `More details about drivers and orders can be viewed and edited. You can think what other information we might be relevant to the system`
  - Added edittable supplier address information
  - Added edittable customer address information

5. `Orders have start and end times, and a driver can’t have two orders that overlap in time`
  - Every order is checked for overlapping start and end times for the driver before create/update of orders in the database
6. `Ability to create new drivers and/or orders`
  - both are available by clicking the buttons: `Create a Driver` and `Create Order`
7. `Persist data either in a database of your choice (make sure the documentation is clear enough for us to run it)`
  - uses postgres and documentation is available in README.md for dev setup
8. `Or give us an ERD of your database model` 
   - screenshot of ERD can be found at `/docs/db-erd.png`
9.    
