import { useState } from 'react'
import TextInput from './TextInput'
import SubmitButton from './SubmitButton'
import '../styles/Form_Auth.scss'

function LoginForm ({ onSubmit }) {
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

    // Appelle la fonction onSubmit passée en prop avec les informations de connexion (credentials)
    onSubmit(credentials)
  }

  return (
    <>
      <h2>Se connecter</h2>
      <form noValidate onSubmit={handleSubmit}>
        <div className='form'>
          {/* Champ de saisie pour l'e-mail */}
          <TextInput
            label='Email :'
            type='email'
            name='email'
            placeholder='antoine@tahoo.fr'
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
          <SubmitButton value='Se connecter' />
        </div>
      </form>
    </>
  )
}

export default LoginForm
