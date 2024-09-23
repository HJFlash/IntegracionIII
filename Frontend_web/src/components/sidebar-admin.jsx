import React from "react";
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';

import LogoMuni from '../assets/logo-temuco-1024x791.webp';

function SideBar() {
  return (
    <div className="sidebar">
      <div className="userBienvenida">
        <p>Bienvenido! <span>Nombre User</span></p>
        <img src={LogoMuni} className="IconAdmin" alt="Logotipo Municipalidad de Temuco" />
      </div>
      <ul>
        <li>
          <Link to="HomeAdmin" className="sidebar-link">
            Home Admin
          </Link>
        </li>
        <li>
          <Link to="CrudAdmin" className="sidebar-link">
            Crud
          </Link>
        </li>
        <li>
          <Link to="GraficosAdmin" className="sidebar-link">
            Graficos
          </Link>
        </li>
      </ul>
      <div className="BottonCerrarSesion">
        <p>CerrarSesion</p>
      </div>

    </div>
  );
}

export default SideBar;
