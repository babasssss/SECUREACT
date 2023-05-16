import { useState, useEffect } from 'react'
import '../styles/HeaderStyle.scss'
import { getCustomer, getInvoice } from '../services/Api'
import { useAuth } from '../contexts/AuthContext'
import InvoicesList from '../components/InvoicesList'
import InvoicesListFalse from '../components/InvoicesListFalse'
import { Grid } from '@mui/material'
import AddInvoicePopup from '../components/AddInvoicePopup'

function Invoice () {
  const [invoices, setInvoices] = useState()
  const [customers, setCustomers] = useState()
  const [products, setProducts] = useState()
  const { state: { user } } = useAuth()

  const getData = async () => {
    const resultInvoices = await getInvoice(user._id)
    setInvoices(resultInvoices)
    const resultCustomers = await getCustomer(user._id)
    setCustomers(resultCustomers)
    const resultProducts = await getProduct(user._id)
    setProducts(resultProducts)
  }
  // console.log(customers)

  useEffect(() => {
    getData()
  }, [])

  if (!invoices || !customers) {
    return (
      <>
        <div className='header'>
          <h1>Facture</h1>
          <InvoicesListFalse />
        </div>
      </>
    )
  }
  return (
    <>
      <div className='header'>
        <div className='center'>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <h1>Facture</h1>
            </Grid>
            <Grid item xs={4}>
              <AddInvoicePopup getData={getData} invoices={invoices} customers={customers} />
            </Grid>
          </Grid>
        </div>
        <InvoicesList invoices={invoices} customers={customers} />
      </div>

    </>
  )
}

export default Invoice
