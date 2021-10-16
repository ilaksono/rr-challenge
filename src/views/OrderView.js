import OrderList from 'components/orders/OrderList';
import UnassignedOrderList from 'components/orders/UnassignedOrderList';
import CreateOrderForm from 'components/orders/CreateOrderForm';
import { useState, useContext } from 'react';
import AppContext from 'context/AppContext';
import Modal from 'components/Modal';
import { CreateFormProvider } from 'context/CreateFormContext';
import { Button } from 'react-bootstrap';

const init = {
  driver_name: '',
  revenue: 0,
  cost: 0,
  start_time: new Date().toJSON().slice(0, 16),
  end_time: new Date().toJSON().slice(0, 16),
  description: '',
  supplier_name: '',
  customer_name: '',
  cust_fname: '',
  cust_lname: '',
  supp_fname: '',
  supp_lname: '',
  driverId: 0,
  supplierId: 0,
  customerId: 0,
  supplierChecked: false,
  customerChecked: false,
  supp_address: '',
  supp_city: '',
  supp_postal: '',
  supp_country: '',
  supp_state: '',
  cust_address: '',
  cust_city: '',
  cust_postal: '',
  cust_country: '',
  cust_state: '',

  

};

const OrderView = () => {

  const [show, setShow] = useState(false)

  const {
    appData,
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
    <div className='order-layout'>
      <OrderList 
      list={appData.orders.unassigned.list}
      />
      {/* <UnassignedOrderList /> */}
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
    </div>
  )
}
export default OrderView;