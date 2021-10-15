const OrderListItem = (props) => {
  const {
  } = props;
  return (
   <div className='order-list-item'>
     <div>
       Bar Icon
     </div>
     <div>Toronto to Barries</div>
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