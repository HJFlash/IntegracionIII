import React from "react";

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
    <header className="flex justify-between items-center h-16 bg-turquesaClaro fixed top-0 left-0 w-full px-5 z-50  ">
      <div className="logo">
        <Link to="/">
          <img src={LogoMuni} alt="Logotipo Municipalidad de Temuco" className="w-24" />
        </Link>
      </div>
      <div className="flex-1 text-center">
        <h1 className="text-white">Temuco Esta Contigo</h1>
      </div>

      <div>
        {UserLogin ? (
          <div>
            <Link to="/Login" className="text-xl text-naranja-claro hover:text-blaco-letras hover:underline">Iniciar Sesion</Link>
          </div>
        ) : (
          <div className="bg-naranja-claro w-10 h-10 rounded-full cursor-pointer" onClick={toggleMenu}>
            {isMenuOpen && (
              <div className="absolute top-10 right-10 bg-white border border-gray-300 rounded-md shadow-lg p-2 ">
                <ul className="list-none m-0 p-0" >
                  <li className="m-1 py-2 px-4 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>Cerrar sesión</li>
                  <li className="m-1 py-2 px-4 hover:bg-gray-100 cursor-pointer"><Link to="/ProfileUser">Ver perfil</Link></li>
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
