import '../styles/SubmitButton.scss'

function SubmitButtonPoppup (params) {
  return (
    // Composant de bouton de soumission
    <input
      className='submit-btn-popup' // Classe CSS pour le style du bouton
      type='submit' // Type de bouton : soumission
      {...params} // Propriétés supplémentaires passées au bouton (par exemple : onClick, disabled, etc.)
      value={params.value} // Valeur du bouton (texte affiché à l'intérieur)
    />
  )
}

export default SubmitButtonPoppup
