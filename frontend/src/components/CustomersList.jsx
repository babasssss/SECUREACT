import * as React from 'react'
import '../styles/RestaurantList.scss'
import { Paper, Table, TableContainer } from '@mui/material'
import CustomerListItem from './CustomerListItem'

function CustomersList ({ customers, getData }) {
  return (
    <div className='list-container'>
      <TableContainer component={Paper}>
        <Table aria-label='collapsible table'>
          <CustomerListItem key={customers.user} customers={customers} getData={getData} />
        </Table>
      </TableContainer>
    </div>
  )
}

export default CustomersList
