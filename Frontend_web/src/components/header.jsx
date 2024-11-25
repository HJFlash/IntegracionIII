import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoMuni from '../assets/logo-temuco-1024x791.webp';
import axios from "axios";


function Header() {
  const [user, setUser] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/api/perfil/", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
    })
        .then((res) => setUser(res.data))
        .catch((err) => console.error(err));
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    navigate('/');
  };

  return (
    <header className="flex justify-between items-center h-16 bg-white fixed top-0 left-0 w-full px-5 z-50">
      <div className="logo">
        <Link to="/">
          <img src={LogoMuni} alt="Logotipo Municipalidad de Temuco" className="w-24" />
        </Link>
      </div>
      <nav className="flex gap-5 items-center justify-between text-center">
        <Link to="/FuncionamientoUser" className='text-base font-semibold m-6 group relative w-max'>
          Informaciones
          <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-naranja-claro group-hover:w-3/6"></span>
          <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-naranja-claro group-hover:w-3/6"></span>
        </Link>

        <Link to="/" className='text-base font-semibold m-6 group relative w-max'>
          Inicio
          <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-naranja-claro group-hover:w-3/6"></span>
          <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-naranja-claro group-hover:w-3/6"></span>
        </Link>

        <Link to="/SolicitudUsuario" className='text-base font-semibold m-6 group relative w-max'>
          Solicitar Servicio
          <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-naranja-claro group-hover:w-3/6"></span>
          <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-naranja-claro group-hover:w-3/6"></span>
        </Link>
      </nav>

      <div className="relative">
        {user ? (
          <div className="bg-naranja-claro w-10 h-10 rounded-full cursor-pointer" onClick={toggleMenu}>
            <span className='bg-naranja-claro w-10 h-10 rounded-full flex items-center justify-center text-white font-bold'>
              {user.primer_nombre.charAt(0).toUpperCase()}
            </span>
            {isMenuOpen && (
              <div className="absolute top-12 right-0 bg-white border border-gray-300 rounded-md shadow-lg p-3 w-60 z-10">
                <div className="flex items-center space-x-3 mb-3 cursor-text">
                  <div className="bg-naranja-claro w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                    {user.primer_nombre.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold">{user.primer_nombre}</p>
                    <p className="text-sm text-gray-500">{user.correo_electronico}</p>
                  </div>
                </div>

                <hr className="border-gray-300 my-2" />

                <ul className="list-none m-0 p-0">
                  <li className="m-1 py-1 px-4 hover:bg-gray-100 cursor-pointer min-w-[150px]">
                    <Link to="/ProfileUser" className='block w-full h-full'>Ver Perfil</Link>
                  </li>
                  <li className="m-1 py-1 px-4 hover:bg-gray-100 cursor-pointer min-w-[150px]">
                    <Link to="/ProfileUser/InfoSoliUser" className='block w-full h-full'>Solicitudes Activas</Link>
                  </li>

                  {user.tipo_usuario === 'admin' && (
                    <li className="m-1 py-1 px-4 hover:bg-gray-100 cursor-pointer min-w-[150px]">
                      <Link to="/Admin" className='block w-full h-full'>Panel Admin</Link>
                    </li>
                  )}

                  {user.tipo_usuario === 'prestador' && (
                    <li className="m-1 py-1 px-4 hover:bg-gray-100 cursor-pointer min-w-[150px]">
                      <Link to="/TrabajadorMod" className='block w-full h-full'>Panel Trabajador</Link>
                    </li>
                  )}
                  
                  <li className='m-1 py-1 px-4 hover:bg-gray-100 cursor-pointer block w-full h-full' onClick={logout}>
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
