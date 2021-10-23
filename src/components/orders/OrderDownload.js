import { CSVLink } from "react-csv";
import { formatOrdersCsv } from 'utils/helperFuncs';
import AppContext from 'context/AppContext';
import { useContext } from 'react';

const OrderDownload = () => {

  const {
    appData
  } = useContext(AppContext) || {};

  return (
    <CSVLink
      filename='rr_orders.csv'
      data={formatOrdersCsv(appData)}
      data-toggle='tooltip'
      title='Download all orders'
      className='csv-link thumbnail text-center mb-2 lg-thumbnail'
      >
      <img 
      style={{
        borderRadius: '50%',
        boxShadow: '1px 1px 3px 1px grey',
        padding: 2
      }}
        src='/images/download.png'
        alt='Download all orders'
      />
      <p>Download</p>
    </CSVLink>
  )
}
export default OrderDownload;