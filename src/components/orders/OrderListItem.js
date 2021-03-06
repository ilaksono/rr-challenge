import React, { useContext, useCallback } from 'react';
import CreateFormContext from 'context/CreateFormContext';
import AppContext from 'context/AppContext';
import * as hf from 'utils/helperFuncs';
import ax, {
  UNASSIGN_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER
} from 'ax';
import DeleteIcon from 'components/general/DeleteIcon';
import { OverlayTrigger } from 'react-bootstrap';
import RRLazyWrapper from 'components/general/RRLazyWrapper';
import AddressPopover from 'components/popovers/AddressPopover';
import OrderTimePopover from '../popovers/OrderTimePopover';
import CompanyPopover from 'components/popovers/CompanyPopover';
import TimeLegendPopover from 'components/popovers/TimeLegendPopover';


const OrderListItem = (props) => {

  const {
    source_address_id,
    destination_address_id,
    revenue_cents,
    cost_cents,
    isNew,
    id,
    driver_id,
    start_time,
    end_time,
    description
  } = props;

  // const [drag, setDrag] = useState(init)
  const {
    setShow,
    initCreateForm,
  } = useContext(CreateFormContext);

  const {
    drag,
    setDrag,
    appData = {},
    dropZone,
    createError,
    moveOrderToList,
    deleteOrderThenAdd,
    deleteOrder,
    createModal
  } = useContext(AppContext) || {};

  const promptDelete = () => {
    createModal(
      'Delete order?',
      'Delete',
      handleClickDelete,
      'Confirm'
    );
  }

  const handleClickDelete = async () => {
    try {
      const res = await ax(DELETE_ORDER, 'put', {
        order_id: id
      });
      if (res?.length) {
        deleteOrder(
          res[0].id,
          driver_id ? 'assigned' : 'unassigned'
        )
      }
    } catch (er) {
      createError('Order not deleted')
    }
  }

  const handleAssignToDriver = useCallback(async (driver_id) => {
    const isBooked = hf.isDriverBooked(
      appData.orders.assigned.list.filter(order => order.driver_id === dropZone.id),
      props
    )
    if (isBooked)
      return createError('The driver is booked during that order');

    try {
      const res = await ax(UPDATE_ORDER, 'put', {
        id: props.id,
        driver_id
      })
      if (res?.length) {
        if (props.driver_id)
          deleteOrderThenAdd(res[0])
      }

    } catch (er) {
      createError(er.message);
    }
  }, [props])
  const handleUnassignOrder = useCallback(async () => {
    try {
      const res = await ax(UNASSIGN_ORDER, 'put', {
        order_id: props.id,
      })
      if (res?.length) {
        moveOrderToList(res[0], 'assigned', 'unassigned')
      }

    } catch (er) {
      createError(er.message);
    }
  }, [props])

  const handleDragStart = useCallback(() => {
    setDrag(prev => ({
      ...prev,
      hide: true,
      id
    }))
  }, [drag])
  const handleDragEnd = useCallback(() => {
    setDrag(prev => ({
      ...prev,
      hide: false
    }));
    if (dropZone.id && dropZone.on && dropZone.type === 'driver') {
      if (dropZone.id == driver_id)
        return;
      handleAssignToDriver(dropZone.id)
    } else if (dropZone.on && dropZone.type === 'order') {
      if (!driver_id)
        return;
      handleUnassignOrder();
    }
    if (!dropZone.id && dropZone.on && dropZone.type === 'driver')
      createError('Please select/add a driver');
    // console.log(e, 'from item');
  }, [drag, dropZone, createError, props]);

  const handleClick = useCallback(() => {
    setShow(true)
    initCreateForm(
      hf.determineOrderInformation(props, appData)
    );
  }, [props, appData]);

  const containerClassList = ['order-list-item'];

  if (drag.hide && drag.id === id)
    containerClassList.push('partial-hide')
  if (isNew)
    containerClassList.push('grow-animation')

  const transitIndicatorClass = ['transit-indicator', 'transit-completed']
  const inTransitClass = hf.inTransitClass(props);

  transitIndicatorClass[1] = inTransitClass

  const sourceAddress = appData.addresses.hash[source_address_id] || {};
  const destinationAddress = appData.addresses.hash[destination_address_id] || {};

  return (
    <RRLazyWrapper>
      <li
        className={containerClassList.join(' ')}
        onDragStart={handleDragStart}
        // onDragEnd={handleDragEnd}
        draggable={true}
        onDragEndCapture={handleDragEnd}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className='order-id light-color-text'>
          <a
            data-toggle='tooltip'
            title={`description: ${description || 'none'}`}
          >
            or_{id}
          </a>
        </div>
        <a data-toggle='tooltip'
          title='Drag and assign to a driver'
          href="#"
        >
          <div
            className='bg-image'
            style={{
              backgroundImage: "url(/images/drag.png)",
            }}
          ></div>
        </a>
        <OverlayTrigger
          overlay={
            <TimeLegendPopover
            />
          }>
          <a
            data-toggle='tooltip'
            title={hf.kebobToTitle(transitIndicatorClass[1])}
          >
            <div className={transitIndicatorClass.join(' ')}></div>
          </a>
        </OverlayTrigger>
        <div className='order-item-content'>

          <div className='flex'>
            <OverlayTrigger
              
              overlay={
                <AddressPopover
                  {...sourceAddress}
                  type='source'
                />
              }>
              <div className='text-center'>
                {sourceAddress.city || 'Toronto'}
              </div>
            </OverlayTrigger>
            <div className='conjugator-center'>
            &nbsp;to&nbsp;
            </div>
            <OverlayTrigger
              
              overlay={
                <AddressPopover
                  {...destinationAddress}
                  type='destination'
                />
              }>
              <div className='text-center'>
                {destinationAddress.city || 'Barrie'}
              </div>
            </OverlayTrigger>
          </div>
          <OverlayTrigger
            
            overlay={
              <OrderTimePopover
                start_time={start_time}
                end_time={end_time}
                status={hf.kebobToTitle(transitIndicatorClass[1])}
              />
            }>
            <div className='light-color-text flex'>
              {hf.formatOrderDate(props.start_time)} - {hf.formatOrderDate(props.end_time)}
            </div>
          </OverlayTrigger>
        </div>
        <table className='order-pricing-summary light-color-text'
        >
          <tbody>
            <OverlayTrigger
              
              overlay={
                <CompanyPopover
                  fname={appData.suppliers.hash[sourceAddress.supplier_id]?.supp_fname}
                  lname={appData.suppliers.hash[sourceAddress.supplier_id]?.supp_lname}
                  type='Supplier'
                  amount={(revenue_cents / 100).toFixed(2)}
                />
              }>
              <tr>
                <td>
                  $
                </td>
                <td>
                  <div className='green-color-text'>{(revenue_cents / 100).toFixed(2)}</div>
                </td>
              </tr>
            </OverlayTrigger>
            <OverlayTrigger
              
              overlay={
                <CompanyPopover
                  fname={appData.customers.hash[destinationAddress.customer_id]?.cust_fname}
                  lname={appData.customers.hash[destinationAddress.customer_id]?.cust_lname}
                  type='Customer'
                  amount={(cost_cents / 100).toFixed(2)}
                />
              }>
              <tr>
                <td>$</td>
                <td>
                  <div className='red-color-text'>{(cost_cents / 100).toFixed(2)}</div>
                </td>
              </tr>
            </OverlayTrigger>
          </tbody>
        </table>
        <div className='align-start order-icon-container'>
          <a className='thumbnail'
            data-toggle='tooltip'
            title='Edit order'
            href="#"
          >
            <img
              src='/images/pencil.png'
              alt='Edit'
              onClick={handleClick}
            />
          </a>
          <DeleteIcon
            handleClickDelete={promptDelete}
          />
        </div>
      </li>
    </RRLazyWrapper>
  )
}
export default OrderListItem;