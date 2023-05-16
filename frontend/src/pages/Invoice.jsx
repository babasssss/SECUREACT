import { useState, useEffect } from 'react'
import '../styles/HeaderStyle.scss'
import { getCustomer, getInvoice } from '../services/Api'
import { useAuth } from '../contexts/AuthContext'
import InvoicesList from '../components/InvoicesList'
import InvoicesListFalse from '../components/InvoicesListFalse'
import { Grid } from '@mui/material'
import AddInvoicePopup from '../components/AddInvoicePopup'

function Invoice () {
  const [invoices, setInvoices] = useState() // Déclare l'état invoices avec la fonction setInvoices pour mettre à jour l'état
  const [customers, setCustomers] = useState() // Déclare l'état customers avec la fonction setCustomers pour mettre à jour l'état
  // const [products, setProducts] = useState()

  const { state: { user } } = useAuth() // Utilise le contexte useAuth pour accéder à l'état d'utilisateur

  const getData = async () => {
    const resultInvoices = await getInvoice(user._id) // Appelle la fonction getInvoice pour obtenir les factures de l'utilisateur actuel
    setInvoices(resultInvoices) // Met à jour l'état invoices avec les données des factures
    const resultCustomers = await getCustomer(user._id) // Appelle la fonction getCustomer pour obtenir les clients de l'utilisateur actuel
    setCustomers(resultCustomers) // Met à jour l'état customers avec les données des clients
    // const resultProducts = await getProduct(user._id)
    // setProducts(resultProducts)
  }
  // console.log(customers)

  useEffect(() => {
    getData() // Appelle la fonction getData lors du montage du composant pour récupérer les données des factures et des clients
  }, [])

  if (!invoices || !customers) { // Condition : si les données des factures ou des clients ne sont pas disponibles
    return (
      <>
        <div className='header'>
          <h1>Facture</h1>
          <InvoicesListFalse /> {/* Rend le composant InvoicesListFalse */}
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
              <AddInvoicePopup getData={getData} invoices={invoices} customers={customers} /> {/* Rend le composant AddInvoicePopup avec les données des factures et des clients */}
            </Grid>
          </Grid>
        </div>
        <InvoicesList invoices={invoices} customers={customers} /> {/* Rend le composant InvoicesList avec les données des factures et des clients */}
      </div>
    </>
  )
}

export default Invoice
