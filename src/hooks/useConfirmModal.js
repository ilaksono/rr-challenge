import {useState} from 'react';

const init = {
  show: false,
  body: '',
  title: '',
  btnText: 'Submit',
  confirm: null
}

const useConfirmModal = () => {

  const [conMod, setConMod] = useState(init);

  const resetConfirmModal = () => {
    setConMod(init);
  }

  const createModal = (body, title, confirm = null, btnText = 'Submit') => {
    setConMod({show: true, body, title, btnText, confirm});
  }

  const handleModalConfirm = (confirm) => {
    setConMod(prev => ({...prev, confirm}))
  }

  return {
    conMod,
    resetConfirmModal,
    createModal,
    handleModalConfirm
  }
}
export default useConfirmModal;