import React from 'react';
import useAppData from 'hooks/useAppData';
import useAlertData from 'hooks/useAlertData';
import useConfirmModal from 'hooks/useConfirmModal';
import useErrorToast from 'hooks/useErrorToast';
import useLoadingModal from 'hooks/useLoadingModal';
import useDropZone from 'hooks/useDropZone';

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {

  const {
    appData,
    fetchUnassignedOrders,
    addDriverToList,
    addOrderToList
  } = useAppData();
  const {
    loadModal,
    showLoadModal,
    hideLoadModal
  } = useLoadingModal();

  const {
    alert,
    setShowAlert,
    resetAlert,
    createAlert
  } = useAlertData();



  const {
    conMod,
    resetConfirmModal,
    createModal,
    handleModalConfirm
  } = useConfirmModal();

  const {
    errors,
    createError,
    removeError,
  } = useErrorToast();

  const {
    dropZone,
    handleDragDropZone,
    handleDragOverZone
  } = useDropZone();

  return (
    <AppContext.Provider value={{
      // useAppData
      appData,
      fetchUnassignedOrders,
      addDriverToList,
      addOrderToList,

      // updates - useAlertData, useConfirmModal, useErrorToast
      alert,
      setShowAlert,
      resetAlert,
      createAlert,
      conMod,
      resetConfirmModal,
      createModal,
      handleModalConfirm,
      errors,
      createError,
      removeError,
      loadModal,
      showLoadModal,
      hideLoadModal,

      // useDropZone
      dropZone,
      handleDragDropZone,
      handleDragOverZone

    }}>
      {children}
    </AppContext.Provider>
  )
}
export default AppContext;