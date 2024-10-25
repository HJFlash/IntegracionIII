import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoMuni from '../assets/logo-temuco-1024x791.webp';

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [correoUsuario, setCorreoUsuario] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const nombre = localStorage.getItem('nombreUsuario');
    const correo = localStorage.getItem('correoUsuario');

    console.log('Token:', token);
    console.log('Nombre:', nombre);
    console.log('Correo:', correo);
    
    if (token) {
      setIsAuthenticated(true);
      setNombreUsuario(nombre);
      setCorreoUsuario(correo);
    } else {
      setIsAuthenticated(false);
    }
  }, []);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('correoUsuario');
    setIsAuthenticated(false);
  };

  return (
    <header className="flex justify-between items-center h-16 bg-white fixed top-0 left-0 w-full px-5 z-50">
      <div className="logo">
        <Link to="/">
          <img src={LogoMuni} alt="Logotipo Municipalidad de Temuco" className="w-24" />
        </Link>
      </div>
      <nav className="flex gap-5 items-center justify-between text-center ">
          <Link to="/" className='text-base font-semibold m-6 group relative w-max'>
            Informaciones
            <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-naranja-claro group-hover:w-3/6"></span>
            <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-naranja-claro group-hover:w-3/6"></span>
          </Link>

          <Link to="/" className='text-base font-semibold m-6 group relative w-max'>
            Inicio
            <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-naranja-claro group-hover:w-3/6"></span>
            <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-naranja-claro group-hover:w-3/6"></span>
          </Link>

          <Link to="/" className='text-base font-semibold m-6 group relative w-max'>
            Solicitar Servicio
            <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-naranja-claro group-hover:w-3/6"></span>
            <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-naranja-claro group-hover:w-3/6"></span>
          </Link>
      </nav>

      <div className="relative">
        {isAuthenticated ? (
          <div className="bg-naranja-claro w-10 h-10 rounded-full cursor-pointer" onClick={toggleMenu}>
            <span className='bg-naranja-claro w-10 h-10 rounded-full flex items-center justify-center text-white font-bold'>
              {nombreUsuario.charAt(0).toUpperCase()}
            </span>
            {isMenuOpen && (
            <div className="absolute top-12 right-0 bg-white border border-gray-300 rounded-md shadow-lg p-3 w-60 z-10">

              <div className="flex items-center space-x-3 mb-3 cursor-text">
                <div className="bg-naranja-claro w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                  {nombreUsuario.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold">{nombreUsuario}</p>
                  <p className="text-sm text-gray-500">{correoUsuario}</p>
                </div>
              </div>

              <hr className="border-gray-300 my-2" />

              <ul className="list-none m-0 p-0">
                <li className="m-1 py-1 px-4 hover:bg-gray-100 cursor-pointer min-w-[150px]">
                  <Link to="/ProfileUser" className='block w-full h-full'>Ver Pefil</Link>
                </li>
                <li className="m-1 py-1 px-4 hover:bg-gray-100 cursor-pointer min-w-[150px]">
                  <Link to="/ProfileUser/InfoSoliUser" className='block w-full h-full'>Solicitudes Activas</Link>
                </li>
                <li className='m-1 py-1 px-4 hover:bg-gray-100 cursor-pointer block w-full h-full' onClick={handleLogout}>
                  Cerrar sesión
                </li>
              </ul>
            </div>
          )}
        </div>
        ) : (
          <Link to="/Login" className="text-xl text-naranja-claro hover:text-blanco-letras hover:underline">
            Iniciar Sesión
          </Link>
        )}
    </div>
    </header>
  );
}

export default Header;