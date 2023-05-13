import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import '../styles/HeaderStyle.scss'
import '../styles/Customer.scss'
import { getCustomer } from '../services/Api'
import CustomersList from '../components/CustomersList'
import Grid from '@mui/material/Grid'
import AddCustomerPopup from '../components/CustomerPopup'

function Customer () {
  const [customer, setCustomers] = useState()
  const { state: { user } } = useAuth()

  const getData = async () => {
    const result = await getCustomer(user._id)
    setCustomers(result)
  }

  useEffect(() => {
    getData()
  }, [])

  if (!customer) {
    return <h1>Chargement...</h1>
  }
  return (
    <>
      <div className='header'>
        <div className='center'>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <h1>Client</h1>
            </Grid>
            <Grid item xs={4}>
              <AddCustomerPopup getData={getData} />
            </Grid>
          </Grid>
        </div>
        <CustomersList customers={customer} getData={getData} />
      </div>
    </>
  )
}

export default Customer
