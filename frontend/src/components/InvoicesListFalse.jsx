import * as React from 'react'
import '../styles/RestaurantList.scss'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Box, Collapse, IconButton, TableBody, Typography } from '@mui/material'

function InvoicesListFalse () {
  const [open, setOpen] = React.useState(false)
  const date = new Date()
  date.setDate(date.getDate() - 13)
  const datePlusUnMois = new Date(date)
  datePlusUnMois.setMonth(date.getMonth() + 1)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }

  return (
    <div className='list-container'>
      <TableContainer component={Paper}>
        <Table aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>CLIENT</TableCell>
              <TableCell align='right'>NUMÉRO</TableCell>
              <TableCell align='right'>CRÉER LE</TableCell>
              <TableCell align='right'>ECHÉANCE</TableCell>
              <TableCell align='right'>TOTAL TTC</TableCell>
            </TableRow>
          </TableHead>
          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
              <IconButton

                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell component='th' scope='row'>
              Dupont Antoine
            </TableCell>
            <TableCell align='right'>001</TableCell>
            <TableCell align='right'>{date.toLocaleDateString('fr-FR', options)}</TableCell>
            <TableCell align='right'>{datePlusUnMois.toLocaleDateString('fr-FR', options)}</TableCell>
            <TableCell align='right'>199</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout='auto' unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Typography variant='h6' gutterBottom component='div'>
                    Descriptif
                  </Typography>
                  <Table size='small' aria-label='purchases'>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Produits</TableCell>
                        <TableCell align='right'>Quantité</TableCell>
                        <TableCell align='right'>Prix total (€)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow key='1'>
                        <TableCell component='th' scope='row'>
                          {date.toLocaleDateString('fr-FR', options)}
                        </TableCell>
                        <TableCell>Mini pelle</TableCell>
                        <TableCell align='right'>1</TableCell>
                        <TableCell align='right'>
                          199
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>

    </div>
  )
}

export default InvoicesListFalse
