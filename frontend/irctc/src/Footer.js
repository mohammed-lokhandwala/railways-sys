import React from 'react';
import './Footer.css'; // Import CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import facebook from './images/facebook.png'
import ins from './images/instagram.png'
import whastsapp from './images/whatsapp.png'
function Footer() {
  return (
    <footer className="footer">
      <div className="container">

      <p>© 2024 IRCTC. All rights reserved.</p>

        <div className='images'>
        <img src={facebook}></img>
        <img src={ins}/>
        <img src={whastsapp}/>
        </div>
     
       
      </div>
    </footer>
  );
}

export default Footer;
