import React, { useState, useContext, useCallback } from 'react';
import CreateFormContext from 'context/CreateFormContext';
import AppContext from 'context/AppContext';
import * as hf from 'utils/helperFuncs';
import ax, {
  UNASSIGN_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER
} from 'ax';
import DeleteIcon from 'components/general/DeleteIcon';
import { AddressPopover } from 'components/suppliers/SupplierDisplayItem';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import RRLazyWrapper from 'components/general/RRLazyWrapper';

export const CompanyPopover = React.forwardRef(
  ({ popper, children, show: _, ...props }, ref) => {
    return (
      <Popover ref={ref} body {...props}>
        <div><span className='light-color-text'>name: </span>{props.fname} {props.lname}</div>
        <div><span className='light-color-text'>amount: </span>${props.amount}</div>
        <div><span className='light-color-text'>type: </span>{props.type}</div>
      </Popover>
    );
  },
);

const OrderTimePopover = React.forwardRef(
  ({ popper, children, show: _, ...props }, ref) => {
    return (
      <Popover ref={ref} body {...props}>
        <div><span className='light-color-text'>start time: </span>{hf.formatMDTimeShort(props.start_time)}</div>
        <div><span className='light-color-text'>end time: </span>{hf.formatMDTimeShort(props.end_time)}</div>
        <div><span className='light-color-text'>status: </span>{props.status}</div>
      </Popover>
    );
  },
);
const TimeLegendPopover = React.forwardRef(
  ({ popper, children, show: _, ...props }, ref) => {
    const listNames = [
      'transit-completed',
      'in-transit',
      'not-in-transit',
      'transit-past-due'
    ]
    return (
      <Popover ref={ref} body {...props} list={listNames}>
        <div
          style={{
            width: 200,
            height: 100

          }}
        >

          {listNames.map(each =>
            <div
              key={each}
              className='position-relative'>
              <div className={`transit-indicator ${each}`}>
              </div>
              <div className='transit-indicator-text'>{hf.kebobToTitle(each)}</div>
            </div>
          )}
        </div>
      </Popover>
    );
  },
);

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
    end_time
  } = props;

  // const [drag, setDrag] = useState(init)
  const {
    setShow,
    initCreateForm,
  } = useContext(CreateFormContext);

  const {
    drag,
    setDrag,
    appData,
    dropZone,
    createError,
    moveOrderToList,
    deleteOrderThenAdd,
    deleteOrder,
    createModal
  } = useContext(AppContext);

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
        if (!props.driver_id)
          moveOrderToList(res[0])
        else if (props.driver_id)
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
  if(id === 51)
    console.log(new Date(), new Date(start_time), new Date(end_time))

    console.log(new Date().toJSONLocal(), id)
  return (
    <RRLazyWrapper>
      <li
        className={containerClassList.join(' ')}
        onDragStart={handleDragStart}
        // onDragEnd={handleDragEnd}
        // onMouseUp={() => console.log('mouse up')}
        draggable={true}
        onDragEndCapture={handleDragEnd}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className='order-id light-color-text'>or_{id}</div>
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
          triger='hover'
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
        <div>

          <div className='flex'>
            <OverlayTrigger
              triger='hover'
              overlay={
                <AddressPopover
                  {...sourceAddress}
                />
              }>
              <div>
                {sourceAddress.city || 'Toronto'}
              </div>
            </OverlayTrigger>
            &nbsp;to&nbsp;
            <OverlayTrigger
              triger='hover'
              overlay={
                <AddressPopover
                  {...destinationAddress}
                />
              }>
              <div>
                {destinationAddress.city || 'Barrie'}
              </div>
            </OverlayTrigger>
          </div>
          <OverlayTrigger
            triger='hover'
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
              triger='hover'
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
              triger='hover'
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