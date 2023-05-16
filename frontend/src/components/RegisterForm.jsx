import { useState } from 'react'
import TextInput from './TextInput'
import SubmitButton from './SubmitButton'
import '../styles/Form_Auth.scss'

function RegisterForm ({ onSubmit }) {
  const [credentials, setCredentials] = useState()

  // Gère les changements de valeur des champs de saisie
  const handleChange = (event) => {
    const inputName = event.target.name
    const inputValue = event.target.value

    // Met à jour l'état des credentials en ajoutant ou modifiant la valeur du champ de saisie correspondant
    setCredentials({
      ...credentials,
      [inputName]: inputValue
    })
  }

  // Gère la soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault()

    // Appelle la fonction onSubmit passée en prop avec les informations d'inscription (credentials)
    onSubmit(credentials)
  }

  return (
    <>
      <h2>Inscription</h2>
      <form noValidate onSubmit={handleSubmit}>
        <div className='form'>
          {/* Champ de saisie pour le nom */}
          <TextInput
            label='Nom :'
            type='text'
            name='lastName'
            placeholder='Dupont'
            onChange={handleChange}
          />

          {/* Champ de saisie pour le prénom */}
          <TextInput
            label='Prénom :'
            type='text'
            name='firstName'
            placeholder='Jules'
            onChange={handleChange}
          />

          {/* Champ de saisie pour le téléphone */}
          <TextInput
            label='Téléphone :'
            type='text'
            name='phone'
            placeholder='0696783457'
            onChange={handleChange}
          />

          {/* Champ de saisie pour l'e-mail */}
          <TextInput
            label='Email :'
            type='email'
            name='email'
            placeholder='antoine@gmail.fr'
            onChange={handleChange}
          />

          {/* Champ de saisie pour le mot de passe */}
          <TextInput
            label='Mot de passe :'
            type='password'
            name='password'
            onChange={handleChange}
          />

          {/* Bouton de soumission du formulaire */}
          <SubmitButton value='Créer mon compte' />
        </div>
      </form>
    </>
  )
}

export default RegisterForm
