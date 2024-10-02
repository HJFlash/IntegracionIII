import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Home';
import Tomasoli from './pages/pagesClient/tomaSolicitud';
import Login from './pages/pagesClient/Login';
import Register from './pages/pagesClient/Register';
import ModTrabajador from './pages/pagesTrabajador/trabajador';

import DashboardAdmin from './pages/pagesDashBoard/dashboard';
import HomeAdmin from './pages/pagesDashBoard/pgPrincipal';
import CrudAdmin from './pages/pagesDashBoard/pgCrud';
import GraficosAdmin from './pages/pagesDashBoard/pgGraficos';

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
          <Route index element={<HomeAdmin />} />
          <Route path="HomeAdmin" element={<HomeAdmin />} />
          <Route path="CrudAdmin" element={<CrudAdmin />} />
          <Route path="GraficosAdmin" element={<GraficosAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;