import OrderList from 'components/orders/OrderList';
import CreateOrderForm from 'components/orders/CreateOrderForm';
import { useState, useContext, useEffect } from 'react';
import AppContext from 'context/AppContext';
import Modal from 'components/Modal';
import { CreateFormProvider } from 'context/CreateFormContext';
import { Button } from 'react-bootstrap';
import HomeBanner from 'components/general/HomeBanner'
import { initOrderForm as init } from 'utils/initStates';

const OrderView = ({ id }) => {

  const [show, setShow] = useState(false)
  const [classList, setClassList] = useState(['order-layout']);

  const {
    drag,
    appData,
    createModal,
    handleDragDropZone,
    handleDragOverZone,
    dropZone
  } = useContext(AppContext);
  const promptToClose = () => {
    createModal(
      'Exit order builder?',
      'Exit',
      () => setShow(false),
      'Exit'
    );
  }
  
  const handleDragEvents = (e) => {
    e.preventDefault();
    if (classList.length < 2) {
      if (e.type === 'dragenter')
        setClassList(['order-layout', 'selected'])
    } else if(dropZone.on && e.type === 'dragleave' && e.target.id == ('qwe' + id)) {
      setClassList(['order-layout', 'unselected'])
    } else if(
      e.type === 'dragenter' && classList[1] === 'unselected'
    ) setClassList(['order-layout', 'selected'])
    handleDragDropZone(e, 'order', id)
  }

  useEffect(() => {
    if(!drag.hide) 
      setClassList(['driver-layout', 'unselected'])
  }, [drag])
  return (
    <div className={classList.join(' ')}
      onDragLeave={handleDragEvents}
      onDragEnter={handleDragEvents}
      onDragOver={e => handleDragOverZone(e, 'order', id)}
      id={'qwe' + id}
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
        >Create Order</Button>
        <Modal
          show={show}
          onHide={promptToClose}
          modalTitle='Order Builder'
        >
          <CreateOrderForm 
          forceClose={() => setShow(false)}
          />
        </Modal>
      </CreateFormProvider>
    </div>
  )
}
export default OrderView;