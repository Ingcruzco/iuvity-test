import React, { useState } from 'react'
import {
  TextField,
  Button
} from '@mui/material'

import useFormStyles from '../styles/useFormFields'
import { errorFormHandler } from '../utils.js/formValidation'

const optionsInForm = [
  'name',
  'lastName'
]

const Form1 = ({ setStep, formHandler }) => {
  const classes = useFormStyles();
  const [formValues, handleInputValues] = formHandler;
  const [errors, setErrors] = useState({});

  const onSubmit = (event) => {
    event.preventDefault();
    const foundErrors = errorFormHandler(formValues, setErrors, optionsInForm);
    if (foundErrors) return;
    setStep(1);
  }

  return (
    <form
      onSubmit={onSubmit}
    >
      <TextField
        className={classes.formField}
        fullWidth
        required
        id="name"
        label="Nombre"
        value={formValues.name || ''}
        onChange = {handleInputValues}
        error= { Boolean(errors?.name)}
        helperText ={errors?.name?.message}
      />
      <TextField
        className={classes.formField}
        fullWidth
        required
        id="lastName"
        label="Apellido"
        value={formValues.lastName || ''}
        onChange = {handleInputValues}
        error= { Boolean(errors?.lastName)}
        helperText ={errors?.lastName?.message}
      />
      <Button
        variant="contained"
        type="submit"
      >
        Siguiente
      </Button>
    </form>
  )
}

export default Form1;
