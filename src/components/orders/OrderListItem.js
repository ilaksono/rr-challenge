import { useState, useContext } from 'react';
import CreateFormContext from 'context/CreateFormContext';
import AppContext from 'context/AppContext';
import * as hf from 'utils/helperFuncs';
const init = {
  hide: false
}

const OrderListItem = (props) => {

  const {
    source_address_id,
    destination_address_id,
    revenue_cents,
    cost_cents
  } = props;

  const [drag, setDrag] = useState(init)
  const {
    setShow,
    initCreateForm,
  } = useContext(CreateFormContext);

  const {
    appData,
    dropZone

  } = useContext(AppContext);

  const handleDragStart = (e) => {
    setDrag(prev => ({
      ...prev,
      hide: true
    }))
    console.log(e, 'from item');
  }
  const handleDragEnd = (e) => {
    setDrag(prev => ({
      ...prev,
      hide: false
    }));
    if (dropZone.id && dropZone.on) {
      console.log('do the thing with', dropZone.id, dropZone.type)
      
    }
    console.log(e, 'from item');
  }

  const handleClick = () => {
    setShow(true)
    initCreateForm(
      hf.determineOrderInformation(props, appData)
    );
  }
  const {
  } = props;
  const containerClassList = ['order-list-item'];
  if (drag.hide)
    containerClassList.push('partial-hide')

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
      <div>{sourceAddress.city || 'Toronto'} to {destinationAddress.city || 'Barrie'}</div>
      <div className='order-pricing-summary light-color-text'
      >
        $&nbsp;
        <div className='green-color-text'>{(revenue_cents / 100).toFixed(2)}</div>
        &nbsp;|&nbsp;$&nbsp;
        <div className='red-color-text'>{(cost_cents / 100).toFixed(2)}</div>
      </div>
      <div className='thumbnail'>
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