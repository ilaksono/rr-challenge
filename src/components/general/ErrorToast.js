import { Toast, Button } from 'react-bootstrap';
import { formatDate } from 'utils/helperFuncs';

const ErrorToast = ({ show, handleClose, body, time }) => {

  return (
    <Toast
      onClose={handleClose}
      show={show}
      delay={7000}
      autohide
      style={{
        minWidth: 250,
        position: 'block'
      }}
    >
      <Toast.Header>
        <strong className="mr-auto">Notice</strong>
        <small>{formatDate(time)}
        </small>
      </Toast.Header>
      <Toast.Body>
        {body}
      </Toast.Body>
    </Toast>
  )
}
export default ErrorToast;