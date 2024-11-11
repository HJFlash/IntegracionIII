import React, { useState } from "react";
import { NavLink } from 'react-router-dom';

import LogoMuni from '../assets/logo-temuco-1024x791.webp';

function SideBar() {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };


  return (
  <div className="w-[250px] bg-[#2D3250] p-[20px] h-screen fixed top-0 left-0 overflow-y-auto flex flex-col items-center">
    <div className="text-center mb-[20px] flex flex-col items-center justify-center">
      <p className="m-0 text-[#F8F2E8]">Bienvenido! <span className="font-bold m-0 text-[#F97A7A]">Nombre User</span></p>
      <img src={LogoMuni} className="w-[100px] max-w-[150px] h-[100px] mt-[10px] border rounded-full object-cover border-naranja-claro" alt="Logotipo Municipalidad de Temuco" />
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
                Crud Admin
              </NavLink>
            </li>
            <li className="mb-[15px]">
              <NavLink to="SoliRegistroUsuario"
                className="block py-2 px-4 text-[#CBD5E1] rounded-[4px] hover:bg-[#4c5483]">
                Solicitudes de Usuario
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
              <NavLink to="GraficosAdmin"
                className="block py-2 px-4 text-[#CBD5E1] rounded-[4px] hover:bg-[#4c5483]">
                Reportes Graficos Anuales
              </NavLink>
            </li>
            <li className="mb-[15px]">
              <NavLink
                to="/marketing-statistics"
                className="block py-2 px-4 text-[#CBD5E1] rounded-[4px] hover:bg-[#4c5483]">
                Reportes Graficos Mensuales
              </NavLink>
            </li>
            <li className="mb-[15px]">
              <NavLink
                to="/marketing-statistics"
                className="block py-2 px-4 text-[#CBD5E1] rounded-[4px] hover:bg-[#4c5483]">
                Reportes
              </NavLink>
            </li>
          </ul>
        )}
      </li>
    </ul>
    <div className="flex items-center justify-center flex-col mt-auto p-[10px] border-t border-[#dddddd] rounded">
      <NavLink to="/" className='text-[#dddddd] hover:underline'>Ir al Inicio</NavLink>
      <p className='text-sm text-[#f97a7a] cursor-pointer hover:underline'>Cerrar Sesion</p>
    </div>
  </div>
);
}

export default SideBar;
