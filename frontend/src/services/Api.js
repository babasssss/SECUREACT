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
  console.log(credential)
  const response = await api.post('auth/login', credential)
  console.log(response.data)
  return response.data
}

const register = async (credential) => {
  console.log(credential)
  const response = await api.post('users', credential)
  console.log(response.data)
  return response.data
}

export {
  login,
  register
}
