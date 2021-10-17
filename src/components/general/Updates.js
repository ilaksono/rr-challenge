import ConfirmModal from './ConfirmModal';
import ErrorToast from './ErrorToast';
import TemplateAlert from './TemplateAlert';
import AppContext from 'context/AppContext'
import LoadingModal from './LoadingModal';
import { useContext, useEffect, useRef } from 'react';

const Updates = () => {

  const {
    errors,
    removeError,
    conMod,
    resetConfirmModal,
    alert,
    resetAlert,
    loadModal,
  } = useContext(AppContext)

  const alRef = useRef();
  

  useEffect(() => {
    if (alert.show) {
      alRef.current = setTimeout(() => {
        if (alert.show)
          resetAlert();
      }, 5000)
    }
    return () => clearTimeout(alRef.current)
  }, [alert])

  return (
    <>
      {
        alert.show &&
        <TemplateAlert alert={alert} resetAlert={resetAlert} />
      }
      {
        errors.length > 0 &&
        <div className='error-toasts-wrapper'>
          {
            errors.map((each, i) => <ErrorToast
              key={i}
              {...each}
              handleClose={() => removeError(each.id)}
            />)
          }
        </div>
      }
      {
        conMod &&
        <ConfirmModal
          // handleConfirm={handleModalConfirm}
          conMod={conMod}
          resetConfirmModal={resetConfirmModal}
        />
      }
    
      {
        (loadModal.show )&&
        <LoadingModal
          show={true}
        />
      }
    </>
  )
}
export default Updates;