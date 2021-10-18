import { CSVLink, CSVDownload } from "react-csv";
import {formatOrdersCsv} from 'utils/helperFuncs';
import AppContext from 'context/AppContext';
import {useContext} from 'react';
const csvData = [
  ["firstname", "lastname", "email"],
  ["Ahmed", "Tomi", "ah@smthing.co.com"],
  ["Raed", "Labes", "rl@smthing.co.com"],
  ["Yezzi", "Min l3b", "ymin@cocococo.com"]
];
const OrderDownload = () => {

  const {
    appData
  } = useContext(AppContext);

  return (
    <CSVLink 
    filename='rr_orders.csv'
    data={
      formatOrdersCsv(appData)
    }>Download All Orders</CSVLink>
  )
}
export default OrderDownload;