import * as React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

function createData (name, numInvoice, date, maturity, protein, price) {
  return {
    name,
    numInvoice,
    date,
    maturity,
    protein,
    price
  }
}

function Row (props) {
  const { row } = props
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.name}
        </TableCell>
        <TableCell align='right'>{row.numInvoice}</TableCell>
        <TableCell align='right'>{row.date}</TableCell>
        <TableCell align='right'>{row.maturity}</TableCell>
        <TableCell align='right'>{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Produits
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell align='left'>NOM</TableCell>
                    <TableCell>DESCRIPTION</TableCell>
                    <TableCell>QUANTITE</TableCell>
                    <TableCell>UNITE</TableCell>
                    <TableCell>PRIX (€)</TableCell>
                    <TableCell>TYPE DE PRIX</TableCell>
                    <TableCell>TVA</TableCell>
                    <TableCell>MONTANT</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell align='right'>{row.date}</TableCell>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

function InvoicesList ({ invoices, customers }) {
  console.log(customers)

  const rows = invoices.map((invoice) => {
    const customer = customers.find((c) => c.id === invoice.customerId)
    const productName = customer ? `${customer.firstName} ${customer.lastName}` : ''

    return createData(
      productName,
      invoice.numInvoice,
      invoice.date.substring(0, 10),
      invoice.maturity.substring(0, 10),
      4.0,
      3.99
    )
  })

  return (
    <TableBody>
      {rows.map((row) => (
        <Row key={row.name} row={row} />
      ))}
    </TableBody>
  )
}

export default InvoicesList
