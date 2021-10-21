import Modal from 'components/Modal';
import OrderList from 'components/orders/OrderList';
import AppContext from 'context/AppContext';
import CreateFormContext from 'context/CreateFormContext';
import { useContext, lazy } from 'react';
import RRLazyWrapper from 'components/general/RRLazyWrapper';
const CreateDriverForm = lazy(() => import('components/drivers/CreateDriverForm'));
const CreateOrderForm = lazy(() => import('components/orders/CreateOrderForm'));


const OrderDriverForms = ({ show, setShow,
  showOrder, setShowOrder, filteredList }) => {


  const {
    createModal,
  } = useContext(AppContext) || {};
  const {
    resetCreateForm
  } = useContext(CreateFormContext)

  const promptToClose = () => {
    createModal(
      'Exit driver builder?',
      'Exit',
      forceCloseDriver,
      'Exit'
    );
  }
  const promptToCloseOrder = () => {
    createModal(
      'Exit order builder?',
      'Exit',
      forceCloseOrder,
      'Exit'
    );
  }
  const forceCloseOrder = () => {
    resetCreateForm();
    setShowOrder(false);
  }

  const forceCloseDriver = () => {
    resetCreateForm();
    setShow(false);
  }

  return (
    <>
      <OrderList
        list={filteredList}
      />
      {
        show &&
        <Modal
          show={show}
          onHide={promptToClose}
          modalTitle='Driver Builder'
        >
          <RRLazyWrapper>
            <CreateDriverForm
              forceClose={forceCloseDriver}
            />
          </RRLazyWrapper>
        </Modal>
      }
      {
        showOrder &&
        <Modal
          show={showOrder}
          onHide={promptToCloseOrder}
          modalTitle='Order Builder'
        >
          <RRLazyWrapper>
            <CreateOrderForm
              forceClose={forceCloseOrder}
            />
          </RRLazyWrapper>
        </Modal>
      }
    </>
  )
}

export default OrderDriverForms;