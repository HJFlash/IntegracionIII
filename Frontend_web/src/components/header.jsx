import React from "react";
import "../styles/header.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import LogoMuni from '../assets/logo-temuco-1024x791.webp';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [UserLogin, setUserLogin] = useState(true); // esto se cambia segun el estado de la autentificacion

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    fetch('http://localhost:8000/logout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('token')}` //Cuando empezemos con los Tokens hay que descomentar esto
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        alert(data.message); // Mensaje de éxito
        // Elimina el token del almacenamiento si corresponde
        localStorage.removeItem('token'); // Si usas tokens
        setUserLogin(false); // Actualiza el estado de usuario
      } else {
        alert('Error al cerrar sesión.'); // Manejo de errores
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error al cerrar sesión.');
    });
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
            <div className="IconUser" onClick={toggleMenu}></div>

            {isMenuOpen && (
              <div className="dropdown-menu">
                <ul>
                  <li onClick={handleLogout}>Cerrar sesión</li>
                  <li>Ver perfil</li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link to="/Login" className="InitSesion">Iniciar Sesion</Link>
        )}
      </div>
    </header>
  );
}

export default Header;
