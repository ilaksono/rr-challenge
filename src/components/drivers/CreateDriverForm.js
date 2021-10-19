import { Form, InputGroup, Col, Container, Row, Button } from 'react-bootstrap';
import CreateFormContext from 'context/CreateFormContext';
import { useContext, useRef, useState, useCallback } from 'react';
import ax, { CREATE_DRIVER } from 'ax';
import AppContext from 'context/AppContext';
const yearsArr = () => {
  const arr = [];
  for (let i = 2021; i > 1900; i--) {
    arr.push(i);
  }
  return arr;
}

const CreateDriverForm = ({forceClose}) => {

  const {
    createError,
    addDriverToList,
    showLoadModal,
    hideLoadModal,
    createAlert
  } = useContext(AppContext);
  const {
    createForm,
    handleCreateFormChange,
    resetCreateForm
  } = useContext(CreateFormContext);
  const [yearOptions, setYearOptions] = useState(() => yearsArr());

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      showLoadModal();
      const res = await ax(
        CREATE_DRIVER, 
        'post', 
        createForm
        );
      if (res) {
        addDriverToList(res[0]);
        resetCreateForm()
        forceClose();
        createAlert();
      }
    } catch (er) {
      createError(er.message);
    }
    hideLoadModal();
  }, [createForm]);

  return (
    <Form
      onSubmit={handleSubmit}
      className='create-driver-form'
    >
      <Container
      >
        <div className='form-row'>
          <InputGroup className="mb-2">
            <InputGroup.Text
            >First Name *
            </InputGroup.Text>
            <Form.Control
              value={createForm.fname || ''}
              onChange={handleCreateFormChange}
              type='text'
              name='fname'
              placeholder='Larry'
            />
          </InputGroup>
          <InputGroup className="mb-2">
            <InputGroup.Text
            >Last Name
            </InputGroup.Text>
            <Form.Control
              value={createForm.lname || ''}
              onChange={handleCreateFormChange}
              type='text'
              name='lname'
              placeholder='Wheels'
            />
          </InputGroup>
        </div>
        <InputGroup className="mb-2">
            <InputGroup.Text
            >Insurance Policy Number
            </InputGroup.Text>
            <Form.Control
              value={createForm.driver_insurance || ''}
              onChange={handleCreateFormChange}
              type='text'
              name='driver_insurance'
              placeholder='12345678910'
            />
          </InputGroup>
        <fieldset>
          <legend>Vehicle</legend>
          <div className='form-row'>
            <InputGroup className="mb-2">
              {/* <InputGroup.Prepend> */}
              <InputGroup.Text
              >Make
              </InputGroup.Text>
              {/* </InputGroup.Prepend> */}
              <Form.Control
                value={createForm.make || ''}
                onChange={handleCreateFormChange}
                type='text'
                name='make'
                placeholder='Mack'
              />
            </InputGroup>
            <InputGroup className="mb-2">
              <InputGroup.Text
              >Model
              </InputGroup.Text>
              <Form.Control
                value={createForm.model || ''}
                onChange={handleCreateFormChange}
                type='text'
                name='model'
                placeholder='Mack Anthem'
              />
            </InputGroup>
            <InputGroup className="mb-2">
              <InputGroup.Text
              >Year
              </InputGroup.Text>
              <Form.Control
                value={createForm.year || ''}
                onChange={handleCreateFormChange}
                as='select'
                name='year'
                placeholder='Wheels'
              >{yearOptions.map(each => <option key={each}>{each}</option>)}
              </Form.Control>
            </InputGroup>
          </div>
        </fieldset>
        <Button
          type='submit'>Submit</Button>
      </Container>
    </Form>
  )
}
export default CreateDriverForm;