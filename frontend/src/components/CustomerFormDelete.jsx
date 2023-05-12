import * as React from 'react'
import { Grid, TableCell } from '@mui/material'
import DeleteIcon from '@mui/icons-material/DeleteForever'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { deleteCustomer } from '../services/Api'
import { useAuth } from '../contexts/AuthContext'
import EmailIcon from '@mui/icons-material/Email'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import PersonIcon from '@mui/icons-material/Person'

function CustomerFormDelete ({ customer }) {
  console.log(customer)
  const [open, setOpen] = React.useState(false)
  const { state: { user } } = useAuth()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = await deleteCustomer(customer.id, user._id)
    console.log(result)
  }

  return (
    <>
      <TableCell align='right'>
        <Button variant='outlined' onClick={handleClickOpen}>
          <DeleteIcon />
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>SUPPRESSION DU CLIENT</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Nous avons le regret de vous informer que vous êtes en procédure pour
              supprimer votre client:<hr /><br />

              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <PersonIcon /> {`${customer.firstName} ${customer.lastName}`}
                </Grid>
                <Grid item xs={6}>
                  <EmailIcon /> {`${customer.email} `}
                </Grid>
                <Grid item xs={6}>
                  <LocalPhoneIcon /> {`${customer.phone} `}
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <form noValidate onSubmit={handleSubmit}>
              <Button type='submit' onClick={handleClose}>Confirmer</Button>
            </form>
          </DialogActions>
        </Dialog>

      </TableCell>
    </>
  )
}

export default CustomerFormDelete
