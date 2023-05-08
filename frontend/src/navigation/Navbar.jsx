import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import DescriptionIcon from '@mui/icons-material/Description'

function Navbar () {
  const { logout, state: { isAuthenticated, user } } = useAuth()
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = (event) => {
    event.preventDefault()
    console.info('You clicked a breadcrumb.')
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  // return (
  //   <div role='presentation' onClick={handleClick}>
  //     <Breadcrumbs aria-label='breadcrumb'>
  //       <Link to='/'>
  //         <HomeIcon fontSize='inherit' />
  //         Accueil
  //       </Link>
  //       <Link to='/about'>
  //         <WhatshotIcon fontSize='inherit' />
  //         A propos
  //       </Link>

  //       {
  //         isAuthenticated
  //           ? (
  //             <Link to='/profil'>
  //               <AccountBoxIcon fontSize='inherit' />
  //               {`Profil :  ${user.firstName.charAt(0).toUpperCase()}${user.lastName.charAt(0).toUpperCase()}`}
  //             </Link>
  //             )
  //           : (
  //             <Link to='/auth'>
  //               <AccountBoxIcon fontSize='inherit' />
  //               Authentification
  //             </Link>
  //             )
  //       }

  //     </Breadcrumbs>

  //   </div>
  // )
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          {/* LOGO */}
          <DescriptionIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            SECUREACT
          </Typography>

          {/* MENU */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* A PROPOS */}
            <Button
              key='a-propos'
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <Link to='/about'>
                A propos
              </Link>
            </Button>
            {/* Facture */}
            <Button
              key='facture'
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <Link to='/invoice'>
                Facture
              </Link>
            </Button>
          </Box>

          {/* AVATAR */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {
                  isAuthenticated
                    ? (
                      <Avatar alt={`${user.firstName.toUpperCase()}`} src='/static/images/avatar/2.jpg' />
                      )
                    : (
                      <Avatar alt='' src='/static/images/avatar/2.jpg' />
                      )
                }

              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {
                  isAuthenticated
                    ? (
                      <>
                        <MenuItem key='profil' onClick={handleCloseUserMenu}>
                          <Typography textAlign='center'><Link to='/profil'>Mon profil</Link></Typography>
                        </MenuItem>
                        <MenuItem key='dasboard' onClick={handleCloseUserMenu}>
                          <Typography textAlign='center'><Link to='/'>Tableau de bord</Link></Typography>
                        </MenuItem>
                        <MenuItem key='logout' onClick={handleCloseUserMenu}>
                          <Typography textAlign='center'><a onClick={logout}>Se déconnecter</a></Typography>
                        </MenuItem>
                      </>
                      )
                    : (
                      <MenuItem key='auth' onClick={handleCloseUserMenu}>
                        <Typography textAlign='center'><Link to='/auth'>Authentification</Link></Typography>
                      </MenuItem>
                      )
                }

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
