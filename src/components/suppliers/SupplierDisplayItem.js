import React, { useContext } from 'react';
import AppContext from 'context/AppContext';
import { Tab, Nav, OverlayTrigger, Popover } from 'react-bootstrap';
import CreateFormContext from 'context/CreateFormContext';
import * as hf from 'utils/helperFuncs';
import AddressPopover from 'components/popovers/AddressPopover'


const SupplierDisplayItem = (props) => {

  const {
    appData
  } = useContext(AppContext) || {};
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

  const addressType = type === 'supplier' ? 'source': 'destination'

  const fname = supp_fname || cust_fname;
  const lname = supp_lname || cust_lname;
  const containerClass = 'display-item' + (selected ? ' selected' : '')

  const idKey = type + '_id'
  const createFormIdKey = type === 'supplier' ? 'source_address_id' : 'destination_address_id'
  const fullName = hf.formatFullName(fname, lname)
  const list = appData.addresses.list.filter(address =>
    address[idKey] === id)
  const parsedList = list.map((each) =>
    <Nav.Item
      key={each.id}
    >
      <Nav.Link
        onClick={(e) => handleClick(e, fullName, id, each.id)}
        active={createForm[createFormIdKey] === each.id}
      >
        {each.city}
      </Nav.Link>
    </Nav.Item>
  )

  return (
    <OverlayTrigger
      
      overlay={
        <AddressPopover
          {...list[0]}
          type={addressType}
        />
      }
    >
      <div className={containerClass}
        onClick={e => handleClick(e, fullName, id, list[0].id)}
      >
        <div
          className='order-id light-color-text'
        >{type.slice(0, 2)}_{id}</div>
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
          >
            <Nav variant="pills" className="flex-column">
              {parsedList}
            </Nav>
          </Tab.Container>
        </div>
      </div>
    </OverlayTrigger>
  )
}
export default SupplierDisplayItem;