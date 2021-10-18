import { Form, InputGroup, Col, Container, Row, Button } from 'react-bootstrap';
import CreateFormContext from 'context/CreateFormContext';
import { useContext, useRef, useState, useCallback } from 'react';
import ax, {
  CREATE_ORDER,
  CREATE_SUPPLIER,
  CREATE_CUSTOMER,
  CREATE_ADDRESS,
  UPDATE_ORDER
} from 'ax';
import AppContext from 'context/AppContext';
import DriverDisplayItem from 'components/drivers/DriverDisplayItem';
import SupplierDisplayItem from 'components/suppliers/SupplierDisplayItem';
import SupplierFormElements from 'components/suppliers/SupplierFormElements';
import * as hf from 'utils/helperFuncs';


const numMsUTCtoEST = 14400000

const compareObjects = (raw, model) => {
  for (const [key, value] of Object.entries(raw)) {
    if (value === model[key])
      delete raw[key];
    else if (['start_time', 'end_time'].includes(key)) {
      // console.log(new Date(value).getTime(), new Date(model[key]).getTime())
      if ((new Date(value).getTime() - numMsUTCtoEST) === new Date(model[key]).getTime()) {
        delete raw[key];
      }
    }

  }
  return raw;
}

//payload format: {address,city,state,postal,country,supplier_id,customer_id}


