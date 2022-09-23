import React, { 
  useContext, 
  useState, 
  useEffect, 
  useCallback 
} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { getUserByID, updateUser } from '../utils.js/fetchUsers';
import { useForm } from '../hooks/useForm';
import { errorFormHandler } from '../utils.js/formValidation';
import { UsersContext } from '../App';
import { status } from '../utils.js/status.users';
import useFormStyles from '../styles/useFormFields'
import Toast from './Toast';

const optionsInForm = [
  'name',
  'lastName',
  'email',
  'phoneNumber',
  'cc'
]

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function FormEdit ({openModal, setOpenModal, id}) {

  const classes = useFormStyles()
  const [ formValues, handleInputValues, , setFormManually] = useForm()
  const [ errors, setErrors ] = useState({})
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState({type:"success", message:status.delete});
  const { setUsers, setLoading } = useContext(UsersContext)
  const memoizedFunction = useCallback(setFormManually, [])

  useEffect(()=>{
    if(!id) return

    const handleUpdateUser = (id) => {
      setLoading(true)

      getUserByID(id)
        .then( user => memoizedFunction(user.data))
        .catch(err => console.log(err))
    }
      
    handleUpdateUser(id)
    setLoading(false)
  },[id,memoizedFunction,setLoading])


  const handleClose = () => {
    setOpenModal(false);
  };

  const onSubmit = (event) => {
    event.preventDefault()

    const foundErrors =  errorFormHandler(formValues, setErrors,optionsInForm)

    if (foundErrors) return

    updateUser(formValues,setUsers)
      .then(() =>{
        setOpen(true);
        setToast({type:"success", message:status.updated})
      })
      .catch( err => {
        console.log(err)
        setOpen(true);
        setToast({type:"error", message:status.error})
      } )

    setOpenModal(false)
  }

  return (
    <div>
      <Modal
      keepMounted
      open={openModal}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
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
              onClick={() => setOpenModal(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              type="submit"
            >
              Enviar
            </Button>
          </form>
        </Box>
      </Modal>
      <Toast open={open} setOpen={setOpen} toast={toast} />
    </div>
  );
}
