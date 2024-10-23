import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Home from './Home';
import Tomasoli from './pages/pagesClient/tomaSolicitud';
import Login from './pages/pagesClient/Login';
import Register from './pages/pagesClient/Register';
import ModTrabajador from './pages/pagesTrabajador/trabajador';

import DashboardAdmin from './pages/pagesDashBoard/dashboard';
import HomeAdmin from './pages/pagesDashBoard/pgPrincipal';
import CrudAdmin from './pages/pagesDashBoard/pgCrud';
import GraficosAdmin from './pages/pagesDashBoard/pgGraficos';
import RegistrarTrabajador from "./pages/pagesDashBoard/RegistrarTrabajador";
import SoliRegistroUsuario from "./pages/pagesDashBoard/SoliRegistroUsuario";

import PerfilUser from './pages/pagesClient/perfilUser';
import InfoProfileUser from './pages/pagesClient/InfoProfileUser';
import InfoSoliUser from './pages/pagesClient/infoSoliUser';


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/TomaSoli" element={<Tomasoli />} />
        <Route path="/TrabajadorMod" element={<ModTrabajador />} />



        {/* Dashboard Admin */}
        <Route path="/admin" element={<DashboardAdmin />}>
          <Route index element={<Navigate to="HomeAdmin" />} />
          <Route path="HomeAdmin" element={<HomeAdmin />} />
          <Route path="CrudAdmin" element={<CrudAdmin />} />
          <Route path="GraficosAdmin" element={<GraficosAdmin />} />
          <Route path="RegistrarTrabajador" element={<RegistrarTrabajador />} />
          <Route path="SoliRegistroUsuario" element={<SoliRegistroUsuario />} />
        </Route>

        {/* UserProfile */}
        <Route path="/profileUser" element={<PerfilUser />}>
          <Route index element={<Navigate to="InfoProfileUser" />} />
          <Route path="InfoProfileUser" element={<InfoProfileUser />} />
          <Route path="InfoSoliUser" element={<InfoSoliUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;