import '../styles/TextInput.scss'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

function TextInput (props) {
  return (
    <>
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' }
        }}
        noValidate
        autoComplete='off'
      >
        {/* Utilisation du composant TextField de Material-UI pour afficher le champ de texte */}
        {/* Les propriétés passées au composant TextField proviennent des props du composant TextInput */}
        <TextField id='outlined-basic' label={props.label} variant='outlined' {...props} className='input-container' />
      </Box>
    </>
  )
}

export default TextInput
