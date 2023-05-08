import { Button } from '@mui/material'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'
import UpdateProfilForm from '../components/UpdateProfilForm'
import { Link } from 'react-router-dom'

function Profil () {
  const [isResgister, setResgister] = useState(false)

  const { login, register, state: { isAuthenticated } } = useAuth()

  const handleSubmit = async (credentials) => {
    if (isResgister) {
      register(credentials)
    } else {
      login(credentials)
    }
  }

  return (
    <>
      <div className='auth'>
        <h1>Profil</h1>
        {!isAuthenticated
          ? (
            <h1><Link to='/auth'>Authentification</Link></h1>
            )
          : (
            <>
              <UpdateProfilForm onSubmit={handleSubmit} />
            </>
            )}

      </div>
    </>
  )
}
export default Profil
