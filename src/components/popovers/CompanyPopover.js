import React from 'react';
import {Popover} from 'react-bootstrap';

const CompanyPopover = React.forwardRef(
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

export default CompanyPopover;