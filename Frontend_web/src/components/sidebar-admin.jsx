import React, { useState,useEffect } from "react";
import { NavLink, useNavigate } from 'react-router-dom';

import LogoMuni from '../assets/logo-temuco-1024x791.webp';

function SideBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [apellidoUsuario, setapellidoUsuario] = useState('');
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const nombre = localStorage.getItem('nombreUsuario');
    const apellido = localStorage.getItem('apellidoUsuario');
    
    if (token) {
      setIsAuthenticated(true);
      setNombreUsuario(nombre);
      setapellidoUsuario(apellido);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('apellidoUsuario');
    setIsAuthenticated(false);
    navigate('/');
    };


  return (
  <div>
    {isAuthenticated ? (

    <div className="w-[250px] bg-[#2D3250] p-[20px] h-screen fixed top-0 left-0 overflow-y-auto flex flex-col items-center">
      <div className='text-center mb-5 flex flex-col justify-center items-center'>
          <p className='m-0 text-[#F8F2E8] flex flex-col'>Bienvenido! <span className='font-bold m-0 text-[#f97a7a]' >{nombreUsuario} {apellidoUsuario}</span></p>
          <img src={LogoMuni} className="w-[100px] h-[100px] mt-[10px] rounded-full object-cover border border-naranja-claro" alt="Logotipo Municipalidad de Temuco" />
      </div>

      <ul className="list-none p-0 m-0 w-[100%]">
        <li className="mb-[10px]">
          <button
            className="w-full text-left no-underline block py-2 rounded-[4px] text-[#E2E8F0] justify-between items-center hover:bg-[#2D3250]"
            onClick={() => toggleMenu('opciones')}>
            Opciones
            <span className="float-right">{activeMenu === 'opciones' ? "▲" : "▼"}</span>
          </button>
          {activeMenu === 'opciones' && (
            <ul className="list-none p-0 m-0 pl-[10px] mt-[5px]">
              <li className="mb-[15px]">
                <NavLink to="HomeAdmin"
                  className="block py-2 px-4 text-[#CBD5E1] rounded-[4px] hover:bg-[#4c5483]">
                  Inicio
                </NavLink>
              </li>
              <li className="mb-[15px]">
                <NavLink to="CrudAdmin"
                  className="block py-2 px-4 text-[#CBD5E1] rounded-[4px] hover:bg-[#4c5483]">
                  Crud Solicitudes de Servicios
                </NavLink>
              </li>
              <li className="mb-[15px]">
                <NavLink to="SoliRegistroUsuario"
                  className="block py-2 px-4 text-[#CBD5E1] rounded-[4px] hover:bg-[#4c5483]">
                  Solicitudes de Registro de Usuario
                </NavLink>
              </li>
              <li className="mb-[15px]">
                <NavLink to="RegistrarTrabajador"
                  className="block py-2 px-4 text-[#CBD5E1] rounded-[4px] hover:bg-[#4c5483]">
                  Registrar Trabajador
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        <li className="mb-[10px]">
          <button
            className="w-full text-left no-underline block py-2 rounded-[4px] text-[#E2E8F0] justify-between items-center hover:bg-[#2D3250]"
            onClick={() => toggleMenu('reportes')}>
            Reportes
            <span className="float-right">{activeMenu === 'reportes' ? "▲" : "▼"}</span>
          </button>
          {activeMenu === 'reportes' && (
            <ul className="list-none p-0 m-0 pl-[10px] mt-[5px]">
              <li className="mb-[15px]">
                <NavLink to="PgGraficosMensuales"
                  className="block py-2 px-4 text-[#CBD5E1] rounded-[4px] hover:bg-[#4c5483]">
                  Reportes Graficos Mensuales
                </NavLink>
              </li>
              <li className="mb-[15px]">
                <NavLink
                  to="GraficosAdmin"
                  className="block py-2 px-4 text-[#CBD5E1] rounded-[4px] hover:bg-[#4c5483]">
                  Reportes Graficos Anuales
                </NavLink>
              </li>
              <li className="mb-[15px]">
                <NavLink
                  to="PgReportes"
                  className="block py-2 px-4 text-[#CBD5E1] rounded-[4px] hover:bg-[#4c5483]">
                  Reportes de Asistencia
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>
      <div className="flex items-center justify-center flex-col mt-auto p-[10px] border-t border-[#dddddd] rounded">
        <NavLink to="/" className='text-[#dddddd] hover:underline'>Ir al Inicio</NavLink>
        <p className='text-sm text-[#f97a7a] cursor-pointer hover:underline' onClick={handleLogout}>Cerrar Sesion</p>
      </div>
    </div>
    ): (
      <div>
      </div>
    )}
  </div>
);
}

export default SideBar;
