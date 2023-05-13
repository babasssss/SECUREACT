import { useEffect, useState } from 'react'
import TextInput from './TextInput'
import '../styles/CustomerForm.scss'
import { createCustomer, getCustomer } from '../services/Api'
import { MenuItem } from '@mui/material'
import { useAuth } from '../contexts/AuthContext'
import SubmitButtonPoppup from './SubmitButtonPopup'

function CustomerForm ({ onSubmit, getData }) {
  const { state: { user } } = useAuth()
  const [credentials, setCredentials] = useState({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@yahoo.com',
    phone: '0634789334',
    street: '22 rue de test',
    city: 'Tours',
    country: 'France',
    customerType: '1'
  })

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
      const result = await createCustomer(credentials, user._id)
      getData()
      console.log(result)
      // Appelez la fonction onSubmit pour indiquer que le formulaire a été validé avec succès
      onSubmit()
    } else {
      console.log('erreor')
    }
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
            inputProps={{
              minLength: 10,
              maxLength: 14
            }}
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
            onChange={handleChange}
            inputProps={{
              minLength: 5,
              maxLength: 5
            }}
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
          <SubmitButtonPoppup value='Enregistrer' />
        </div>
      </form>
    </>
  )
}

export default CustomerForm
