import * as React from 'react'
import { MenuItem } from '@mui/material'
import { useState } from 'react'
import { updateCustomer } from '../services/Api'
import TextInput from './TextInput'
import '../styles/CustomerForm.scss'
import SubmitButtonPoppup from './SubmitButtonPopup'

function CustomerFormUpdate ({ onSubmit, customer, getData }) {
  const [credentials, setCredentials] = useState({
    firstName: customer.firstName,
    lastName: customer.lastName,
    customerType: customer.customerType,
    email: customer.email,
    phone: customer.phone,
    street: customer.address.street,
    postalCode: customer.address.postalCode,
    city: customer.address.city,
    country: customer.address.country
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(credentials)
    if (credentials.firstName !== null && credentials.lastName !== null && credentials.customerType !== null && credentials.customerType !== null && credentials.email !== null && credentials.street !== null && credentials.city !== null && credentials.country !== null && credentials.postalCode !== null) {
      await updateCustomer(credentials, customer.id)
      getData()
      // Appelez la fonction onSubmit pour indiquer que le formulaire a été validé avec succès
      onSubmit()
    } else {
      console.log('erreor')
    }
  }

  const handleChange = (event) => {
    const inputName = event.target.name
    const inputValue = event.currentTarget.value // Utilisez event.currentTarget.value pour récuperer les nouvel entrer utilisateur
    setCredentials({
      ...credentials,
      [inputName]: inputValue
    })
  }

  return (
    <>

      <form noValidate onSubmit={handleSubmit}>
        <div className='formCustomer'>
          <h4>Information client</h4><br />
          {/* Champ : Prénom */}
          <TextInput
            label='Prénom'
            type='text'
            name='firstName'
            placeholder='Jean'
            onChange={handleChange}
            value={credentials.firstName}
          />

          {/* Champ : Nom */}
          <TextInput
            label='Nom'
            type='text'
            name='lastName'
            onChange={handleChange}
            value={credentials.lastName}
          />

          {/* Champ : Type de client */}
          <TextInput
            id='outlined-select-currency'
            select
            name='customerType'
            label='Type de client'
            onChange={handleChange}
            defaultValue={credentials.customerType}
          >
            <MenuItem key='1' value='1'>
              Client professionnel
            </MenuItem>
            <MenuItem key='0' value='0'>
              Client particulier
            </MenuItem>
          </TextInput>

          <br />
          <h4>Coordonées client</h4>
          <br />
          {/* Champ : Email */}
          <TextInput
            label='Email'
            type='email'
            name='email'
            onChange={handleChange}
            value={credentials.email}
          />

          {/* Champ : Téléphone */}
          <TextInput
            id='outlined-number'
            label='Téléphone'
            name='phone'
            type='number'
            onChange={handleChange}
            value={credentials.phone}
          />

          {/* Champ : Adresse */}
          <TextInput
            label='Adresse'
            type='text'
            name='street'
            onChange={handleChange}
            value={credentials.street}
          />
          {/* Champ : Code Postal */}
          <TextInput
            label='Code postal'
            type='number'
            name='postalCode'
            value={credentials.postalCode}
          />
          {/* Champ : Ville */}
          <TextInput
            label='Ville'
            type='text'
            name='city'
            onChange={handleChange}
            value={credentials.city}
          />
          {/* Champ : Pays */}
          <TextInput
            label='Pays'
            type='text'
            name='country'
            onChange={handleChange}
            value={credentials.country}
          />

          <SubmitButtonPoppup value='Modifier' />
        </div>
      </form>
    </>
  )
}

export default CustomerFormUpdate
