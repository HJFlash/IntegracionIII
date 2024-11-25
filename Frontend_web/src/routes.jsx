import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Home from './Home';
import FuncionamientoUser from "./pages/pagesClient/FuncionamientoUser";
import Login from './pages/pagesClient/Login';
import PausePage from './components/PausePage';
import Register from './pages/pagesClient/Register';
import SolicitudUsuario from "./pages/pagesClient/SolicitudUsuario";


import PerfilUser from './pages/pagesClient/perfilUser';
import InfoProfileUser from './pages/pagesClient/InfoProfileUser';
import InfoSoliUser from './pages/pagesClient/infoSoliUser';

import DashboardAdmin from './pages/pagesDashBoard/dashboard';
import HomeAdmin from './pages/pagesDashBoard/pgPrincipal';
import CrudAdmin from './pages/pagesDashBoard/pgCrud';
import GraficosAdmin from './pages/pagesDashBoard/pgGraficos';
import RegistrarTrabajador from "./pages/pagesDashBoard/RegistrarTrabajador";
import SoliRegistroUsuario from "./pages/pagesDashBoard/SoliRegistroUsuario";
import CrudCitas from "./pages/pagesTrabajador/CrudCitas";
import PgReportes from "./pages/pagesDashBoard/pgReportes";
import PgGraficosMensuales from "./pages/pagesDashBoard/pgGraficosMensuales";

import TrabajadorMod from "./pages/pagesTrabajador/trabajador";
import PerfilTrabajador from "./pages/pagesTrabajador/PerfilTrabajador";



function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/pause" element={<PausePage />} /> {/* Nueva ruta */}
        <Route path="/Register" element={<Register />} />
        <Route path="/FuncionamientoUser" element={<FuncionamientoUser />} />

        <Route path="/SolicitudUsuario" element={<SolicitudUsuario />} />

        {/* Dashboard Admin   */}
        <Route path="/admin" element={<DashboardAdmin />}>
          <Route index element={<Navigate to="HomeAdmin" />} />
          <Route path="HomeAdmin" element={<HomeAdmin />} />
          <Route path="CrudAdmin" element={<CrudAdmin />} />
          <Route path="GraficosAdmin" element={<GraficosAdmin />} />
          <Route path="RegistrarTrabajador" element={<RegistrarTrabajador />} />
          <Route path="SoliRegistroUsuario" element={<SoliRegistroUsuario />} />
          <Route path="PgReportes" element={<PgReportes />} />
          <Route path="PgGraficosMensuales" element={<PgGraficosMensuales />} />
        </Route>

        {/* UserProfile */}
        <Route path="/profileUser" element={<PerfilUser />}>
          <Route index element={<Navigate to="InfoProfileUser" />} />
          <Route path="InfoProfileUser" element={<InfoProfileUser />} />
          <Route path="InfoSoliUser" element={<InfoSoliUser />} />
        </Route>

        {/* Trabajador Dashboard */}
        <Route path="/TrabajadorMod" element={<TrabajadorMod />}>
          <Route index element={<Navigate to="PerfilTrabajador" />} />
          <Route path="PerfilTrabajador" element={<PerfilTrabajador />} />
          <Route path="CrudCitas" element={<CrudCitas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;