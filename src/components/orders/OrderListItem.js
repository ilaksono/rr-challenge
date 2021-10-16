import {useState} from 'react';

const OrderListItem = (props) => {
  const handleDrag = (e) => {
    console.log(e, 'from item');
  }
  const {
  } = props;
  return (
   <div className='order-list-item'
   onDragStart={handleDrag}
   onDragEnd={handleDrag}
   draggable={true}
   onDrop={handleDrag}
   >
     <div>
       <div 
       style={{
         backgroundImage: "url(/images/drag.png)",
         backgroundSize: 'cover',
         height: 50,
         width: 50
       }}
      //  alt="Drag"
      //  src='/images/drag.png'
       ></div>
     </div>
     <div>Toronto to Barrie</div>
     <div className='order-pricing-summary'>
       <div>$100.00</div>
       <div>$100.00</div>
     </div>
   <div>
     Edit Pencil
   </div>
   </div> 
   
  )
}
export default OrderListItem;