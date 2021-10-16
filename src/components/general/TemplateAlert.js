import { Alert, Button } from 'react-bootstrap';

const TemplateAlert = ({ alert, resetAlert }) => {

  return (
    <div
    className='template-alert-wrapper'
    >
      <Alert
        dismissable={true}
        transition
        style={{
          zIndex: 99999
        }}
        show={alert.show}
        variant={alert.type}
      >
        <Button
          style={{
            alignSelf: 'flex-end',
            borderRadius: '50%',
            width: 20,
            height: 20,
            lineHeight: 1,
            padding: 0
          }}
          onClick={resetAlert} variant={`outline-${alert.type}`}>
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