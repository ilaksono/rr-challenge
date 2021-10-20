import { Spinner } from 'react-bootstrap';
import React, { Suspense } from 'react';
import * as con from 'utils/con';

const LazyWrapper = ({ children }) => {

  return (
    <Suspense
      fallback={<div
        className='suspense-fallback'
      ><Spinner
          size={24}
          animation='border'
          style={{
            color: con.rrBlue
          }}
        />
      </div>}
    >{children}
    </Suspense>

  )
}
export default LazyWrapper;