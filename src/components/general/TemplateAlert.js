import { Alert, Button } from 'react-bootstrap';

const TemplateAlert = ({ alert, resetAlert }) => {

  return (
    <div
      className='template-alert-wrapper'
    >
      <Alert
        dismissable={true}
        transition

        show={alert.show}
        variant={alert.type}
      >
        <Button
          onClick={resetAlert}
          variant={`outline-${alert.type}`}
        >
          -
        </Button>
        <Alert.Heading
        ><div>{alert.text}</div>
        </Alert.Heading>
      </Alert>
    </div>
  )
}
export default TemplateAlert;