import './styles/App.scss'
import Navbar from './navigation/Navbar'
import Router from './navigation/Router'
import { AuthProvider } from './contexts/AuthContext'
import React from 'react'
import Footer from './pages/Footer'

const App = () => {
  return (
    <div className='App'>
      <AuthProvider>
        <Navbar />
        <Router />
        <Footer />
      </AuthProvider>
    </div>
  )
}

export default App
