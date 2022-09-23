import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteUser } from '../utils.js/fetchUsers';
import { UsersContext } from '../App';
import { status } from '../utils.js/status.users';
import Toast from './Toast';

export const ModalConfirmation = ({open, setOpen, id, rowsPerPage, setPage}) => {

	const { users, setUsers, setLoading } = useContext(UsersContext)
	const [toast, setToast] = useState({type:"success", message:status.delete});
	const [ openToast, setOpenToast ] = useState(false)

	const handleClose = () => setOpen(false);

	const handleDeleteUser = () => {

		setOpen(false);

		if(!id) return
		setLoading(true)
		deleteUser(id, setUsers)
			.then(() => setToast({type:"success", message:status.delete}))
			.catch(err => {
				console.log(err);
				setToast({type:"error", message:status.error});
			});
		setLoading(false)	
		setOpenToast(true);

		if(users.length -1 <= rowsPerPage) setPage(0);
	}

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"Esta eliminando un usuario"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Esta seguro que desea realizar esta accion?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancelar</Button>
					<Button onClick={handleDeleteUser} autoFocus>
						Eliminar
					</Button>
				</DialogActions>
			</Dialog>
			<Toast open={openToast} setOpen={setOpenToast} toast={toast} />
		</div>
	);
}
