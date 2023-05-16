import { useAuth } from '../contexts/AuthContext'
import '../styles/HeaderStyle.scss'
import UpdateProfilForm from '../components/UpdateProfilForm' // Importe le composant UpdateProfilForm
import { Link } from 'react-router-dom' // Importe le composant Link de react-router-dom

function Profil () {
  const { update, state: { isAuthenticated, user } } = useAuth() // Utilise le hook useAuth pour accéder aux fonctions et à l'état d'authentification

  const handleSubmit = async (credentials) => {
    update(credentials, user._id) // Appelle la fonction d'authentification update avec les credentials et l'ID de l'utilisateur actuel
  }

  return (
    <>
      <div className='header'> {/* Div avec la classe 'header' */}
        <div className='auth'> {/* Div avec la classe 'auth' */}
          <h1>Profil</h1> {/* Titre "Profil" */}
          {
          !isAuthenticated
            ? (
          // Condition : si l'utilisateur n'est pas authentifié
              <h1><Link to='/auth'>Authentification</Link></h1> // Affiche le lien vers la page d'authentification
              )
            : (
              <>
                <UpdateProfilForm onSubmit={handleSubmit} /> {/* Rend le formulaire de mise à jour du profil avec la fonction de soumission handleSubmit */}
              </>
              )
          }
        </div>
      </div>
    </>
  )
}

export default Profil
