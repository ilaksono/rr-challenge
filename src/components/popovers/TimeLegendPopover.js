import React from 'react';
import {Popover} from 'react-bootstrap';
import * as hf from 'utils/helperFuncs';


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
export default TimeLegendPopover;