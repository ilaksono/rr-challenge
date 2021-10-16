import { Modal } from 'react-bootstrap';
import GeneralSpinner from './GeneralSpinner';

const LoadingModal = ({ show, onHide }) => {


  return (
    <Modal
      show={show}
      size='sm'
      id='loading-modal'
      onHide={() => {}}
    >
      <GeneralSpinner
        size='md'
      />
    </Modal>
  )
}
export default LoadingModal;