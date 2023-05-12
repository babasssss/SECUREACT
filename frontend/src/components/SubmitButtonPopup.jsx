import '../styles/SubmitButton.scss'

function SubmitButtonPoppup (params) {
  return (
    <input className='submit-btn-popup' type='submit' {...params} value={params.value} />
  )
}

export default SubmitButtonPoppup
