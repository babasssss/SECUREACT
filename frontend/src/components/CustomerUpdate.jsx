import * as React from 'react'

import EditNoteIcon from '@mui/icons-material/EditNote'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TableCell } from '@mui/material'
import CustomerFormUpdate from './CustomerFormUpdate'

function CustomerUpdate ({ customer, getData }) {
  console.log(customer)
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    getData()
    console.log('result')
  }

  return (
    <>
      <TableCell align='right'>
        <Button variant='outlined' onClick={handleClickOpen}>
          <EditNoteIcon />
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>MODIFICATION DU CLIENT</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Vous êtes en train de changer les informations du client suivant :<hr /><br />
              <CustomerFormUpdate customer={customer} />
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

export default CustomerUpdate
