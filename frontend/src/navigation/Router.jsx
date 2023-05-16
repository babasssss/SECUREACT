import { Navigate, Route, Routes } from 'react-router-dom'
import About from '../pages/About'
import Home from '../pages/Home'
import Auth from '../pages/Auth'
import Profil from '../pages/Profil'
import Invoice from '../pages/Invoice'

import { useAuth } from '../contexts/AuthContext'
import Customer from '../pages/Customer'

function Router () {
  const { state: { isAuthenticated } } = useAuth()

  // Si l'utilisateur est authentifié, affiche les routes accessibles après l'authentification
  if (isAuthenticated) {
    return (
      <Routes>
        {/* Route de la page d'accueil */}
        <Route index path='/' element={<Home />} />
        {/* Route de la page "About" */}
        <Route path='/about' element={<About />} />
        {/* Route de la page de profil */}
        <Route path='/profil' element={<Profil />} />
        {/* Route de la page de factures */}
        <Route path='/invoice' element={<Invoice />} />
        {/* Route de la page de clients */}
        <Route path='/customer' element={<Customer />} />
        {/* Redirection vers la page de profil en cas d'accès à la page d'authentification */}
        <Route path='/auth' element={<Navigate to='/profil' replace />} />
      </Routes>
    )
  } else {
    // Si l'utilisateur n'est pas authentifié, affiche les routes accessibles avant l'authentification
    return (
      <Routes>
        {/* Route de la page d'accueil */}
        <Route index path='/' element={<Home />} />
        {/* Route de la page "About" */}
        <Route path='/about' element={<About />} />
        {/* Route de la page d'authentification */}
        <Route path='/auth' element={<Auth />} />
        {/* Redirection vers la page d'accueil en cas d'accès aux pages non autorisées */}
        <Route path='/invoice' element={<Invoice />} />
        <Route path='/profil' element={<Navigate to='/' replace />} />
        <Route path='/customer' element={<Navigate to='/' replace />} />
      </Routes>
    )
  }
}

export default Router
