import { useAuth } from '../contexts/AuthContext'
import '../styles/HeaderStyle.scss'

import UpdateProfilForm from '../components/UpdateProfilForm'
import { Link } from 'react-router-dom'
function Profil () {
  const { updateProfil, state: { isAuthenticated } } = useAuth()
  const handleSubmit = async (credentials) => {
    updateProfil(credentials)
  }

  return (
    <>
      <div className='header'>
        <div className='auth'>
          <h1>Profil</h1>
          {!isAuthenticated
            ? (<h1><Link to='/auth'>Authentification</Link></h1>)
            : (
              <>
                <UpdateProfilForm onSubmit={handleSubmit} />
              </>
              )}
        </div>
      </div>
    </>
  )
}
export default Profil
