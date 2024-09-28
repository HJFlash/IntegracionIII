import React from 'react';
import SideBar from '../../components/sidebar-admin';
import { Outlet} from 'react-router-dom';

function AdminMod() {

  return (
    <div className="flex h-screen ml-[250px]">
      <SideBar />
      <div className="flex-1 p-[20px] bg-white overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminMod;
