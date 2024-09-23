import React from "react";
import "../styles/header.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import LogoMuni from '../assets/logo-temuco-1024x791.webp';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [UserLogin, setUserLogin] = useState(false);

  const handleLogout = () => {
    setUserLogin(false);
  };



  return (
    <header className="header">
      <div className="logo">
        <img src={LogoMuni} alt="Logotipo Municipalidad de Temuco" />
      </div>
      <div className="titulo">
        <h1>Temuco Esta con Tigo</h1>
      </div>

      <div className="apartadoUsuario">
        {UserLogin ? (
          <div>
            <Link to="/Login" className="InitSesion">Iniciar Sesion</Link>
          </div>
        ) : (
          <div className="IconUser" onClick={toggleMenu}>
            {isMenuOpen && (
              <div className="dropdown-menu">
                <ul>
                  <li onClick={handleLogout}>Cerrar sesión</li>
                  <li><Link to="/ProfileUser">Ver perfil</Link></li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
