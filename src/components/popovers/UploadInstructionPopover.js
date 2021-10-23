import React from 'react';
import {Popover} from 'react-bootstrap';
const UploadInstructionPopover = React.forwardRef(
  ({ popper, children, show: _, ...props }, ref) => {
    return (
      <Popover ref={ref} body {...props}>
        <div>Steps</div>
        <p><span className='light-color-text'>1. </span>Find Driver(dr_x), Supplier's address(ad_x) and Customer's address(ad_x) IDs using <strong>Order Builder</strong>.</p>
        <p><span className='light-color-text'>2. </span>Column names need to be in a specific format - Download all orders and follow the example column headers provided in the file.</p>
        <p><span className='light-color-text'>3. </span>Modify any 'order_' columns freely.</p>
        <p><span className='light-color-text'>4. </span>When choosing Driver/Source/Destination values, you can input only the driver_id/source_address_id/destination_address_id respectively, but you <strong>must</strong> make sure the <strong>data exists</strong> (see Step 1).</p>
        <p><span className='light-color-text'>5. </span>When no order_id(or_x) is specified, an order will be created with the row's properties.</p>
        <p><span className='light-color-text'>6. </span>When you are done, drag the modified file or click the dotted box, then click 'Upload Records'.</p>
      </Popover>
    );
  },
);
export default UploadInstructionPopover