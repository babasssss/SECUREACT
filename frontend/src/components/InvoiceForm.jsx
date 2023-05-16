import { useState } from 'react'
import TextInput from './TextInput'
import '../styles/InvoiceForm.scss'
import { createCustomer } from '../services/Api'
import { useAuth } from '../contexts/AuthContext'
import SubmitButtonPoppup from './SubmitButtonPopup'
import { MenuItem, TextField } from '@mui/material'

function InvoiceForm ({ onSubmit, getData, invoices, customers }) {
  const { state: { user } } = useAuth()
  const [credentials, setCredentials] = useState()
  const [invoiceDate, setInvoiceDate] = useState('')
  const [expirationDate, setExpirationDate] = useState('')

  const handleChange = (event) => {
    const inputName = event.target.name
    const inputValue = event.target.value
    setCredentials({
      ...credentials,
      [inputName]: inputValue
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (credentials.firstName && credentials.lastName && credentials.customerType && credentials.customerType && credentials.email && credentials.street && credentials.city && credentials.country && credentials.postalCode) {
      console.log(credentials)
      // const result = await createCustomer(credentials, user._id)
      // console.log(result)
      await createCustomer(credentials, user._id)
      getData()
      // Appelez la fonction onSubmit pour indiquer que le formulaire a été validé avec succès
      onSubmit()
    } else {
      console.log('erreor')
    }
  }

  const handleInvoiceDateChange = (event) => {
    const selectedDate = event.target.value
    setInvoiceDate(selectedDate)

    // Calculer la date d'expiration en ajoutant 1 mois à la date de facturation
    const invoiceDateObj = new Date(selectedDate)
    const expirationDateObj = new Date(invoiceDateObj.setMonth(invoiceDateObj.getMonth() + 1))
    const formattedExpirationDate = expirationDateObj.toISOString().split('T')[0]
    setExpirationDate(formattedExpirationDate)
  }

  return (
    <>
      <form noValidate onSubmit={handleSubmit}>
        <h4>Information Facture</h4><br />
        <div className='formInvoice'>

          {/* Champ : Séléction du client */}
          <TextInput
            required
            id='outlined-select-currency'
            select
            name='customer'
            label='Client'
            onChange={handleChange}
          >
            {customers.map((customer) => {
              return (
                <MenuItem key={customer._id} value={customer._id}>
                  {`${customer.firstName} ${customer.lastName}`}
                </MenuItem>
              )
            })}
          </TextInput>

          {/* Champ : Numéro de factures */}
          <TextInput
            label='Numero de facture'
            type='number'
            name='numInvoice'
            onChange={handleChange}
            inputProps={{
              maxLength: 5
            }}
          />

          {/* Champ : Conditions de paiement */}
          <TextInput
            id='outlined-select-currency'
            select
            name='paymentType'
            label='Conditions de paiement'
            onChange={handleChange}
          >
            <MenuItem key='0' value='0'>
              0 jour
            </MenuItem>
            <MenuItem key='7' value='7'>
              7 jours
            </MenuItem>
            <MenuItem key='14' value='14'>
              14 jours
            </MenuItem>
            <MenuItem key='30' value='30'>
              30 jours
            </MenuItem>
            <MenuItem key='60' value='60'>
              60 jours
            </MenuItem>
            <MenuItem key='90' value='90'>
              90 jours
            </MenuItem>
          </TextInput>

          {/* Champ: Date de la facture */}
          <TextInput
            type='date'
            id='filled-required'
            label='Date de facturation'
            variant='standard'
            name='date'
            value={invoiceDate}
            onChange={handleInvoiceDateChange}
          />

          {/* Champ: Expiration */}
          <TextInput
            disabled
            type='date'
            id='standard-disabled'
            label='Expiration'
            variant='standard'
            onChange={handleChange}
            value={expirationDate}
          />

          {/* Champ : Message */}
          <TextField
            id='outlined-textarea'
            label='Message '
            placeholder='Message optionnel '
            multiline
          />

        </div>
        <h4>Desciption facture</h4><br />
        <div className='formInvoice'>
          {/* Champ : Produits */}
          <TextInput
            id='outlined-select-currency'
            select
            name='product'
            label='Produit'
            onChange={handleChange}
          >
            {customers.map((customer) => {
              return (
                <MenuItem key={customer._id} value={customer._id}>
                  {`${customer.firstName} ${customer.lastName}`}
                </MenuItem>
              )
            })}
          </TextInput>
        </div>
        <SubmitButtonPoppup value='Enregistrer' />
      </form>
    </>
  )
}

export default InvoiceForm
