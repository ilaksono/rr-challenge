import { useState } from 'react';

const init = {
  type: 'success',
  show: false,
  text: ''
}

// alert types are primary, secondary,
// success, danger, warning, info light, dark

const useAlertData = () => {

  const [alert, setAlert] = useState(init);
  const setShowAlert = (type, show, text) => {
    setAlert({ type, show, text })
  }

  const resetAlert = () => {
    setAlert(init);
  }

  const createAlert = (text = 'Success!', type = 'success', ) => {
    setAlert({ type, text, show: true });
  }

  return {
    alert,
    setShowAlert,
    resetAlert,
    createAlert
  }
}
export default useAlertData;