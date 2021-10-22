import React from 'react';
import {Popover} from 'react-bootstrap';
import * as hf from 'utils/helperFuncs';

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
export default OrderTimePopover;