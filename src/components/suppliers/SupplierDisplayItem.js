import {useContext} from 'react';
import AppContext from 'context/AppContext';

const SupplierDisplayItem = (props) => {

  const {
    supp_fname,
    supp_lname,
    cust_fname,
    cust_lname,
    selected = false,
    handleClick = () => { }
  } = props;
  const containerClass = 'display-item' + (selected ? ' selected' : '')

  const address = {

  }

  return (
    <div className={containerClass}
      onClick={handleClick}
    >
      <img
        src='/images/company.png'
        alt='Supplier'
      />
      <div>
        <div>{supp_fname || cust_fname}</div>
        <div>{supp_lname || cust_lname}</div>
      </div>
    </div>
  )
}
export default SupplierDisplayItem;