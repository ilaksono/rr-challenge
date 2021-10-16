import { Form, InputGroup, Col, Container, Row, Button } from 'react-bootstrap';
import CreateFormContext from 'context/CreateFormContext';
import { useContext, useRef, useState, useCallback } from 'react';
import ax, { CREATE_DRIVER } from 'ax';
import AppContext from 'context/AppContext';
import DriverDisplayItem from 'components/drivers/DriverDisplayItem';
import SupplierDisplayItem from 'components/suppliers/SupplierDisplayItem';
import SupplierFormElements from 'components/suppliers/SupplierFormElements';

const yearsArr = () => {
  const arr = [];
  for (let i = 2021; i > 1900; i--) {
    arr.push(i);
  }
  return arr;
}

const CreateOrderForm = () => {

  const {
    createError,
    addDriverToList,
    showLoadModal,
    hideLoadModal,
    appData
  } = useContext(AppContext);
  const {
    createForm,
    setCreateForm,
    handleCreateFormChange
  } = useContext(CreateFormContext);
  const [yearOptions, setYearOptions] = useState(() => yearsArr());

  const validateTimes = useCallback(() => {
    return (
      new Date(createForm.end_time).getTime() >= new Date(createForm.start_time).getTime()
    )
  }, [createForm])
  console.log(validateTimes());
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    console.log(createForm);

    try {
      showLoadModal();
      const res = await ax(
        CREATE_DRIVER,
        'post',
        createForm
      );
      console.log(res);
      if (res) {
        addDriverToList(res[0]);
      }
    } catch (er) {
      // console.log(er.message);
      createError(er.message);
    }
    hideLoadModal();
  }, [createForm]);

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
    const supplierFullName = `${supplier.supp_fname} ${supplier.supp_lname}`;
    return <SupplierDisplayItem
      key={supplier.id}
      handleClick={() => handleClickSupplier(supplierFullName, supplier.id)}
      selected={createForm.supplierId && (createForm.supplierId === supplier.id)}
      {...supplier}
    />
  });

  const parsedCustomers = handleFilterList(
    appData.customers.list,
    createForm.customer_name
  ).map(customer => {
    const customerFullName = `${customer.cust_fname} ${customer.cust_lname}`;
    return <SupplierDisplayItem
      key={customer.id}
      handleClick={() => handleClickCustomer(customerFullName, customer.id)}
      selected={createForm.customerId && (createForm.customerId === customer.id)}
      {...customer}
    />
  });

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
  const handleClickSupplier = (supplier_name, supplierId) => {
    if (createForm.supplier_name === supplier_name) {
      return setCreateForm(prev => ({
        ...prev,
        supplier_name: '',
        supplierId: 0
      }))
    }
    setCreateForm(prev => ({
      ...prev,
      supplier_name,
      supplierId
    }))
  }
  const handleClickCustomer = (customer_name, customerId) => {
    if (createForm.customer_name === customer_name) {
      return setCreateForm(prev => ({
        ...prev,
        customer_name: '',
        customerId: 0
      }))
    }
    setCreateForm(prev => ({
      ...prev,
      customer_name,
      customerId
    }))
  }



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
            >Start Time
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
            >End Time
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
        <fieldset

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
                  <InputGroup className="mb-2"
                    style={{
                      display: 'flex'
                    }}
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
                  <InputGroup className="mb-2"
                    style={{
                      display: 'flex'
                    }}
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
            style={{
              position: 'absolute',
              bottom: 12,
              left: 32,
              whiteSpace: 'nowrap'
            }}
          >
            Manual input
            <Form.Check
              onClick={() => setCreateForm(prev => ({
                ...prev,
                customerChecked: !prev.customerChecked
              }))}
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