import * as React from 'react'
import '../styles/RestaurantList.scss'
import InvoiceListeItem from './InvoiceListItem'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

function InvoicesList ({ invoices, customers }) {
  return (
    <div className='list-container'>
      <TableContainer component={Paper}>
        <Table aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>NOM CLIENT</TableCell>
              <TableCell align='right'>NUMÉRO</TableCell>
              <TableCell align='right'>CRÉER LE</TableCell>
              <TableCell align='right'>ECHÉANCE</TableCell>
              <TableCell align='right'>TOTAL TTC</TableCell>
            </TableRow>
          </TableHead>
          <InvoiceListeItem key={invoices.id} customers={customers} invoices={invoices} />
        </Table>
      </TableContainer>
    </div>
  )
}

export default InvoicesList