const CreateOrderForm = (props) => {

  const {
    forceClose
  } = props;

  const {
    createError,
    showLoadModal,
    hideLoadModal,
    appData,
    addOrderToList,
    createAlert,
    deleteOrderThenAdd,
    handleCreateCustomer,
    handleCreateSupplier,
    addAddressesList
  } = useContext(AppContext);
  const {
    createForm,
    resetCreateForm,
    setCreateForm,
    handleCreateFormChange
  } = useContext(CreateFormContext);

  const validateTimes = useCallback(() => {
    return (
      new Date(createForm.end_time).getTime() >= new Date(createForm.start_time).getTime()
    )
  }, [createForm])
  const handleSubmitEdit = useCallback(async (source_address_id, destination_address_id) => {
    console.log('editting');
    try {
      const payload = {
        cost_cents: createForm.cost * 100,
        revenue_cents: createForm.revenue * 100,
        description: createForm.description,
        start_time: createForm.start_time,
        end_time: createForm.end_time,
        // start_time: createForm.start_time,
        source_address_id,
        destination_address_id,
        driver_id: createForm.driverId
      }
      const json = compareObjects(payload, appData.orders.hash[createForm.id])
      json.id = createForm.id
      console.log(json);
      const res = await ax(UPDATE_ORDER, 'put', payload);
      console.log(res);
      if (res?.length) {
        if (!deleteOrderThenAdd(res[0]))
          deleteOrderThenAdd('unassigned')
        createAlert();
      }
      resetCreateForm();
      forceClose();
    } catch (er) {
      createError(er.message);
    }
    hideLoadModal()
  }, [createForm, addOrderToList])

  const isBooked = createForm.driverId
    && hf.isDriverBooked(
      appData.orders.assigned.list.filter(order => order.driver_id === createForm.driverId),
      createForm
    )
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (isBooked)
      return createError('This driver is booked - please select another driver, or modify the start/end times.');
    if (!createForm.supp_city || !createForm.cust_city)
      return createError('Please add city information');
    try {
      showLoadModal();

      const resSupplierAddress = await handleCreateSupplier(createForm);
      const resCustomerAddress = await handleCreateCustomer(createForm);
      const addressesList = []

      const resSupplierAddressId = resSupplierAddress.id
      const resCustomerAddressId = resCustomerAddress.id

      if (!appData.addresses.hash[resSupplierAddressId])
        addressesList.push(resSupplierAddress);
      if (!appData.addresses.hash[resCustomerAddressId])
        addressesList.push(resCustomerAddress);

      addAddressesList(addressesList)
      if (createForm.id)
        return handleSubmitEdit(resSupplierAddressId, resCustomerAddressId);
      const res = await ax(
        CREATE_ORDER,
        'post',
        {
          ...createForm,
          resSupplierAddressId,
          resCustomerAddressId
        }
      );
      if (res) {
        addOrderToList(res[0]);
        forceClose();
        resetCreateForm()
        createAlert();
      }
    } catch (er) {
      // console.log(er.message);
      createError(er.message);
    }
    hideLoadModal();
  }, [createForm, addOrderToList]);


  const handleFilterList = (list = [], str = '') => {
    if (!str)
      return list;
    return list
      .filter(item => {
        const reg = (new RegExp(str, 'ig'))
        const driverFullName = `${item.driver_fname || item.supp_fname || item.cust_fname} ${item.driver_lname || item.supp_lname || item.cust_lname}`;
        return Object.values(item).some(value => reg.test(value))
          || reg.test(driverFullName);
      });
  }


  const handleClickSupplier = (supplier_name, supplierId, address_id) => {
    if (createForm.source_address_id === address_id) {
      return setCreateForm(prev => ({
        ...prev,
        supplier_name: '',
        supplierId: 0,
        supp_address: '',
        supp_city: '',
        supp_country: '',
        supp_postal: '',
        supp_state: '',
        source_address_id: 0,
      }))
    }
    console.log(appData.addresses.hash,
      address_id,
      supplier_name,
      supplierId)
    const address = appData.addresses.hash[address_id] || {}
    // .find(address => address.supplier_id === supplierId) || {}
    setCreateForm(prev => ({
      ...prev,
      supplier_name,
      supplierId,
      supp_address: address.address,
      supp_city: address.city,
      supp_country: address.country,
      supp_postal: address.postal,
      supp_state: address.state,
      source_address_id: address_id,

    }))
  }
  const handleClickDriver = (driver_name, driverId) => {
    if (createForm.driver_name === driver_name) {
      return setCreateForm(prev => ({
        ...prev,
        driver_name: '',
        driverId: 0
      }))
    }
    setCreateForm(prev => ({
      ...prev,
      driver_name,
      driverId
    }))
  }

  const handleClickCustomer = (customer_name, customerId, address_id) => {
    if (createForm.customer_name === customer_name) {
      return setCreateForm(prev => ({
        ...prev,
        customer_name: '',
        customerId: 0,
        cust_address: '',
        cust_city: '',
        cust_country: '',
        cust_postal: '',
        cust_state: '',
        destination_address_id: 0,
      }))
    }
    const address = appData.addresses.hash[address_id] || {}

    setCreateForm(prev => ({
      ...prev,
      customer_name,
      customerId,
      cust_address: address.address,
      cust_city: address.city,
      cust_country: address.country,
      cust_postal: address.postal,
      cust_state: address.state,
      destination_address_id: address_id,
    }))
  }
  const timesValid = validateTimes();
  const parsedDrivers = handleFilterList(
    appData.drivers.list,
    createForm.driver_name
  ).map(driver => {
    const driverFullName = `${driver.driver_fname} ${driver.driver_lname}`;
    return <DriverDisplayItem
      key={driver.id}
      handleClick={() => handleClickDriver(driverFullName, driver.id)}
      selected={createForm.driverId && (createForm.driverId === driver.id)}
      {...driver}
    />
  });
  const parsedSuppliers = handleFilterList(
    appData.suppliers.list,
    createForm.supplier_name
  ).map(supplier => {
    return <SupplierDisplayItem
      key={supplier.id}
      handleClick={handleClickSupplier}
      selected={createForm.supplierId && (createForm.supplierId === supplier.id)}
      {...supplier}
    />
  });

  const parsedCustomers = handleFilterList(
    appData.customers.list,
    createForm.customer_name
  ).map(customer => {
    return <SupplierDisplayItem
      key={customer.id}
      handleClick={handleClickCustomer}
      selected={createForm.customerId && (createForm.customerId === customer.id)}
      {...customer}
      type='customer'
    />
  });

  return (
    <Form
      onSubmit={handleSubmit}
      className='create-order-form'
    >
      <Container
      >
        <div className='form-row'>
          <InputGroup className="m-2">
            <InputGroup.Text
            >Revenue $
            </InputGroup.Text>
            <Form.Control
              value={createForm.revenue || ''}
              onChange={handleCreateFormChange}
              type='text'
              name='revenue'
              placeholder={0}
            />
          </InputGroup>
          <InputGroup className="m-2">
            <InputGroup.Text
            >Cost $
            </InputGroup.Text>
            <Form.Control
              value={createForm.cost || ''}
              onChange={handleCreateFormChange}
              type='text'
              name='cost'
              placeholder='0'
            />
          </InputGroup>
        </div>
        <div className='form-row'
          style={{
            border: timesValid ? '' : '2px solid red',
            padding: timesValid ? 4 : 2
          }}
        >
          <InputGroup className="m-1">
            <InputGroup.Text
            >Start
            </InputGroup.Text>
            <Form.Control
              value={createForm.start_time || ''}
              onChange={handleCreateFormChange}
              type='datetime-local'
              name='start_time'
              placeholder={0}
            />
          </InputGroup>
          <InputGroup className="m-1">
            <InputGroup.Text
            >End
            </InputGroup.Text>
            <Form.Control
              value={createForm.end_time || ''}
              onChange={handleCreateFormChange}
              type='datetime-local'
              name='end_time'
              placeholder='0'
            />
          </InputGroup>
        </div>
        <Form.Control
          value={createForm.description}
          type='text'
          name='description'
          onChange={handleCreateFormChange}
          placeholder='Add a description'
        />
        <fieldset
          style={{
            border: isBooked ? '2px solid red' : ''
          }}

        >
          <legend>Driver</legend>
          <div className='form-row'>
            <InputGroup className="mb-2">
              {/* <InputGroup.Prepend> */}
              <InputGroup.Text
              >Search
              </InputGroup.Text>
              {/* </InputGroup.Prepend> */}
              <Form.Control
                value={createForm.driver_name || ''}
                onChange={handleCreateFormChange}
                type='text'
                name='driver_name'
                placeholder='Type a name'
              />
              {!!isBooked && 'This driver is not available at these times'}


            </InputGroup>

            <div
              className='display-container'
            >{
                parsedDrivers
              }
            </div>
          </div>
        </fieldset>
        <fieldset
          style={{
            minHeight: createForm.supplierChecked ? 180 : '',
            padding: createForm.supplierChecked ? '32px 14px 10px' : ''
          }}
        >
          <legend>Supplier</legend>
          <div className='form-row'>
            {/* <div> */}
            {
              createForm.supplierChecked ?
                <SupplierFormElements
                  createForm={createForm}
                  handleCreateFormChange={handleCreateFormChange}
                />
                :
                <>
                  <InputGroup className="mb-2 flex"

                  >
                    {/* <InputGroup.Prepend> */}
                    <InputGroup.Text
                    >Search
                    </InputGroup.Text>
                    {/* </InputGroup.Prepend> */}
                    <Form.Control
                      value={createForm.supplier_name || ''}
                      onChange={handleCreateFormChange}
                      type='text'
                      name='supplier_name'
                      placeholder='Type a name'
                    />
                  </InputGroup>

                  {/* </div> */}
                  <div
                    className='display-container'
                  >{
                      parsedSuppliers
                    }

                  </div>
                </>
            }
          </div>
          <Form.Label
            className='manual-check'
          >
            Manual input
            <Form.Check
              onClick={() => setCreateForm(prev => ({
                ...prev,
                supplierChecked: !prev.supplierChecked
              }))}
              onChange={() => { }}
              checked={createForm.supplierChecked}
            />
          </Form.Label>
        </fieldset>
        <fieldset
          style={{
            minHeight: createForm.customerChecked ? 180 : '',
            padding: createForm.customerChecked ? '32px 14px 10px' : ''
          }}
        >
          <legend>Customer</legend>
          <div className='form-row'>
            {/* <div> */}
            {
              createForm.customerChecked ?
                <SupplierFormElements
                  createForm={createForm}
                  handleCreateFormChange={handleCreateFormChange}
                  prefix='cust_'
                />
                : <>
                  <InputGroup className="mb-2 flex"
                  >
                    {/* <InputGroup.Prepend> */}
                    <InputGroup.Text
                    >Search
                    </InputGroup.Text>
                    {/* </InputGroup.Prepend> */}
                    <Form.Control
                      value={createForm.customer_name || ''}
                      onChange={handleCreateFormChange}
                      type='text'
                      name='customer_name'
                      placeholder='Type a name'
                    />
                  </InputGroup>
                  <div
                    className='display-container'
                  >{
                      parsedCustomers
                    }

                  </div>
                </>
            }
          </div>
          <Form.Label
            className='manual-check'

          >
            Manual input
            <Form.Check
              onClick={() => setCreateForm(prev => ({
                ...prev,
                customerChecked: !prev.customerChecked
              }))}
              onChange={() => { }}
              checked={createForm.customerChecked}
            />
          </Form.Label>
        </fieldset>
        <Button
          type='submit'>Submit</Button>
      </Container>
    </Form>
  )
}
export default CreateOrderForm;