import OrderList from 'components/orders/OrderList';
import { useState, useEffect, useContext } from 'react';
import AppContext from 'context/AppContext';
import Modal from 'components/Modal';
import { CreateFormProvider } from 'context/CreateFormContext';
import CreateDriverForm from 'components/drivers/CreateDriverForm';
import { Button, Form } from 'react-bootstrap';
import CreateOrderForm from 'components/orders/CreateOrderForm';
import * as hf from 'utils/helperFuncs';

const init = {
  fname: '',
  lname: '',
  make: '',
  model: '',
  year: ''
};


const DriverView = ({ id, driverIndex, fullName }) => {

  const [show, setShow] = useState(false);
  // const [drag, setDrag] = useState(false)
  const [showOrder, setShowOrder] = useState(false);
  const [classList, setClassList] = useState(['driver-layout']);


  const {
    drag,
    createError,
    createModal,
    appData,
    dropZone,
    handleDragDropZone,
    handleDragOverZone,
    modifyDriverView
  } = useContext(AppContext);

  const promptToClose = () => {
    createModal(
      'Exit driver builder?',
      'Exit',
      () => setShow(false),
      'Exit'
    );
  }
  const promptToCloseOrder = () => {
    createModal(
      'Exit order builder?',
      'Exit',
      () => setShowOrder(false),
      'Exit'
    );
  }
  

  useEffect(() => {
    if(!drag.hide) 
      setClassList(['driver-layout', 'unselected'])
  }, [drag])
  const handleDragEvents = (e) => {
    e.preventDefault();
    if (classList.length < 2) {
      if (e.type === 'dragenter')
        setClassList(['driver-layout', 'selected'])
    } else if(dropZone.on && e.type === 'dragleave' && e.target.id == ('asd' + id)) {
      setClassList(['driver-layout', 'unselected'])
    } else if(
      e.type === 'dragenter' && classList[1] === 'unselected'
    ) setClassList(['driver-layout', 'selected'])
    handleDragDropZone(e, 'driver', id)
  }

  // const { driver_fname, driver_lname } = appData.drivers.hash[id] || {};
  // console.log(driver_fname);

  // if()
  // const containerClassList = ['driver-layout'];
  // if (dropZone.id === id && dropZone.on) {
  //   containerClassList.push('selected')
  // }
  // if()
  const driverOptions = appData.drivers.list.map(driver =>
    <option
      key={driver.id}
      value={driver.id}
      selected={driver.id === id}
    >{hf.formatFullName(driver.driver_fname, driver.driver_lname)}
    </option>)
  return (
    <div className={classList.join(' ')}
      onDragLeave={handleDragEvents}
      onDragEnter={handleDragEvents}
      onDragOver={e => handleDragOverZone(e, 'driver', id)}
      id={'asd' + id}
    >
      <div className='view-header'>
        Driver
        <br />
        <Form.Control
          as='select'
          // defaultValue={fullName}
          onChange={e => modifyDriverView(driverIndex, e.target.value)}
        >{driverOptions}
        </Form.Control>
      </div>
      <CreateFormProvider
        init={init}
        show={showOrder}
        setShow={setShowOrder}
      >
        <OrderList
          list={appData.orders.assigned?.list?.filter(order => order.driver_id === id)}
        />
        <Modal
          show={show}
          onHide={promptToClose}
          modalTitle='Create a Driver'
        >
          <CreateDriverForm
            forceClose={() => setShow(false)}
          />
        </Modal>
        <Modal
          show={showOrder}
          onHide={promptToCloseOrder}
          modalTitle='Order Builder'
        >
          <CreateOrderForm
            forceClose={() => setShowOrder(false)}
          // {...}
          />
        </Modal>
      </CreateFormProvider>
      <Button
        onClick={() => setShow(true)}
      >
        Create a Driver
      </Button>
    </div>
  )
}
export default DriverView;