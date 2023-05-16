import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.scss' // Importe les fichiers de style SCSS
import App from './App' // Importe le composant principal de l'application
import { ToastContainer } from 'react-toastify' // Importe le composant ToastContainer pour les notifications
import 'react-toastify/dist/ReactToastify.css' // Importe les styles CSS pour les notifications
import reportWebVitals from './reportWebVitals' // Importe la fonction pour mesurer les performances

// Crée un point d'entrée dans l'élément avec l'ID 'root' du document HTML
const root = ReactDOM.createRoot(document.getElementById('root'))

// Rend le contenu dans le point d'entrée
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App /> {/* Rend le composant principal de l'application */}
      <ToastContainer /> {/* Rend le composant ToastContainer pour les notifications */}
    </BrowserRouter>
  </React.StrictMode>
)

// Appelle la fonction pour mesurer les performances de l'application
reportWebVitals()
