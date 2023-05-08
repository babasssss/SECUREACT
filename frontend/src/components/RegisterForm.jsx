import { useState } from 'react'
import TextInput from './TextInput'
import SubmitButton from './SubmitButton'
import '../styles/Form_Auth.scss'

function RegisterForm ({ onSubmit }) {
  const [credentials, setCredentials] = useState({
    email: 'ba.soreau@protonsss.me',
    firstName: 'bastien',
    lastName: 'soreau',
    phone: '0454323456',
    password: 'password'
  })

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
      <h2>Inscription</h2>
      <form noValidate onSubmit={handleSubmit}>
        <div className='form'>
          <TextInput
            label='Nom :'
            type='text'
            name='lastName'
            onChange={handleChange}
            value={credentials.lastName}
          />

          <TextInput
            label='Prénom :'
            type='text'
            name='firstName'
            placeholder='Jules'
            onChange={handleChange}
            value={credentials.firstName}
          />

          <TextInput
            label='Téléphone :'
            type='text'
            name='phone'
            onChange={handleChange}
            value={credentials.phone}
          />

          <TextInput
            label='Email :'
            type='email'
            name='email'
            placeholder='toto@tata.fr'
            onChange={handleChange}
            value={credentials.email}
          />

          <TextInput
            label='Mot de passe :'
            type='password'
            name='password'
            onChange={handleChange}
            value={credentials.password}
          />

          <SubmitButton value='Créer mon compte' />
        </div>
      </form>
    </>
  )
}

export default RegisterForm
