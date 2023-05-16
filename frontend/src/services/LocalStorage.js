const saveToLocalStorage = (key, value) => {
  try {
    // Stocke la valeur dans le local storage après l'avoir convertie en JSON
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    // Affiche une erreur dans la console en cas d'échec
    console.error(error)
  }
}

export default saveToLocalStorage
