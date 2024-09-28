import React from "react";
import { Link } from 'react-router-dom';

import LogoMuni from '../assets/logo-temuco-1024x791.webp';

function SideBar() {
  return (
    <div className="w-[250px] bg-[#2D3250] p-[20px] h-screen fixed top-0 left-0 overflow-y-auto flex flex-col items-center">
      <div className="text-center mb-[20px] flex flex-col items-center justify-center">
        <p className="m-0 text-[#F8F2E8]">Bienvenido! <span className="font-bold m-0 text-[#F97A7A]">Nombre User</span></p>
        <img src={LogoMuni} className="w-[100px] max-w-[150px] h-[100px] mt-[10px] border rounded-full object-cover border-naranja-claro" alt="Logotipo Municipalidad de Temuco" />
      </div>

      <ul className="list-none p-0 m-0 w-[100%]">
        <li className="mb-[15px]">
          <Link to="HomeAdmin" className="no-underline text-[#F8F2E8] block py-2 px-4 rounded-[4px] hover:bg-naranja-claro">
            Home Admin
          </Link>
        </li>
        <li className="mb-[15px]"> 
          <Link to="CrudAdmin" className="no-underline text-[#F8F2E8] block py-2 px-4 rounded-[4px] hover:bg-naranja-claro">
            Crud
          </Link>
        </li>
        <li className="mb-[15px]">
          <Link to="GraficosAdmin" className="no-underline text-[#F8F2E8] block py-2 px-4 rounded-[4px] hover:bg-naranja-claro">
            Graficos
          </Link>
        </li>
      </ul>
      <div className="flex items-center justify-center flex-col mt-auto p-[10px] border-t border-[#dddddd] rounded">
            <Link to="/" className='text-[#dddddd] hover:underline'>Ir al Inicio</Link>
            <p className='text-sm text-[#f97a7a] cursor-pointer hover:underline'>CerrarSesion</p>
        </div>

    </div>
  );
}

export default SideBar;
