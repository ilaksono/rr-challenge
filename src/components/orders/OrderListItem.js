import { useState, useContext, useCallback } from 'react';
import CreateFormContext from 'context/CreateFormContext';
import AppContext from 'context/AppContext';
import * as hf from 'utils/helperFuncs';
import ax, {
  UNASSIGN_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER
} from 'ax';
import DeleteIcon from 'components/general/DeleteIcon';

const OrderListItem = (props) => {


  const {
    source_address_id,
    destination_address_id,
    revenue_cents,
    cost_cents,
    isNew,
    id,
    driver_id
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

  const handleDragStart = (e) => {
    setDrag(prev => ({
      ...prev,
      hide: true,
      id
    }))
  }
  const handleDragEnd = (e) => {
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
      // onDragEnd={handleDragEnd}
      onMouseUp={() => console.log('mouse up')}
      draggable={true}
      onDragEndCapture={handleDragEnd}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className='order-id light-color-text'>or_{id}</div>
      <a data-toggle='tooltip'
        title='Drag and assign to a driver'
        href={true}
      >
        <div
          className='bg-image'
          style={{
            backgroundImage: "url(/images/drag.png)",
          }}
        ></div>
      </a>
      <div>

        <div>{sourceAddress.city || 'Toronto'} to {destinationAddress.city || 'Barrie'}</div>
        <div className='light-color-text'>{hf.formatOrderDate(props.start_time)} - {hf.formatOrderDate(props.end_time)}</div>
      </div>
      <table className='order-pricing-summary light-color-text'
      >
        <tbody>
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
        </tbody>
      </table>
      <div className='align-start order-icon-container'>
        <a className='thumbnail'
          data-toggle='tooltip'
          title='Edit order'
          href={true}
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
    </div>

  )
}
export default OrderListItem;