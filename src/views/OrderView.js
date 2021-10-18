import { useState, useContext, useEffect } from 'react';
import AppContext from 'context/AppContext';
import HomeBanner from 'components/general/HomeBanner'
import { initOrderForm as init } from 'utils/initStates';
import OrderFormModal from 'components/orders/OrderFormModal';
import { CreateFormProvider } from 'context/CreateFormContext';
import OrderDownload from 'components/orders/OrderDownload';
const OrderView = ({ id }) => {

  const [show, setShow] = useState(false)
  const [classList, setClassList] = useState(['order-layout']);

  const {
    drag,
    handleDragDropZone,
    handleDragOverZone,
    dropZone,
  } = useContext(AppContext);


  const handleDragEvents = (e) => {
    e.preventDefault();
    if (classList.length < 2) {
      if (e.type === 'dragenter')
        setClassList(['order-layout', 'selected'])
    } else if (dropZone.on && e.type === 'dragleave' && e.target.id == ('qwe' + id)) {
      setClassList(['order-layout', 'unselected'])
    } else if (
      e.type === 'dragenter' && classList[1] === 'unselected'
    ) setClassList(['order-layout', 'selected'])
    handleDragDropZone(e, 'order', id)
  }

  useEffect(() => {
    if (!drag.hide)
      setClassList(['order-layout', 'unselected'])
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
        <OrderFormModal
          show={show}
          setShow={setShow}
        />
      </CreateFormProvider>
      <OrderDownload 
      
      />


    </div>
  )
}
export default OrderView;