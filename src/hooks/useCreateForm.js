import { useState } from 'react';




const useCreateForm = (init) => {

  const [createForm, setCreateForm] = useState(init);

  const handleCreateFormChange = (e) => {
    const {
      name,
      value
    } = e.target;

    setCreateForm(prev => ({
      ...prev,
      [name]: value
    }));
  }
  const resetCreateForm = () => {
    setCreateForm(init);
  }

  const initCreateForm = (json) => {
    setCreateForm(json);
  }

  return {
    createForm,
    handleCreateFormChange,
    resetCreateForm,
    setCreateForm,
    initCreateForm
  }

}
export default useCreateForm;