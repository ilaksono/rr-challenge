import { Modal, Button, Form } from 'react-bootstrap';
import { useRef, useEffect } from 'react';
const ConfirmModal = ({ conMod, resetConfirmModal }) => {

  const handleConfirm = () => {
    conMod.confirm && conMod.confirm();
    resetConfirmModal();
  }
  useEffect(() => {
    if (conMod.confirm) {
      const enterHandler = (e) => {
        if (e.key === 'Enter') {
          handleConfirm()
        }
      }
      document.addEventListener('keypress', enterHandler);
      return () => document.removeEventListener('keypress', enterHandler);
    }
  }, [conMod.confirm])

  return (
    <Modal 
    data-testid='confirm-modal'
    show={conMod.show} onHide={resetConfirmModal}>
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
        <Button
          variant="primary"
          onClick={handleConfirm}>
          {conMod.btnText}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ConfirmModal;