import { Modal, Button, Form } from 'react-bootstrap';
import { useRef, useEffect } from 'react';
const ConfirmModal = ({ conMod, resetConfirmModal }) => {

  const btnRef = useRef();
  const handleConfirm = () => {
    conMod.confirm && conMod.confirm();
    resetConfirmModal();
  }
  useEffect(() => {
    if(
      conMod.confirm
    ) {
      const enterHandler = (e) => {
        console.log(e);
        if (e.key === 'Enter') {
          handleConfirm()
        }
      }
      document.addEventListener('keypress', enterHandler);
  
      return () => document.removeEventListener('keypress', enterHandler);
    }
  }, [conMod])

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
        <Form>
          <Button
            ref={btnRef}
            variant="primary"
            onClick={handleConfirm}>
            {conMod.btnText}
          </Button>
        </Form>
      </Modal.Footer>
    </Modal>
  )
}
export default ConfirmModal;