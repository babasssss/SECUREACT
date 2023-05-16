import { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import Button from '@mui/material/Button'
import '../styles/Form_Auth.scss'
import { useAuth } from '../contexts/AuthContext'
import '../styles/HeaderStyle.scss'

function Auth () {
  // État local pour la gestion de l'inscription ou de la connexion
  const [isResgister, setResgister] = useState(false)
  // Récupère les fonctions de connexion et d'inscription depuis le contexte AuthContext
  const { login, register } = useAuth()

  const handleSubmit = async (credentials) => {
    if (isResgister) {
      // Appelle la fonction register avec les informations d'identification pour l'inscription
      register(credentials)
    } else {
      // Appelle la fonction login avec les informations d'identification pour la connexion
      login(credentials)
    }
  }

  const handleRegisterChange = (event) => {
    event.preventDefault()
    // Inverse la valeur de l'état local pour basculer entre l'inscription et la connexion
    setResgister(!isResgister)
  }

  return (
    <>
      <div className='header'>
        <div className='auth'>
          <h1>AUTHENTIFICATION</h1>

          {/* Affiche le formulaire d'inscription ou de connexion en fonction de la valeur de l'état local */}
          {isResgister
            ? <RegisterForm onSubmit={handleSubmit} />
            : <LoginForm onSubmit={handleSubmit} />}

          {/* Bouton pour basculer entre l'inscription et la connexion */}
          <Button onClick={handleRegisterChange} variant='outlined'>
            {isResgister ? "J'ai déjà un compte" : "J'ai pas de compte "} {/* Texte du bouton en fonction de la valeur de l'état local */}
          </Button>
        </div>
      </div>
    </>
  )
}

export default Auth
