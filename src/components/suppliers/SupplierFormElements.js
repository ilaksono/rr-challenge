import { Form, InputGroup, Col, Container, Row, Button } from 'react-bootstrap';
const SupplierFormElements = ({ createForm, handleCreateFormChange, prefix = 'supp_' }) => {

  return (
    <>
      {/* <div className='form-row'> */}
      <div className='supplier-form-container'>
        <InputGroup
          
          className="mb-2 flex">
          <InputGroup.Text
          >First Name
          </InputGroup.Text>
          <Form.Control
            value={createForm[prefix + 'fname'] || ''}
            onChange={handleCreateFormChange}
            type='text'
            name={prefix + 'fname'}
            placeholder='Larry'
          />
        </InputGroup>
        <InputGroup className="mb-2">
          <InputGroup.Text
          >Last Name
          </InputGroup.Text>
          <Form.Control
            value={createForm[prefix + 'lname'] || ''}
            onChange={handleCreateFormChange}
            type='text'
            name={prefix + 'lname'}
            placeholder='Wheels'
          />
        </InputGroup>
      </div>
      <div>
        <InputGroup
         
          className="mb-2 flex">
          <InputGroup.Text
          >Address
          </InputGroup.Text>
          <Form.Control
            value={createForm[prefix + 'address'] || ''}
            onChange={handleCreateFormChange}
            type='text'
            name={prefix + 'address'}
            placeholder='123 Main st.'
          />
        </InputGroup>
        <InputGroup className="mb-2">
          <InputGroup.Text
          >City
          </InputGroup.Text>
          <Form.Control
            value={createForm[prefix + 'city'] || ''}
            onChange={handleCreateFormChange}
            type='text'
            name={prefix + 'city'}
            placeholder='San Francisco'
          />
        </InputGroup>
        <InputGroup className="mb-2">
          <InputGroup.Text
          >State
          </InputGroup.Text>
          <Form.Control
            value={createForm[prefix + 'state'] || ''}
            onChange={handleCreateFormChange}
            type='text'
            name={prefix + 'state'}
            placeholder='California'
          />
        </InputGroup>
      </div>
      <div>
        <InputGroup
         
          className="mb-2 flex">
          <InputGroup.Text
          >Postal
          </InputGroup.Text>
          <Form.Control
            value={createForm[prefix + 'postal'] || ''}
            onChange={handleCreateFormChange}
            type='text'
            name={prefix + 'postal'}
            placeholder='12345'
          />
        </InputGroup>
        <InputGroup className="mb-2">
          <InputGroup.Text
          >Country
          </InputGroup.Text>
          <Form.Control
            value={createForm[prefix + 'country'] || ''}
            onChange={handleCreateFormChange}
            as='select'
            name={prefix + 'country'}
          >
            {['', 'Canada', 'United States'].map(each => <option key={each}>{each}</option>)}
          </Form.Control>
        </InputGroup>
      </div>

      {/* </div> */}
      {/* <div>
        hi
      </div> */}


    </>
  )
}
export default SupplierFormElements;