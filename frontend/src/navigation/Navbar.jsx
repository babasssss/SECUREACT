import { Link } from 'react-router-dom'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import HomeIcon from '@mui/icons-material/Home'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { useAuth } from '../contexts/AuthContext'

function handleClick (event) {
  event.preventDefault()
  console.info('You clicked a breadcrumb.')
}

function Navbar () {
  const { state: { isAuthenticated, user } } = useAuth()
  return (
    <div role='presentation' onClick={handleClick}>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link to='/'>
          <HomeIcon fontSize='inherit' />
          Accueil
        </Link>
        <Link to='/about'>
          <WhatshotIcon fontSize='inherit' />
          A propos
        </Link>

        {
          isAuthenticated
            ? (
              <Link to='/auth'>
                <AccountBoxIcon fontSize='inherit' />
                {`Hello,  ${user.firstName.charAt(0).toUpperCase()}${user.lastName.charAt(0).toUpperCase()}`}
              </Link>
              )
            : (
              <Link to='/auth'>
                <AccountBoxIcon fontSize='inherit' />
                Authentification
              </Link>
              )
        }

      </Breadcrumbs>

    </div>
  )
}

export default Navbar
