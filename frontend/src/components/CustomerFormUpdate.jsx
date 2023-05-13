import * as React from 'react'
import { Grid } from '@mui/material'

function CustomerFormUpdate ({ customer, getData }) {
  console.log(customer)

  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6}>
          {`${customer.firstName} ${customer.firstName}`}
        </Grid>
        <Grid item xs={12} sm={6}>
          {`${customer.email} `}
        </Grid>
        <Grid item xs={12} sm={6}>
          {`${customer.phone} `}
        </Grid>
      </Grid>
    </>
  )
}

export default CustomerFormUpdate
