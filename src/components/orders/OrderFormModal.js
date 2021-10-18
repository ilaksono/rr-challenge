import { Button } from 'react-bootstrap';
import CreateOrderForm from 'components/orders/CreateOrderForm';
import OrderList from 'components/orders/OrderList';
import { useState, useContext, useEffect } from 'react';
import AppContext from 'context/AppContext';
import CreateFormContext from 'context/CreateFormContext';
import Modal from 'components/Modal';

const OrderFormModal = ({ show, setShow }) => {


  const {
    appData,
    createModal
  } = useContext(AppContext);
  
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
        <Modal
          show={show}
          onHide={promptToClose}
          modalTitle='Order Builder'
        >
          <CreateOrderForm 
          forceClose={forceClose}
          />
        </Modal>
        </>
  )
}
export default OrderFormModal;