import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoMuni from '../assets/logo-temuco-1024x791.webp';

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const nombre = localStorage.getItem('nombreUsuario');
    if (token) {
      setIsAuthenticated(true);
      setNombreUsuario(nombre);
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
            <span class="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-naranja-claro group-hover:w-3/6"></span>
            <span class="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-naranja-claro group-hover:w-3/6"></span>
          </Link>

          <Link to="/" className='text-base font-semibold m-6 group relative w-max'>
            Inicio
            <span class="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-naranja-claro group-hover:w-3/6"></span>
            <span class="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-naranja-claro group-hover:w-3/6"></span>
          </Link>

          <Link to="/" className='text-base font-semibold m-6 group relative w-max'>
            Solicitar Servicio
            <span class="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-naranja-claro group-hover:w-3/6"></span>
            <span class="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-naranja-claro group-hover:w-3/6"></span>
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
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-naranja-claro w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                  {nombreUsuario.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold">{nombreUsuario}</p>
                  <p className="text-sm text-gray-500"><Link to="/ProfileUser">Ver perfil</Link></p>
                </div>
              </div>
              <hr className="border-gray-300 my-2" />

              <ul className="list-none m-0 p-0">
                <li className="m-1 py-1 px-4 hover:bg-gray-100 cursor-pointer min-w-[150px]">
                  <Link to="/ProfileUser/InfoSoliUser">Solicitudes Activas</Link>
                </li>
                <li className="m-1 py-1 px-4 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
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