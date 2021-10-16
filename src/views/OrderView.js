import OrderList from 'components/orders/OrderList';
import UnassignedOrderList from 'components/orders/UnassignedOrderList';
import CreateOrderForm from 'components/orders/CreateOrderForm';
import { useState, useContext } from 'react';
import AppContext from 'context/AppContext';
import Modal from 'components/Modal';
import { CreateFormProvider } from 'context/CreateFormContext';
import { Button } from 'react-bootstrap';

const init = {
  driver: '',
  revenue: '',
  cost: '',
  start_time: '',
  end_time: '',
  description: '',
  supplier: '',
  customer: '',

};

const OrderView = () => {

  const [show, setShow] = useState(false)

  const {
    createModal
  } = useContext(AppContext);
  const promptToClose = () => {
    createModal(
      'Exit',
      'Exit order builder?',
      () => setShow(false),
      'Exit'
    );
  }

  return (
    <>
      <OrderList />
      <UnassignedOrderList />
      <Button
        onClick={() => setShow(true)}
      >Create</Button>
      <CreateFormProvider
        init={init}
      >
        <Modal
          show={show}
          onHide={promptToClose}
          modalTitle='Create an Order'
        >
          <CreateOrderForm />
        </Modal>
      </CreateFormProvider>
    </>
  )
}
export default OrderView;