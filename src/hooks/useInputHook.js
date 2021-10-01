import {useState} from 'react';

export const useInputHook = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  return {
    values,
    handleChange: (e) => {
      console.log('e', e);
      setValues({
        ...values,
        [e.target.name]: e.target.value
      });
    }
  };
};
