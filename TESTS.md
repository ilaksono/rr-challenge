# Unit Tests
  1. app should start & build successfully; going to the correct url should connect to the app
    - browser.connect('localhost:3000')
    - waitForText('OnlyTrans')
    - if (isOnPage('OnlyTrans')) -> test is successful

  - Before all next tests - connect to app & wait for page to load;
  
  2. should render order list items
    - waitForElementWithClass('order-list-item')
    - success if element renders

  3. order list items should not be empty
    - render OrderListItem with dummy props
    - assert text inside OrderListItem to match cities and times in props
    - if (assert) success

  4. clicking Create a Driver button should open Driver Builder
    - selectElementWithText('Create a Driver')
    - Click element
    - wait for element with text 'Driver Builder' to show
    - if (element) success

  5. clicking Create Order button should open Order Builder
    - selectElementWithText('Create Order')
    - Click element
    - wait for element with text 'Order Builder' to show
    - if (element) success

  - Testing helper functions - in `utils/helperFuncs`

  6. formatDate takes 1 Date string, number, or object argument and should return a string in the form of '3 minutes ago'
    - formatDate(undefined) should return empty string
    - formatDate(false) should return empty string
    - formatDate(0) should return a string  like '51 years ago'
    - formatDate('2021-10-16T12:00:00') should return a string like '1 day ago'
    - formatDate(Date('2021-10-16T12:00:00')) should return the same result as the previous

  7. determineOrderInformation takes 2 arguments: the first is an object reference with type:
  {
    id,
    end_time,
    start_time,
    source_address_id,
    destination_address_id,
    revenue_cents,
    cost_cents,
    description,
    driver_id
  }
  the second is a large object reference which acts as a global store state - providing 1. an existing order and 2. the global state containing the supplier, customer and driver in the order should return an object of type - where none of the values are (undefined); empty string is acceptable
  {
    id,
    source_address_id,
    destination_address_id,
    revenue_cents,
    cost_cents,
    description,
    driver_id
    end_time, 
    start_time,
    supplier_name,
    customer_name,
    driver_name,
    driverId,
    supplierId,
    customerId,
    supp_address,
    supp_city,
    supp_state,
    supp_country,
    supp_postal,
    cust_address,
    cust_city,
    cust_state,
    cust_country,
    cust_postal,
    supplierCheckedfalse,
    customerCheckedfalse,
    revenue,
    cost
  }

  8. formatFullName simply takes 2 strings and returns a string that  separates the 2 values by a space
    - formatFullName('Test', 'Driver') should return 'Test Driver'
    - formatFullName(undefined, undefined) should return ' '

  9. transformDateFormat takes a date string, number or object and returns a string of the date in the form of '2021-10-17T00:00' with 16 characters
    - assert(transformDateFormat(validDate).length).isEqualTo(16)
    - assert(transformDateFormat(undefined).length).isEqualTo(0);
  10. formatOrderDate takes a date string, number or object and returns a string in the form of '09:30' or '16:30' representing 'hh:mm'
    - assert(formatOrderDate(validDate).length).isEqualTo(5) 
    - assert(formatOrderDate(undefined).length).isEqualTo(0) 