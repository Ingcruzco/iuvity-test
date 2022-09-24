import { useContext, useState,useEffect } from 'react'
import {
  TextField,
  Button
} from '@mui/material'
import { createUser } from '../utils.js/fetchUsers'
import { errorFormHandler } from '../utils.js/formValidation'
import { status } from '../utils.js/status.users'
import useFormStyles from '../styles/useFormFields'
import { UsersContext } from '../App'
import Toast from './Toast'


const optionsInForm = [
  'email',
  'phoneNumber',
  'cc'
];
const Form2 = ({ setStep, formHandler }) => {
  const classes = useFormStyles();
  const [ errors, setErrors ] = useState({});
  const { setUsers, setLoading } = useContext(UsersContext);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState({type:"success", message:status.success});
  const [ formValues, handleInputValues, reset ] = formHandler;
  const [didMount, setDidMount] = useState(true)
  
  useEffect(() => {
    setDidMount(true)
    return () => { 
      setDidMount(false);
    }
  },[])

  const onSubmit = (event) => {
    event.preventDefault();

    const foundErrors =  errorFormHandler(formValues, setErrors,optionsInForm);

    if (foundErrors) return;
    setLoading(true);
    createUser(formValues,setUsers)
      .then(() => {
        reset()
        didMount && setToast({type:"success", message:status.success})
      })
      .catch( err => {
        console.log(err)
        didMount && setToast({type:"error", message:status.error})
      } );
    setLoading(false);
    setOpen(true);
    setStep(0);
    
  }
 
  return (
    <>
      <form
      onSubmit={onSubmit}
      >
        <TextField
          className={classes.formField}
          fullWidth
          required
          type="email"
          id="email"
          label="E-mail"
          value={ formValues?.email || '' }
          onChange = {handleInputValues}
          error= { Boolean(errors?.email)}
          helperText ={errors?.email?.message}
        />

        <TextField
          className={classes.formField}
          fullWidth
          required
          id="phoneNumber"
          type = "number"
          label="Teléfono"
          value={ formValues?.phoneNumber || ''}
          onChange = { handleInputValues }
          error= { Boolean(errors?.phoneNumber) }
          helperText ={ errors?.phoneNumber?.message }
          onInput = {(e) =>{
            e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,12)
          }}
        />

        <TextField
          className={classes.formField}
          fullWidth
          required
          type="number"
          id="cc"
          label="Documento de identidad"
          value={ formValues?.cc || ''}
          onChange = {handleInputValues}
          error= { Boolean(errors?.cc)}
          helperText ={errors?.cc?.message}
          onInput = {(e) =>{
            e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,12)
          }}
        />

        <Button
          className={classes.formButtons}
          variant="outlined"
          onClick={() => setStep(0)}
        >
        Anterior
        </Button>

        <Button
          variant="contained"
          type="submit"
        >
          Enviar
        </Button>

      </form>
      <Toast open={open} setOpen={setOpen} toast={toast} />
    </>
  )
}

export default Form2;
