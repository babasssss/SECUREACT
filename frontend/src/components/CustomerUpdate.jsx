import * as React from 'react'

import EditNoteIcon from '@mui/icons-material/EditNote'
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, TableCell } from '@mui/material'
import CustomerFormUpdate from './CustomerFormUpdate'
import { useState } from 'react'

function CustomerUpdate ({ customer, getData }) {
  const [open, setOpen] = React.useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  const handleClickOpen = () => {
    setIsFormValid(false)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleFormSubmit = () => {
    setIsFormValid(true)
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
              {isFormValid
                ? (
                  <><p>Les informations du client ont été modifiées avec succès !</p><hr /></>
                  )
                : (
                  <>
                    <p>Vous êtes en train de changer les informations du client suivant :</p>
                    <CustomerFormUpdate onSubmit={handleFormSubmit} getData={getData} customer={customer} />
                  </>
                  )}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </TableCell>
    </>
  )
}

export default CustomerUpdate
