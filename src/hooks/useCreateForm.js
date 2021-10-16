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

  return {
    createForm,
    handleCreateFormChange
  }

}
export default useCreateForm;