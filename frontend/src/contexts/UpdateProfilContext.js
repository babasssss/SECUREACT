import React, { useEffect } from 'react'
import { updateProfil } from '../services/Api'
import { toast } from 'react-toastify'

const ProfilContext = React.createContext()

const actionTypes = {
  UPDATE_PROFIL_SUCCESS: 'UPDATE_PROFIL_SUCCESS',
  UPDATE_PROFIL_FAILURE: 'UPDATE_PROFIL_FAILURE',
  LOADING: 'LOADING'
}

const initialState = {
  isAuthenticated: true,
  // Il audrait faire quelquechose de ce type la : user: user avec const {state:{user}} = useAuth()
  // Mais je n'est pas réussi mêtre le syntème en place
  // user: null,
  loading: null,
  error: null
}

const ProfilReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PROFIL_SUCCESS:
      return {
        isAuthenticated: true,
        // user: action.data._user,
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
const ProfilContextFactory = (dispatch) => ({
  updateProfil: async (credentials) => {
    try {
      const result = await updateProfil(credentials, user._id)
      toast.success('Ton profil à été mis a jour ! ')
      dispatch({
        type: actionTypes.UPDATE_PROFIL_SUCCESS,
        data: result
      })
    } catch (error) {
      toast.error('Les informations sont invalide')
      dispatch({
        type: actionTypes.UPDATE_PROFIL_FAILURE,
        data: { error }
      })
    }
  }

})

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

const useProfil = () => {
  const context = React.useContext(ProfilContext)
  if (!context) throw new Error('use Profil must be used inside a ProfilProvider')
  return context
}

export {
  ProfilProvider,
  useProfil

}
