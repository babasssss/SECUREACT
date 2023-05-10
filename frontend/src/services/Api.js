import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  timeout: 10000
})

api.interceptors.request.use(
  config => {
    const authState = window.localStorage.getItem('AUTH')
    const auth = JSON.parse(authState)
    if (auth.user && auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

const login = async (credential) => {
  const response = await api.post('auth/login', credential)
  return response.data
}

const update = async (credential, id) => {
  const response = await api.patch(`users/${id}`, credential)
  return response.data
}

const register = async (credential) => {
  const response = await api.post('auth/register', credential)
  return response.data
}

export {
  login,
  register,
  update
}
