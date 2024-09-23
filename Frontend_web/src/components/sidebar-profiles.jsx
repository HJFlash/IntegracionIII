import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/sidebarProfiles.css';

import LogoMuni from '../assets/logo-temuco-1024x791.webp';

const SidebarProfiles = ({ content }) => {
  return (
    <div className='SidebarUserProfiles'>
        <div className='UserProfilesBienvenida'>
            <p>Bienvenido! <span>Nombre User</span></p>
            <img src={LogoMuni} className="IconUserProfile" alt="Logotipo Municipalidad de Temuco" />
        </div>

        <ul>
            {content.map((item, index) =>(
                
                <li key={index}>
                    <Link to={item.path} className='sidebarUserLink'>{item.label}</Link>
                </li>
                
            ))}
        </ul>

        <div className="btnUserProfiles">
            <Link to="/" className='btnToHome'>Ir al Inicio</Link>
            <p>CerrarSesion</p>
        </div>

    </div>
  )
}

export default SidebarProfiles