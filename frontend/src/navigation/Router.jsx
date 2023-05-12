import { Navigate, Route, Routes } from 'react-router-dom'
import About from '../pages/About'
import Home from '../pages/Home'
import Auth from '../pages/Auth'
import Profil from '../pages/Profil'
import Invoice from '../pages/Invoice'

import { useAuth } from '../contexts/AuthContext'

function Router () {
  const { state: { isAuthenticated } } = useAuth()
  if (isAuthenticated) {
    return (
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/profil' element={<Profil />} />
        <Route path='/invoice' element={<Invoice />} />
        <Route path='/auth' element={<Navigate to='/profil' replace />} />
      </Routes>
    )
  } else {
    return (
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/invoice' element={<Invoice />} />
        <Route path='/profil' element={<Navigate to='/auth' replace />} />
      </Routes>
    )
  }
}

export default Router
