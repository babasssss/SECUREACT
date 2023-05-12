import * as React from 'react'
import '../styles/RestaurantList.scss'
import { Paper, Table, TableContainer } from '@mui/material'
import CustomerListItem from './CustomerListItem'

function CustomersList ({ customers }) {
  console.log('CustomersList')
  console.log(customers)

  return (
    <div className='list-container'>
      <TableContainer component={Paper}>
        <Table aria-label='collapsible table'>
          <CustomerListItem key={customers.user} customers={customers} />
        </Table>
      </TableContainer>
    </div>
  )
}

export default CustomersList
