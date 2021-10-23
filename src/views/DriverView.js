import { lazy, useState, useEffect, useContext } from 'react';
import AppContext from 'context/AppContext';
import { CreateFormProvider } from 'context/CreateFormContext';
import { Button, Form } from 'react-bootstrap';
import * as hf from 'utils/helperFuncs';
import DeleteIcon from 'components/general/DeleteIcon';
import ax, { UNASSIGN_ORDERS, DELETE_DRIVER } from 'ax';
import RRLazyWrapper from 'components/general/RRLazyWrapper';
import TotalRevenueCost from 'components/drivers/TotalRevenueCost';
const OrderDriverForms = lazy(() => import('components/orders/OrderDriverForms'));
const init = {
  fname: '',
  lname: '',
  make: '',
  model: '',
  year: 2020,
  driver_insurance: ''
};


const DriverView = ({ id, driverIndex, fullName }) => {

  const [show, setShow] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [classList, setClassList] = useState(['driver-layout']);


  const {
    drag,
    appData = {},
    dropZone,
    createModal,
    createError,
    handleDragDropZone,
    handleDragOverZone,
    modifyDriverView,
    updateUnassignedOrders,
    deleteDriverAppData
  } = useContext(AppContext) || {};


  const handleDragEvents = (e) => {
    // e.preventDefault();
    if (classList.length < 2) {
      if (e.type === 'dragenter')
        setClassList(['driver-layout', 'selected'])
    } else if (dropZone.on && e.type === 'dragleave' && e.target.id == ('asd' + id)) {
      setClassList(['driver-layout', 'unselected'])
    } else if (
      e.type === 'dragenter' && classList[1] === 'unselected'
    ) setClassList(['driver-layout', 'selected'])

    handleDragDropZone(e, 'driver', id)
  }

  const promptDelete = () => {
    createModal(`Delete Driver - ${fullName}`, 'Delete', handleClickDelete, 'Confirm')
  }

  const handleClickDelete = async () => {
    try {
      const res = await ax(UNASSIGN_ORDERS, 'put', {
        driver_id: id
      });
      if (res?.length) {
        updateUnassignedOrders(
          res
        )
      }
      const resDriverDelete = await ax(DELETE_DRIVER, 'put', {
        driver_id: id
      });
      if (resDriverDelete?.length) {
        deleteDriverAppData(resDriverDelete[0].id);
      }

    } catch (er) {
      createError('Order not deleted')
    }
  }

  const filteredList = appData.orders.assigned?.list?.filter(order => order.driver_id === id)

  const driverOptions = appData.drivers.list.map(driver =>
    <option
      key={driver.id}
      value={driver.id}
      selected={driver.id === id}
    >{hf.formatFullName(driver.driver_fname, driver.driver_lname)} (dr_{driver.id})
    </option>)


  useEffect(() => {
    if (!drag.hide)
      setClassList(['driver-layout', 'unselected'])
  }, [drag])


  return (
    <section className={classList.join(' ')}
      onDragLeave={handleDragEvents}
      onDragEnter={handleDragEvents}
      onDragOver={e => handleDragOverZone(e, 'driver', id)}
      id={'asd' + id}
    >
      <div className='view-header flex'>
        <div
          className='vert-align-header'
        >Driver:
        </div>
        <br />
        <a data-toggle='tooltip'
        titl={appData.drivers.hash[id]?.driver_insurance}
        >
        <Form.Control
          as='select'
          onChange={e => modifyDriverView(driverIndex, e.target.value)}
        >{driverOptions}
        </Form.Control>
        </a>
      </div>

      <CreateFormProvider
        init={init}
        show={showOrder}
        setShow={setShowOrder}
      >
        <RRLazyWrapper>
          <OrderDriverForms
            show={show}
            setShow={setShow}
            showOrder={showOrder}
            setShowOrder={setShowOrder}
            filteredList={filteredList}
          />
        </RRLazyWrapper>
      </CreateFormProvider>
      <Button
        onClick={() => setShow(true)}
      >
        Create a Driver
      </Button>
      <TotalRevenueCost
      filteredList={filteredList}
      />
      <DeleteIcon
        className='delete-icon-driver'
        tooltip='Delete driver'
        handleClickDelete={promptDelete}
      />
    </section>
  )
}
export default DriverView;