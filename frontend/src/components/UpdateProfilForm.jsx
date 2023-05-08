import { useState } from 'react'
import TextInput from './TextInput'
import SubmitButton from './SubmitButton'
import '../styles/Form_Auth.scss'

function UpdateProfilForm ({ onSubmit }) {
  const [credentials, setCredentials] = useState({})

  const handleChange = (event) => {
    const inputName = event.target.name
    const inputValue = event.target.value
    setCredentials({
      ...credentials,
      [inputName]: inputValue
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(credentials)
  }
  return (
    <>
      <h2>Mon profil</h2>
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

          <SubmitButton value='Mettre à jour' />
        </div>
      </form>
    </>
  )
}

export default UpdateProfilForm
