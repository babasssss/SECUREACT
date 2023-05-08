import { useState } from 'react'
import TextInput from './TextInput'
import SubmitButton from './SubmitButton'
import '../styles/Form_Auth.scss'

function LoginForm ({ onSubmit }) {
  const [credentials, setCredentials] = useState({
    email: 'ba.test@gmail.fr',
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
      <h2>Se connecter</h2>
      <form noValidate onSubmit={handleSubmit}>
        <div className='form'>
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
          <SubmitButton value='Se connecter' />
        </div>
      </form>
    </>
  )
}

export default LoginForm
