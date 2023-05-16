import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import '../styles/HeaderStyle.scss'
import '../styles/Customer.scss'
import { getCustomer } from '../services/Api'
import CustomersList from '../components/CustomersList'
import Grid from '@mui/material/Grid'
import AddCustomerPopup from '../components/AddCustomerPopup'

function Customer () {
  const [customer, setCustomers] = useState() // État local pour les clients
  const { state: { user } } = useAuth() // Récupère l'utilisateur authentifié depuis le contexte AuthContext

  const getData = async () => {
    // Appelle la fonction getCustomer avec l'ID de l'utilisateur
    const result = await getCustomer(user._id)
    // Met à jour l'état local avec les clients récupérés
    setCustomers(result)
  }

  useEffect(() => {
    // Effectue une requête pour récupérer les clients lorsque le composant est monté
    getData()
  }, [])

  if (!customer) {
    return <h1>Chargement...</h1> // Si les clients n'ont pas encore été chargés, affiche un message de chargement
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
              {/* Composant AddCustomerPopup avec la fonction getData comme prop */}
              <AddCustomerPopup getData={getData} />
            </Grid>
          </Grid>
        </div>
        {/* Composant CustomersList avec les clients et la fonction getData comme props */}
        <CustomersList customers={customer} getData={getData} />
      </div>
    </>
  )
}

export default Customer
