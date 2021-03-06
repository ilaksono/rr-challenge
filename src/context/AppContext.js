import React from 'react';
import useAppData from 'hooks/useAppData';
import useAlertData from 'hooks/useAlertData';
import useConfirmModal from 'hooks/useConfirmModal';
import useErrorToast from 'hooks/useErrorToast';
import useLoadingModal from 'hooks/useLoadingModal';
import useDropZone from 'hooks/useDropZone';
import useAppName from 'hooks/useAppName';

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {

  const {
    appData = {},
    fetchUnassignedOrders,
    addDriverToList,
    addOrderToList,
    moveOrderToList,
    modifyDriverView,
    deleteOrderThenAdd,
    handleCreateAddress,
    handleCreateCustomer,
    handleCreateSupplier,
    addAddressesList,
    deleteOrder,
    updateUnassignedOrders,
    deleteDriverAppData,
    updateOrdersLive
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
    appName
  } = useAppName();

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
    handleDragOverZone,
    drag,
    setDrag
  } = useDropZone();

  return (
    <AppContext.Provider value={{
      // useAppData
      appData,
      fetchUnassignedOrders,
      addDriverToList,
      addOrderToList,
      moveOrderToList,
      modifyDriverView,
      deleteOrderThenAdd,
      handleCreateAddress,
      handleCreateCustomer,
      handleCreateSupplier,
      addAddressesList,
      deleteOrder,
      updateUnassignedOrders,
      deleteDriverAppData,
      updateOrdersLive,

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
      handleDragOverZone,
      drag,
      setDrag,

      // useAppName
      appName
    }}>
      {children}
    </AppContext.Provider>
  )
}
export default AppContext;