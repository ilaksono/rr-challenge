import OrderList from 'components/orders/OrderList';
import { useState, useEffect, useContext } from 'react';
import AppContext from 'context/AppContext';
import Modal from 'components/Modal';
import { CreateFormProvider } from 'context/CreateFormContext';
import CreateDriverForm from 'components/drivers/CreateDriverForm';
import { Button } from 'react-bootstrap';
import CreateOrderForm from 'components/orders/CreateOrderForm';
const init = {
  fname: '',
  lname: '',
  make: '',
  model: '',
  year: ''
};

const initDrag = {

}

const DriverView = ({ id }) => {

  const [show, setShow] = useState(false);
  // const [drag, setDrag] = useState(false)
  const [showOrder, setShowOrder] = useState(false);
  const {
    createError,
    createModal,
    appData,
    dropZone,
    handleDragDropZone,
    handleDragOverZone
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
  const handleEvent = (e, type) => {

  }

  useEffect(() => {
    // createError('hi')
  }, [])

  const driver = appData.drivers.hash[id] || {};

  const containerClassList = ['driver-layout'];
  // if()
  return (
    <div className='driver-layout'
      onDragLeave={e => handleDragDropZone(e, 'driver', id)}
      onDragEnter={e => handleDragDropZone(e, 'driver', id)}
      onDragOver={e => handleDragOverZone(e, 'driver', id)}
    >
      <div className='view-header'>
        Driver - {driver.driver_fname} {driver.driver_lname}
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
          modalTitle='Create an Order'
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
        Create
      </Button>
    </div>
  )
}
export default DriverView;