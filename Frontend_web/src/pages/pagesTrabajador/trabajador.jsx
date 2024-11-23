import React from 'react';
import SidebarProfiles from '../../components/sidebar-profiles';
import { Outlet} from 'react-router-dom';


function TrabajadorMod() {
  const userContent = [
      { label: "Mi informacion", path: "/TrabajadorMod/PerfilTrabajador" },
      { label: "Citas Pendientes", path: "/TrabajadorMod/CrudCitas" }
  ];

  return (
    <div className='flex h-screen'>
        <SidebarProfiles content={userContent} />

        <div className='flex-1 p-[20px] pt-[80px] bg-gray-200 overflow-y-auto'>
            <Outlet />
        </div>
    </div>
  );
}

export default TrabajadorMod;
