import React from 'react';
import SideBar from '../../components/sidebar-admin';
import { Outlet} from 'react-router-dom';

function AdminMod() {

  return (
    <div className="flex h-screen ml-[250px] bg-gray-200">
      <SideBar />
      
      <div className="flex-1 bg-gray-200 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminMod;
