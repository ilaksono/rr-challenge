import { Button } from 'react-bootstrap';
import OrderList from 'components/orders/OrderList';
import { useContext, lazy } from 'react';
import AppContext from 'context/AppContext';
import CreateFormContext from 'context/CreateFormContext';
import Modal from 'components/Modal';
import RRLazyWrapper from 'components/general/RRLazyWrapper';
const CreateOrderForm = lazy(() => import('components/orders/CreateOrderForm'));

const OrderFormModal = ({ show, setShow }) => {


  const {
    appData = {},
    createModal
  } = useContext(AppContext) || {};

  const {
    resetCreateForm
  } = useContext(CreateFormContext);

  const promptToClose = () => {
    createModal(
      'Exit order builder?',
      'Exit',
      forceClose,
      'Exit'
    );
  }
  const forceClose = () => {
    setShow(false);
    resetCreateForm()
  }
  return (
    <>
      <OrderList
        list={appData.orders.unassigned.list}

      />
      <Button
        onClick={() => setShow(true)}
      >Create Order</Button>
      {
        show &&
        <Modal
          show={show}
          onHide={promptToClose}
          modalTitle='Order Builder'
        >
          <RRLazyWrapper>
            <CreateOrderForm
              forceClose={forceClose}
            />
          </RRLazyWrapper>
        </Modal>
      }
    </>
  )
}
export default OrderFormModal;