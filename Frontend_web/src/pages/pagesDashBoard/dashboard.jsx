import React from 'react';
import SideBar from '../../components/sidebar-admin';
import { Outlet} from 'react-router-dom';
import '../../styles/dashboarAdmin.css';

function AdminMod() {

  return (
    <div className="dashboard-admin">
      <SideBar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminMod;
