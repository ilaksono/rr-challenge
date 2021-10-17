import { useContext, useState } from 'react';
import AppContext from 'context/AppContext';
import { Tab, Nav } from 'react-bootstrap';
import CreateFormContext from 'context/CreateFormContext';
import * as hf from 'utils/helperFuncs';
const SupplierDisplayItem = (props) => {

  const {
    appData
  } = useContext(AppContext);
  const {
    createForm
  } = useContext(CreateFormContext);

  const {
    id,
    supp_fname,
    supp_lname,
    cust_fname,
    cust_lname,
    type = 'supplier',
    selected = false,
    handleClick = () => { }
  } = props;

  const fname = supp_fname || cust_fname;
  const lname = supp_lname || cust_lname;
  const containerClass = 'display-item' + (selected ? ' selected' : '')

  const idKey = type + '_id'
  const createFormIdKey = type === 'supplier' ? 'source_address_id' : 'destination_address_id'

  const list = appData.addresses.list.filter(address =>
    address[idKey] === id)
  const parsedList = list.map((each, index) =>
    <Nav.Item
      key={each.id}
    >
      <Nav.Link
        // eventKey={index}
        onClick={() => handleClick(hf.formatFullName(fname, lname), id, each.id)}
        active={createForm[createFormIdKey] === each.id}
      >
        {each.city}
      </Nav.Link>
    </Nav.Item>
  )

  return (
    <div className={containerClass}
      // onClick={handleClick}
      // onMouseOver
    >
      <img
        src='/images/company.png'
        alt='Supplier & Customer'
      />
      <div>
        <div>{fname}</div>
        <div>{lname}</div>
      </div>
      <div className='ml-2'>
        <Tab.Container
        // defaultActiveKey={0}
        >
          <Nav variant="pills" className="flex-column">
            {parsedList}
          </Nav>
        </Tab.Container>
      </div>
    </div>
  )
}
export default SupplierDisplayItem;