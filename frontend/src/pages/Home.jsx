import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

function Home () {
  const { logout, state: { isAuthenticated } } = useAuth()
  return (
    <>
      <h1>HOME</h1>
      <h3>Bienvenue sur l'application SECUREACT</h3>
      {
        isAuthenticated
          ? (
            // Affichage du boutton de déconnection si l'utilisateur est connecté
            <button onClick={logout}>Se déconnecter</button>
            )
          : <Link to='/auth'><button>Se connecter</button> </Link>
      }
    </>
  )
}

export default Home
