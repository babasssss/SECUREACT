import { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import Button from '@mui/material/Button'
import '../styles/Form_Auth.scss'
import { useAuth } from '../contexts/AuthContext'

function Auth () {
  const [isResgister, setResgister] = useState(false)

  const { login, register } = useAuth()

  const handleSubmit = async (credentials) => {
    if (isResgister) {
      register(credentials)
    } else {
      login(credentials)
    }
  }

  const handleRegisterChange = (event) => {
    event.preventDefault()
    setResgister(!isResgister)
  }

  return (
    <>
      <div className='auth'>
        <h1>AUTHENTIFICATION</h1>
        {
        isResgister
          ? <RegisterForm onSubmit={handleSubmit} />
          : <LoginForm onSubmit={handleSubmit} />
      }
        <Button onClick={handleRegisterChange} variant='outlined'>
          {
          isResgister
            ? "J'ai déjà un compte"
            : "J'ai pas de compte "
        }
        </Button>
      </div>
    </>
  )
}

export default Auth
