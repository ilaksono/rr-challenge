import OrderList from 'components/orders/OrderList';
import CreateOrderForm from 'components/orders/CreateOrderForm';
import { useState, useContext } from 'react';
import AppContext from 'context/AppContext';
import Modal from 'components/Modal';
import { CreateFormProvider } from 'context/CreateFormContext';
import { Button } from 'react-bootstrap';
import HomeBanner from 'components/general/HomeBanner'
import { initOrderForm as init } from 'utils/initStates';

const OrderView = ({ id }) => {

  const [show, setShow] = useState(false)

  const {
    appData,
    createModal,
    handleDragDropZone,
    handleDragOverZone
  } = useContext(AppContext);
  const promptToClose = () => {
    createModal(
      'Exit order builder?',
      'Exit',
      () => setShow(false),
      'Exit'
    );
  }

  return (
    <div className='order-layout'
      onDragLeave={e => handleDragDropZone(e, 'order', id)}
      onDragEnter={e => handleDragDropZone(e, 'order', id)}
      onDragOver={e => handleDragOverZone(e, 'order', id)}
    >
      <div className='view-header'>
        Unassigned Orders
      </div>
      <div className='view-header rr-flex-row'>
        <div>
          Source to Destination 
          </div>
          <div>Revenue | Cost</div>
      </div>
      <CreateFormProvider
        init={init}
        show={show}
        setShow={setShow}
      >
        <OrderList
          list={appData.orders.unassigned.list}

        />
        <Button
          onClick={() => setShow(true)}
        >Create</Button>
        <Modal
          show={show}
          onHide={promptToClose}
          modalTitle='Create an Order'
        >
          <CreateOrderForm />
        </Modal>
      </CreateFormProvider>
    </div>
  )
}
export default OrderView;