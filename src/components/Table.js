import { useState, useContext } from 'react'
import {
Table,
TableBody,
TableCell,
TableContainer,
TableHead,
TableRow,
Paper,
IconButton,
TablePagination
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import CircularIndeterminate from './Spinner'
import { UsersContext } from '../App';
import Toast from './Toast';
import { status } from '../utils.js/status.users';
import FormEdit from './FormEdit'
import { ModalConfirmation } from './ModalConfirmation';


const TableData = ({ users }) => {
  const [open, setOpen] = useState(false);
  const [toast, ] = useState({type:"success", message:status.delete});
  const { loading } = useContext(UsersContext)
  const [openModal, setOpenModal] = useState(false);
  const [ userSelected, setUserSelected ] = useState()
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [ userToDelete, setUserToDelete] = useState();

  const handleDeleteUser = (id) => {
    setUserToDelete(id)
    setOpenConfirmation(true)
  }

  const handleUpdateUser = (id) => {
    setOpenModal(true)
    setUserSelected(id)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
    {
      loading 
      ? <CircularIndeterminate />
      :  
        <>
          <TableContainer
            component={Paper}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Nombre</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Apellido</strong>
                  </TableCell>
                  <TableCell>
                    <strong>E-mail</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Teléfono</strong>
                  </TableCell>
                  <TableCell>
                    <strong>C.C.</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Accion</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice(page*rowsPerPage, rowsPerPage*(page + 1)).map((user, key) => (
                <TableRow
                key={key}
              >
                  <TableCell>
                    {user.name}
                  </TableCell>
                  <TableCell>
                    {user.lastName}
                  </TableCell>
                  <TableCell>
                    {user.email}
                  </TableCell>
                  <TableCell>
                    {user.phoneNumber}
                  </TableCell>
                  <TableCell>
                    {user.cc}
                  </TableCell>
                  <TableCell sx={{display:'flex', justifyContent:'row'}}>
                    <IconButton aria-label="delete" onClick= {() => handleDeleteUser(user._id)}>
                      <DeleteIcon/>
                    </IconButton>
                    <IconButton onClick= {() => handleUpdateUser(user._id)}>
                      <CreateIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            labelRowsPerPage="Filas por pagina"
            rowsPerPageOptions={[8, 16, 40]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Toast open={open} setOpen={setOpen} toast={toast} />
          <FormEdit openModal={openModal}  setOpenModal={setOpenModal} id={userSelected}/>
          <ModalConfirmation 
            open={openConfirmation} 
            setOpen={setOpenConfirmation} 
            id={userToDelete}
            rowsPerPage={rowsPerPage}
            setPage= {setPage}
          />
        </>
    }

    </>
  )
}

export default TableData
