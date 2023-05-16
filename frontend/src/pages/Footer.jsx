import React from 'react'
import '../styles/FooterStyle.scss'

function Footer () {
  return (
    <>
      <footer className='footer'> {/* Balise footer avec la classe 'footer' */}
        <div className='waves'> {/* Div avec la classe 'waves' */}
          <div className='wave' id='wave1' /> {/* Div avec la classe 'wave' et l'ID 'wave1' */}
          <div className='wave' id='wave2' />
          <div className='wave' id='wave3' />
          <div className='wave' id='wave4' />
        </div>

        <ul className='menu'> {/* Liste avec la classe 'menu' */}
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
            <a className='menu__link' href='/customer'>Client</a>
          </li>
          <li className='menu__item'>
            <a className='menu__link' href='#'>Contact</a>
          </li>
        </ul>
        <p>©2023 SOREAU BASTIEN | MyDigitalSchool</p> {/* Paragraphe avec le texte '©2023 SOREAU BASTIEN | MyDigitalSchool' */}
      </footer>
      <script type='module' src='https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js' /> {/* Script externe */}
      <script nomodule src='https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js' /> {/* Script externe */}
    </>
  )
}

export default Footer
