import OrderList from 'components/orders/OrderList';
import { useState, useEffect, useContext } from 'react';
import AppContext from 'context/AppContext';
import Modal from 'components/Modal';
import { CreateFormProvider } from 'context/CreateFormContext';
import CreateDriverForm from 'components/drivers/CreateDriverForm';
import { Button } from 'react-bootstrap';

const init = {
  fname: '',
  lname: '',
  make: '',
  model: '',
  year: ''
};

const DriverView = () => {

  const [show, setShow] = useState(false);

  const {
    createError,
    createModal
  } = useContext(AppContext);

  const promptToClose = () => {
    createModal(
      'Exit driver builder?',
      'Exit',
      () => setShow(false),
      'Exit'
    );
  }
  const handleEvent = (e, type) => {
    e.preventDefault()
    // console.log(e.buttons);
    if (e.buttons) {
      console.log(e, type)

    }
  }

  useEffect(() => {
    // createError('hi')
  }, [])
  return (
    <div>
      <OrderList />
      <div style={{
        border: '1px solid red',
        width: 300,
        height: 300
      }}
        onDragLeave={e => handleEvent(e, 'drag leave')}
        onDragEnter={e => handleEvent(e, 'drag over')}
        onDrop={e => handleEvent(e, 'drop')}
      // draggable={true}
      >

      </div>
      <CreateFormProvider
        init={init}
      >
        <Modal
          show={show}
          onHide={promptToClose}
          modalTitle='Create a Driver'
        >
          <CreateDriverForm />
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