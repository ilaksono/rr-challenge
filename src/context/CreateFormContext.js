import React from 'react';
import useCreateForm from 'hooks/useCreateForm';

const CreateFormContext = React.createContext();

export const CreateFormProvider = ({ 
  children, 
  init = {},
  show, setShow
}) => {

  const {
    createForm,
    handleCreateFormChange,
    resetCreateForm,
    setCreateForm,
    initCreateForm
  } = useCreateForm(init);

  return (
    <CreateFormContext.Provider value={{
      // useCreateForm
      createForm,
      handleCreateFormChange,
      resetCreateForm,
      setCreateForm,
      initCreateForm, 
      // props
      show,
      setShow

    }}>
      {children}
    </CreateFormContext.Provider>
  )
}
export default CreateFormContext;