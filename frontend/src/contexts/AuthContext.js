import React, { useEffect } from 'react'
import { login, register } from '../services/Api'
import { toast } from 'react-toastify'

const AuthContext = React.createContext()

const actionTypes = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOADING: 'LOADING',
  LOGOUT: 'LOGOUT',
  REGISTER_SUCESS: 'REGISTER_SUCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE'

}

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  loading: false,
  error: null
}

const AuthReducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        token: action.data.token,
        user: action.data._user,
        loading: false,
        error: null
      }
    case actionTypes.REGISTER_SUCESS:
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
    case actionTypes.LOGOUT:
      return initialState

    default:
      throw new Error(`Unhandled action type : ${action.type}`)
  }
}
const AuthContextFactory = (dispatch) => ({
  login: async (credentials) => {
    try {
      console.log(credentials)
      const result = await login(credentials)
      toast.success(`Bon retour parmi nous, ${result._user.firstName.charAt(0).toUpperCase() + result._user.firstName.slice(1)}${result._user.lastName.charAt(0).toUpperCase()}. Tu nous as manqué ! `)
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        data: result
      })
    } catch (error) {
      toast.error('Identifiant ou mot de passe invalide ')
      dispatch({
        type: actionTypes.LOGIN_FAILURE,
        data: { error }
      })
    }
  },

  register: async (usersInfos) => {
    try {
      const result = await register(usersInfos)
      toast.success('Vous êtes connecté !')
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        data: result
      })
    } catch (error) {
      toast.error('Les informations saisie son incorrecte ! ')
      dispatch({
        type: actionTypes.REGISTER_FAILURE,
        data: { error }
      })
    }
  },
  logout: () => {
    toast.warn('Déconnexion ...')
    dispatch({
      type: actionTypes.LOGOUT
    })
  }
})

const AuthProvider = ({ children }) => {
  const savedState = window.localStorage.getItem('AUTH')
  const _initialState = savedState ? JSON.parse(savedState) : initialState
  const [state, dispatch] = React.useReducer(AuthReducer, _initialState)

  useEffect(() => {
    window.localStorage.setItem('AUTH', JSON.stringify(state))
  }, [state])
  return (
    <>
      <AuthContext.Provider value={{ state, ...AuthContextFactory(dispatch) }}>
        {children}
      </AuthContext.Provider>
    </>
  )
}

const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) throw new Error('use Auth must be used inside a AuthProvider')
  return context
}

export {
  AuthProvider,
  useAuth

}
