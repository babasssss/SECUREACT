import React, { useEffect } from 'react'
import { login, register, update } from '../services/Api'
import { toast } from 'react-toastify'

// Création du contexte AuthContext
const AuthContext = React.createContext()

// Définition des types d'actions possibles
const actionTypes = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOADING: 'LOADING',
  LOGOUT: 'LOGOUT',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  PROFILE_UPDATE_SUCCESS: 'PROFILE_UPDATE_SUCCESS',
  PROFILE_UPDATE_FAILURE: 'PROFILE_UPDATE_FAILURE'
}

// État initial du contexte Auth
const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  loading: false,
  error: null
}

// Reducer pour gérer les actions sur l'état du contexte
const AuthReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        token: action.data.token,
        user: action.data._user,
        loading: false,
        error: null
      }
    case actionTypes.REGISTER_SUCCESS:
      return {
        isAuthenticated: true,
        token: action.data.token,
        user: action.data._user,
        loading: false,
        error: null
      }
    case actionTypes.LOGIN_FAILURE:
      return {
        ...initialState,
        error: action.data.error
      }
    case actionTypes.REGISTER_FAILURE:
      return {
        ...initialState,
        error: action.data.error
      }
    case actionTypes.LOADING:
      return {
        ...state,
        loading: true
      }
    case actionTypes.PROFILE_UPDATE_SUCCESS:
      return {
        isAuthenticated: true,
        token: window.localStorage.getItem('token'),
        user: action.data._user,
        loading: false,
        error: window.localStorage.getItem('error')
      }
    case actionTypes.PROFILE_UPDATE_FAILURE:
      return {
        isAuthenticated: true,
        token: window.localStorage.getItem('token'),
        user: action.data._user,
        loading: false,
        error: action.data.error
      }
    case actionTypes.LOGOUT:
      return initialState

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

// Fonction utilitaire pour créer les actions du contexte
const AuthContextFactory = (dispatch) => ({
  login: async (credentials) => {
    try {
      const result = await login(credentials)
      toast.success(`Bon retour parmi nous, ${result._user.firstName.charAt(0).toUpperCase() + result._user.firstName.slice(1)} ${result._user.lastName.charAt(0).toUpperCase()}. Tu nous as manqué !`)
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        data: result
      })
    } catch (error) {
      toast.error('Identifiant ou mot de passe invalide')
      dispatch({
        type: actionTypes.LOGIN_FAILURE,
        data: { error }
      })
    }
  },
  update: async (updateProfile, id) => {
    try {
      const result = await update(updateProfile, id)
      toast.success('Votre profil a été mis à jour !')
      dispatch({
        type: actionTypes.PROFILE_UPDATE_SUCCESS,
        data: result
      })

      // Mettre à jour le stockage local avec le nouveau profil
      const auth = JSON.parse(window.localStorage.getItem('AUTH'))
      const updatedAuth = {
        ...auth,
        user: result
      }
      window.localStorage.setItem('AUTH', JSON.stringify(updatedAuth))
    } catch (error) {
      toast.error('Les informations saisies sont incorrectes !')
      dispatch({
        type: actionTypes.PROFILE_UPDATE_FAILURE
      })
    }
  },

  register: async (userInfo) => {
    try {
      const result = await register(userInfo)
      toast.success('Vous êtes connecté !')
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        data: result
      })
    } catch (error) {
      toast.error('Les informations saisies sont incorrectes !')
      dispatch({
        type: actionTypes.REGISTER_FAILURE,
        data: { error }
      })
    }
  },
  logout: () => {
    toast.warn('Déconnexion...')
    dispatch({
      type: actionTypes.LOGOUT
    })
  }
})

// Composant AuthProvider qui fournit le contexte aux composants enfants
const AuthProvider = ({ children }) => {
  // Récupération de l'état du contexte depuis le stockage local, s'il existe
  const savedState = window.localStorage.getItem('AUTH')
  const _initialState = savedState ? JSON.parse(savedState) : initialState

  // Utilisation du Reducer pour gérer l'état du contexte
  const [state, dispatch] = React.useReducer(AuthReducer, _initialState)

  // Effet pour mettre à jour le stockage local lorsque l'état du contexte change
  useEffect(() => {
    window.localStorage.setItem('AUTH', JSON.stringify(state))
  }, [state])

  return (
    <AuthContext.Provider value={{ state, ...AuthContextFactory(dispatch) }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook personnalisé pour utiliser le contexte Auth
const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside an AuthProvider')
  return context
}

export {
  AuthProvider,
  useAuth
}
