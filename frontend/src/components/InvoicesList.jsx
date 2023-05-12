import * as React from 'react'
import '../styles/RestaurantList.scss'
import InvoiceListeItem from './InvoiceListItem'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useAuth } from '../contexts/AuthContext'

function InvoicesList ({ invoices }) {
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
          <InvoiceListeItem key={invoices.id} invoices={invoices} />
        </Table>
      </TableContainer>

      {/* {
        invoices.map(invoice => {
          return (
            <InvoiceListeItem key={invoice.id} invoice={invoice} />
          )
        })
      } */}
    </div>
  )
}

export default InvoicesList
