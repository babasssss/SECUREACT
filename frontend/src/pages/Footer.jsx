import React from 'react'
import '../styles/FooterStyle.scss'

function Footer () {
  return (
    <>
      <footer className='footer'>
        <div className='waves'>
          <div className='wave' id='wave1' />
          <div className='wave' id='wave2' />
          <div className='wave' id='wave3' />
          <div className='wave' id='wave4' />
        </div>
        <ul className='social-icon'>
          <li className='social-icon__item'>
            <a className='social-icon__link' href='#'>
              <ion-icon name='logo-facebook' />
            </a>
          </li>
          <li className='social-icon__item'>
            <a className='social-icon__link' href='#'>
              <ion-icon className='logo-twitter' />
            </a>
          </li>
          <li className='social-icon__item'>
            <a className='social-icon__link' href='#'>
              <ion-icon className='logo-linkedin' />
            </a>
          </li>
          <li className='social-icon__item'>
            <a className='social-icon__link' href='#'>
              <ion-icon name='logo-instagram' />
            </a>
          </li>
        </ul>
        <ul className='menu'>
          <li className='menu__item'>
            <a className='menu__link' href='/'>Accueil</a>
          </li>
          <li className='menu__item'>
            <a className='menu__link' href='/about'>A propos</a>
          </li>
          <li className='menu__item'>
            <a className='menu__link' href='/invoice'>Facture</a>
          </li>
          <li className='menu__item'>
            <a className='menu__link' href='#'>Team</a>
          </li>
          <li className='menu__item'>
            <a className='menu__link' href='#'>Contact</a>
          </li>

        </ul>
        <p>&copy;2023 SOREAU BASTIEN | MyDigitalSchool</p>
      </footer>
      <script type='module' src='https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js' />
      <script nomodule src='https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js' />
    </>
  )
}

export default Footer
