import { useState } from 'react';

const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const setFieldError = (name, message) => {
    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, errors, setValues, setErrors, handleChange, setFieldError, resetForm };
};

export default useForm;

