import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Tomasoli from './pages/pagesClient/tomaSolicitud';
import Login from './pages/pagesClient/Login';
import Register from './pages/pagesClient/Register';
import ModAdmin from './pages/pagesDashBoard/admin';
import ModTrabajador from './pages/pagesDashBoard/trabajador';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/TomaSoli" element={<Tomasoli />} />
        <Route path="/AdminMod" element={<ModAdmin />} />
        <Route path="/TrabajadorMod" element={<ModTrabajador />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
