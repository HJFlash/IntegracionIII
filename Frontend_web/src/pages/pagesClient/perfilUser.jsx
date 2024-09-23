import React from 'react'
import SidebarProfiles from '../../components/sidebar-profiles';
import { Outlet} from 'react-router-dom';
import '../../styles/UserProfile.css';

function PerfilUser() {
    const userContent = [
        { label: "Profile", path: "/ProfileUser/InfoProfileUser" },
        { label: "Settings", path: "/ProfileUser/InfoSoliUser" }
    ];


  return (
    <div className='ContainerUserProfile'>
        <SidebarProfiles content={userContent} />

        <div className='ContainerContenUserProfile'>
            <Outlet />
        </div>
    </div>
  )
}

export default PerfilUser