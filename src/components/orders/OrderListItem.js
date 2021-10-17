import { useState, useContext, useCallback } from 'react';
import CreateFormContext from 'context/CreateFormContext';
import AppContext from 'context/AppContext';
import * as hf from 'utils/helperFuncs';
import ax, { UNASSIGN_ORDER, UPDATE_ORDER } from 'ax';


const OrderListItem = (props) => {


  const {
    source_address_id,
    destination_address_id,
    revenue_cents,
    cost_cents,
    isNew,
    id
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
  } = useContext(AppContext);

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
      console.log(res);
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
      console.log(res);
      if (res?.length) {
        moveOrderToList(res[0], 'assigned', 'unassigned')
      }

    } catch (er) {
      createError(er.message);
    }
  }, [props])

  const handleDragStart = (e) => {
    setDrag(prev => ({
      ...prev,
      hide: true,
      id
    }))
    console.log(e, 'from item');
  }
  const handleDragEnd = (e) => {
    setDrag(prev => ({
      ...prev,
      hide: false
    }));
    if (dropZone.id && dropZone.on && dropZone.type === 'driver') {
      handleAssignToDriver(dropZone.id)
      console.log('do the thing with', dropZone.id, dropZone.type)
    } else if (dropZone.on && dropZone.type === 'order')
      handleUnassignOrder();
    // console.log(e, 'from item');
  }

  const handleClick = () => {
    setShow(true)
    initCreateForm(
      hf.determineOrderInformation(props, appData)
    );
  }

  const containerClassList = ['order-list-item'];
  if (drag.hide && drag.id === id)
    containerClassList.push('partial-hide')

  if (isNew)
    containerClassList.push('grow-animation')

  const sourceAddress = appData.addresses.hash[source_address_id] || {};
  const destinationAddress = appData.addresses.hash[destination_address_id] || {};

  return (
    <div className={containerClassList.join(' ')}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      draggable={true}
      onDragOver={(e) => e.preventDefault()}
    >
      <div>
        <div
          className='bg-image'
          style={{
            backgroundImage: "url(/images/drag.png)",
          }}
        ></div>
      </div>
      <div>

        <div>{sourceAddress.city || 'Toronto'} to {destinationAddress.city || 'Barrie'}</div>
        <div className='light-color-text'>{hf.formatOrderDate(props.start_time)} - {hf.formatOrderDate(props.end_time)}</div>
      </div>
      <table className='order-pricing-summary light-color-text'
      >
        <tr>
          <td>
            $
          </td>
          <td>
            <div className='green-color-text'>{(revenue_cents / 100).toFixed(2)}</div>
          </td>
        </tr>
        <tr>
          <td>$</td>
          <td>
            <div className='red-color-text'>{(cost_cents / 100).toFixed(2)}</div>
          </td>
        </tr>
      </table>
      <div className='thumbnail align-start'>
        <img
          src='/images/pencil.png'
          alt='Edit'
          onClick={handleClick}
        />
      </div>
    </div>

  )
}
export default OrderListItem;