import CreateDriverForm from 'components/drivers/CreateDriverForm';
import CreateOrderForm from 'components/orders/CreateOrderForm';
import Modal from 'components/Modal';
import OrderList from 'components/orders/OrderList';
import AppContext from 'context/AppContext';
import CreateFormContext from 'context/CreateFormContext';
import { useContext } from 'react';

const OrderDriverForms = ({ show, setShow,
  showOrder, setShowOrder, filteredList }) => {


  const {
    createModal,
  } = useContext(AppContext);
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
      <Modal
        show={show}
        onHide={promptToClose}
        modalTitle='Driver Builder'
      >
        <CreateDriverForm
          forceClose={forceCloseDriver}
        />
      </Modal>
      <Modal
        show={showOrder}
        onHide={promptToCloseOrder}
        modalTitle='Order Builder'
      >
        <CreateOrderForm
          forceClose={forceCloseOrder}
        // {...}
        />
      </Modal>
    </>
  )
}

export default OrderDriverForms;