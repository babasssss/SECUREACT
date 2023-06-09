import { useState } from 'react'
import TextInput from './TextInput'
import SubmitButton from './SubmitButton'
import '../styles/Form_Auth.scss'
import { useAuth } from '../contexts/AuthContext'

function UpdateProfilForm ({ onSubmit }) {
  // Utilisation du contexte Auth pour récupérer les informations de l'utilisateur connecté
  const { state: { user } } = useAuth()

  // État local pour stocker les informations du formulaire
  const [credentials, setCredentials] = useState({
    email: user.email,
    lastName: user.lastName,
    firstName: user.firstName,
    phone: user.phone
  })

  // Gestionnaire de changement pour mettre à jour les informations du formulaire
  const handleChange = (event) => {
    event.preventDefault()
    const inputName = event.target.name
    const inputValue = event.target.value
    setCredentials({
      ...credentials,
      [inputName]: inputValue
    })
  }

  // Gestionnaire de soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(credentials) // Appel de la fonction de soumission fournie en prop
  }

  return (
    <>
      <form noValidate onSubmit={handleSubmit}>
        <div className='form'>
          <TextInput
            label='Email :'
            type='email'
            name='email'
            placeholder='secureact@yahoo.fr'
            onChange={handleChange}
            value={credentials.email}
          />
          <TextInput
            label='Prénom :'
            type='text'
            name='firstName'
            placeholder='DUPONT'
            onChange={handleChange}
            value={credentials.firstName}
          />
          <TextInput
            label='Nom :'
            type='text'
            name='lastName'
            placeholder='ANTOINE'
            onChange={handleChange}
            value={credentials.lastName}
          />
          <TextInput
            label='Téléphone :'
            type='number'
            name='phone'
            placeholder='0678456434'
            onChange={handleChange}
            value={credentials.phone}
          />

          <SubmitButton value='Mettre à jour' />
        </div>
      </form>
    </>
  )
}

export default UpdateProfilForm
