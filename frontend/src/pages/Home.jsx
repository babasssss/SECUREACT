import { useAuth } from '../contexts/AuthContext'
import { login } from '../services/Api'
function Home () {
  const { logout, state: { isAuthenticated } } = useAuth()
  return (
    <>
      <h1>HOME</h1>
      <h3>Bienvenue sur l'application SECUREACT</h3>
      {isAuthenticated
        ? (
          // Affichage du boutton de déconnection si l'utilisateur est connecté
          <button onClick={logout}>Se déconnecter</button>
          )
        : <button>Se connecter</button>}
    </>
  )
}

export default Home
