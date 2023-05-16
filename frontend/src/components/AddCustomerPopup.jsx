import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useSpring, animated } from '@react-spring/web'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import '../styles/CustomerPopup.scss'
import CustomerForm from './CustomerFormSubmit'
import CloseIcon from '@mui/icons-material/Close'
import { Grid } from '@mui/material'
import { useState } from 'react'

const Fade = React.forwardRef(function Fade (props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true)
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true)
      }
    }
  })

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  )
})

function AddCustomerPopup ({ getData }) {
  const [open, setOpen] = React.useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const handleOpen = () => {
    setIsFormValid(false)
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  const handleFormSubmit = () => {
    setIsFormValid(true)
  }

  return (
    <>
      <div className=''>
        <Button onClick={handleOpen} variant='outlined' startIcon={<PersonAddAltIcon />}>
          NOUVEAU CLIENT
        </Button>
        <Modal aria-labelledby='spring-modal-title' aria-describedby='spring-modal-description' open={open} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { TransitionComponent: Fade } }}>
          <Fade in={open}>
            <Box className='popup'>
              <Typography id='spring-modal-title' variant='h6' component='h2'>
                <Grid container spacing={2}>
                  <Grid item xs={10}>
                    NOUVEAU CLIENT
                  </Grid>
                  <Grid item xs={2}>
                    <Button onClick={handleClose} className='close-button'>
                      <CloseIcon />
                    </Button>
                  </Grid>
                </Grid>
              </Typography>
              <hr />
              {isFormValid
                ? (
                  <p>Le formulaire a été validé avec succès !</p>
                  )
                : (
                  <CustomerForm onSubmit={handleFormSubmit} getData={getData} />
                  )}
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  )
}

export default AddCustomerPopup
