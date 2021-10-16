import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = ({ conMod, resetConfirmModal }) => {
  
  const handleConfirm = () => {
    conMod.confirm();
    resetConfirmModal();
  }

  return (
    <Modal show={conMod.show} onHide={resetConfirmModal}>
      <Modal.Header closeButton>
        <Modal.Title>{conMod.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body
        className='confirm-modal-body'
      
      >{conMod.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="cancel" onClick={resetConfirmModal}>
          Close
          </Button>
        <Button variant="primary" onClick={handleConfirm}>
          {conMod.btnText}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ConfirmModal;