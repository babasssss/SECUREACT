import axios from 'axios'

// Crée une instance d'axios avec une configuration de base
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Définit l'URL de base de l'API à partir de la variable d'environnement REACT_APP_API_URL
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }, // Définit les en-têtes de requête par défaut
  timeout: 10000 // Définit une limite de temps de 10 secondes pour les requêtes
})

// Intercepte les requêtes sortantes et ajoute l'en-tête d'autorisation si l'utilisateur est authentifié
api.interceptors.request.use(
  config => {
    const authState = window.localStorage.getItem('AUTH') // Récupère l'état d'authentification depuis le local storage
    const auth = JSON.parse(authState)
    if (auth.user && auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}` // Ajoute l'en-tête d'autorisation avec le token JWT
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Fonction de connexion d'un utilisateur
const login = async (credential) => {
  const response = await api.post('auth/login', credential) // Envoie une requête POST à l'API pour la connexion
  return response.data // Retourne les données de la réponse
}

// Fonction de mise à jour d'un utilisateur
const update = async (credential, id) => {
  const response = await api.patch(`users/${id}`, credential) // Envoie une requête PATCH à l'API pour mettre à jour l'utilisateur
  return response.data // Retourne les données de la réponse
}

// Fonction d'enregistrement d'un utilisateur
const register = async (credential) => {
  const response = await api.post('auth/register', credential) // Envoie une requête POST à l'API pour l'enregistrement de l'utilisateur
  return response.data // Retourne les données de la réponse
}

// Fonction pour obtenir une facture
const getInvoice = async (id) => {
  try {
    const response = await api.get(`/invoice/${id}?populate=*`) // Envoie une requête GET à l'API pour obtenir la facture avec un ID spécifique
    return response.data // Retourne les données de la réponse
  } catch (error) {
    console.error(error)
  }
}

// Fonction pour obtenir un client
const getCustomer = async (id) => {
  try {
    const response = await api.get(`/customers/${id}?populate=*`) // Envoie une requête GET à l'API pour obtenir le client avec un ID spécifique
    return response.data // Retourne les données de la réponse
  } catch (error) {
    console.error(error)
  }
}

// Fonction pour créer un client
const createCustomer = async (credentials, id) => {
  try {
    const _data = {
      // Construction des données du client à partir des credentials et de l'ID de l'utilisateur
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
    const response = await api.post('/customers', _data) // Envoie une requête POST à l'API pour créer un nouveau client
    return response.data // Retourne les données de la réponse
  } catch (error) {
    console.error(error)
  }
}

// Fonction pour mettre à jour un client
const updateCustomer = async (credentials, id) => {
  try {
    const _data = {
      // Construction des données mises à jour du client à partir des credentials
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

// Fonction pour supprimer un client
const deleteCustomer = async (idCustomer, idUser) => {
  try {
    const response = await api.delete(`/customers/${idUser}/${idCustomer}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

// Fonction pour obtenir un produit
const getProduct = async (id) => {
  try {
    const response = await api.delete(`/customers/${id}?populate=*`)
    return response
  } catch (error) {
    console.error(error)
  }
}

// Exportation des fonctions et constantes pour les rendre disponibles pour d'autres fichiers
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
