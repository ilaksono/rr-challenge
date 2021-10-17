import { Modal } from 'react-bootstrap';
import * as con from 'utils/con';
import ModalCloseButton from './ModalCloseButton';
const ModalTemplate = (props) => {

  const {
    onHide = () => {},
    show = false,
    size = 'lg',
    modalStyle,
    modalTitle = 'asd',
    bodyStyle = {},
    children = 'asd'
  } = props;
  return (
    <Modal
      onHide={onHide}
      show={show}
      size={size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={modalStyle || {
        // border: '1px solid ' + con.rrBlue,
        // boxShadow: '0 8px 16px 4px rgb(0 0 0 / 15%)',
        // borderRadius: 16
      }}
    >
      <Modal.Header
      className='rr-modal-header'
        >
        <Modal.Title id="contained-modal-title-vcenter">
          {modalTitle}
        </Modal.Title>
        <ModalCloseButton onHide={onHide} />
      </Modal.Header>
      <Modal.Body
      className='rr-modal-body'
        style={bodyStyle}>
        {children}
      </Modal.Body>
    </Modal>
  )
}
export default ModalTemplate;