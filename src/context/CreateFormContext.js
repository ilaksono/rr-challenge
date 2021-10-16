import React from 'react';
import useCreateForm from 'hooks/useCreateForm';

const CreateFormContext = React.createContext();

export const CreateFormProvider = ({ children, init}) => {

  const {
    createForm,
    handleCreateFormChange
  } = useCreateForm(init);

  return (
    <CreateFormContext.Provider value={{
      // useCreateForm
      createForm,
      handleCreateFormChange

    }}>
      {children}
    </CreateFormContext.Provider>
  )
}
export default CreateFormContext;