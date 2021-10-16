import {useState} from 'react';

const initLoadModal = {
  show: false
}
const useLoadingModal = () => {

  const [loadModal, setLoadModal] = useState(initLoadModal)

  const showLoadModal = () => {
    setLoadModal({
      show: true
    });
  }
  const hideLoadModal = () => {
    setLoadModal({
      show: false
    })
  }

  return {
    loadModal,
    showLoadModal,
    hideLoadModal
  }
}
export default useLoadingModal