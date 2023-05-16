import '../styles/SubmitButton.scss'

function SubmitButton (params) {
  return (
    <input
      className='submit-btn' // Classe CSS pour le style du bouton
      type='submit' // Type de bouton : soumission
      {...params} // Propriétés supplémentaires passées au bouton (par exemple : onClick, disabled, etc.)
      value={params.value} // Valeur du bouton (texte affiché à l'intérieur)
    />
  )
}

export default SubmitButton
