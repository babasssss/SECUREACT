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
/**
 * Utilisateur
 */
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

/**
 * Facture
 */
const getInvoice = async (id) => {
  try {
    const response = await api.get(`/invoice/${id}?populate=*`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

/**
 * Client
 */
const getCustomer = async (id) => {
  try {
    const response = await api.get(`/customers/${id}?populate=*`)
    // console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const createCustomer = async (credentials, id) => {
  try {
    const _data = {
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      email: credentials.email,
      phone: credentials.phone,
      customerType: credentials.customerType,
      address: {
        street: credentials.street,
        postalCode: credentials.postalCode,
        city: credentials.city,
        country: credentials.country
      },
      user: id
    }
    const response = await api.post('/customers', _data)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const updateCustomer = async (credentials, id) => {
  try {
    const _data = {
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      email: credentials.email,
      phone: credentials.phone,
      customerType: credentials.customerType,
      address: {
        street: credentials.street,
        postalCode: credentials.postalCode,
        city: credentials.city,
        country: credentials.country
      }
    }
    const response = await api.patch(`/customers/${id}`, _data)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const deleteCustomer = async (idCustomer, idUser) => {
  try {
    // console.log(idCustomer)
    // console.log(idUser)
    const response = await api.delete(`/customers/${idUser}/${idCustomer}`)
    // console.log('COOOOOOOOOOOOOLLLLLLLLLLLLLLLLLLLLLLL')
    return response.data
  } catch (error) {
    console.error(error)
  }
}

/**
 * Produit
 */
const getProduct = async (id) => {
  try {
    const response = await api.delete(`/customers/${id}?populate=*`)
    // console.log(response.data)
    return response
  } catch (error) {
    console.error(error)
  }
}

export {
  login,
  register,
  update,
  getInvoice,
  getCustomer,
  createCustomer,
  deleteCustomer,
  updateCustomer,
  getProduct
}
