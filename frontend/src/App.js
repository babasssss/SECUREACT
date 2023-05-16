import './styles/App.scss'
import Navbar from './navigation/Navbar' // Importe le composant Navbar
import Router from './navigation/Router' // Importe le composant Router
import { AuthProvider } from './contexts/AuthContext' // Importe le contexte AuthProvider
import React from 'react'
import Footer from './pages/Footer' // Importe le composant Footer

const App = () => {
  return (
    <div className='App'> {/* Div racine de l'application avec la classe 'App' */}
      <AuthProvider> {/* Enveloppe les composants enfants avec le contexte AuthProvider */}
        <Navbar /> {/* Rend le composant Navbar */}
        <Router /> {/* Rend le composant Router */}
        <Footer /> {/* Rend le composant Footer */}
      </AuthProvider>
    </div>
  )
}

export default App
