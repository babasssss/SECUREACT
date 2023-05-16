import React, { useEffect } from 'react'
import { updateProfil } from '../services/Api'
import { toast } from 'react-toastify'

// Création du contexte ProfilContext
const ProfilContext = React.createContext()

// Définition des types d'actions possibles
const actionTypes = {
  UPDATE_PROFIL_SUCCESS: 'UPDATE_PROFIL_SUCCESS',
  UPDATE_PROFIL_FAILURE: 'UPDATE_PROFIL_FAILURE',
  LOADING: 'LOADING'
}

// État initial du contexte Profil
const initialState = {
  isAuthenticated: true,
  loading: null,
  error: null
}

// Reducer pour gérer les actions sur l'état du contexte
const ProfilReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PROFIL_SUCCESS:
      return {
        isAuthenticated: true,
        loading: false,
        error: null
      }
    case actionTypes.UPDATE_PROFIL_FAILURE:
      return {
        ...initialState,
        error: action.data.error
      }
    case actionTypes.LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      throw new Error(`Unhandled action type : ${action.type}`)
  }
}

// Fonction utilitaire pour créer les actions du contexte
const ProfilContextFactory = (dispatch) => ({
  updateProfil: async (credentials) => {
    try {
      const result = await updateProfil(credentials, user._id)
      toast.success('Ton profil a été mis à jour ! ')
      dispatch({
        type: actionTypes.UPDATE_PROFIL_SUCCESS,
        data: result
      })
    } catch (error) {
      toast.error('Les informations sont invalides')
      dispatch({
        type: actionTypes.UPDATE_PROFIL_FAILURE,
        data: { error }
      })
    }
  }
})

// Composant ProfilProvider qui enveloppe les enfants avec le contexte ProfilContext
const ProfilProvider = ({ children }) => {
  const savedState = window.localStorage.getItem('AUTH')
  const _initialState = savedState ? JSON.parse(savedState) : initialState
  const [state, dispatch] = React.useReducer(ProfilReducer, _initialState)

  useEffect(() => {
    window.localStorage.setItem('AUTH', JSON.stringify(state))
  }, [state])

  return (
    <>
      <ProfilContext.Provider value={{ state, ...ProfilContextFactory(dispatch) }}>
        {children}
      </ProfilContext.Provider>
    </>
  )
}

// Hook personnalisé useProfil pour accéder au contexte Profil
const useProfil = () => {
  const context = React.useContext(ProfilContext)
  if (!context) throw new Error('useProfil must be used inside a ProfilProvider')
  return context
}

export {
  ProfilProvider,
  useProfil
}
