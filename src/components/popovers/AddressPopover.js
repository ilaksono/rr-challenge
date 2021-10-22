import React from 'react';
import {Popover} from 'react-bootstrap';
const AddressPopover = React.forwardRef(
  ({ popper, children, show: _, ...props }, ref) => {
    return (
      <Popover ref={ref} body {...props}>
        <div><span className='light-color-text'>{props.type} address id: </span>ad_{props.id}</div>
        <div><span className='light-color-text'>city: </span>{props.city}</div>
        <div><span className='light-color-text'>state: </span>{props.state || 'none'}</div>
        <div><span className='light-color-text'>country: </span>{props.country || 'none'}</div>
        <div><span className='light-color-text'>postal: </span>{props.postal || 'none'}</div>
        <div><span className='light-color-text'>address: </span>{props.address || 'none'}</div>
      </Popover>
    );
  },
);
export default AddressPopover