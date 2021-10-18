import { Toast } from 'react-bootstrap';
import { formatDate } from 'utils/helperFuncs';

const ErrorToast = ({ show, handleClose, body, time }) => {

  return (
    <Toast
      onClose={handleClose}
      show={show}
      delay={7000}
      autohide
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