import { useState } from 'react';

const init = [];

const useErrorToast = () => {
  const [errors, setErrors] = useState(init);
  const [toastCount, setToastCount] = useState(0);

  const removeError = (id) => {
    setErrors(() => {
      const i = errors.findIndex(each => each.id === id);
      const cpy = [...errors];
      cpy.splice(i, 1);
      return cpy;
    });
  }
  const createError = (body) => {
    const newErr = {
      show: true,
      body,
      time: new Date(),
      id: toastCount,
    }
    setToastCount(prev => prev + 1);
    setErrors(prev => [...prev, newErr]);
  }

  return {
    errors,
    createError,
    removeError,
  }

}
export default useErrorToast;