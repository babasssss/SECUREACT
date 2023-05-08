import '../styles/SubmitButton.scss'

function SubmitButton (params) {
  return (
    <input className='submit-btn' type='submit' {...params} value={params.value} />
  )
}

export default SubmitButton
