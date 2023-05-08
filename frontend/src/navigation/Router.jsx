import { Route, Routes } from 'react-router-dom'
import About from '../pages/About'
import Home from '../pages/Home'
import Auth from '../pages/Auth'

import { useAuth } from '../contexts/AuthContext'

function Router () {
  const { state: { isAuthenticated } } = useAuth()
  // if (isAuthenticated)

  return (
    <Routes>
      <Route index path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/auth' element={<Auth />} />
    </Routes>
  )
}

export default Router
