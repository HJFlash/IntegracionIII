import { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";


import LogoMuni from '../assets/logo-temuco-1024x791.webp';


const SidebarProfiles = ({ content }) => {
    const [user, setUser] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/perfil/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        })
            .then((res) => setUser(res.data))
            .catch((err) => console.error(err));
    }, []);



    const handleLogout = () => {
        localStorage.removeItem("access_token");
        navigate('/');
    };

  return (
    <div>
        {user ? (
        <div className='flex flex-col items-center w-[250px] bg-[#ebf5fb] p-5 h-screen overflow-y-auto '>
            <div className='text-center mb-5 flex flex-col justify-center items-center'>
                <p className='m-0 text-black flex flex-col'>Bienvenido! <span className='font-bold m-0 text-[#f97a7a]' >{user.primer_nombre} {user.primer_apellido}</span></p>
                <img src={LogoMuni} className="w-[100px] h-[100px] mt-[10px] rounded-full object-cover border border-naranja-claro" alt="Logotipo Municipalidad de Temuco" />
            </div>

            <ul>
                {content.map((item, index) =>(
                    
                    <li key={index}>
                        <Link to={item.path} className='no-underline block py-2 px-4 my-4 border rounded-[4px] hover:bg-[#f97a7a] hover:text-[#f8f2e8]'>{item.label}</Link>
                    </li>
                    
                ))}
            </ul>

            <div className="flex items-center justify-center flex-col mt-auto p-[10px] border-t border-[#dddddd] rounded">
                <Link to="/" className='hover:underline'>Ir al Inicio</Link>
                <p className='text-sm text-[#f97a7a] cursor-pointer hover:underline' onClick={handleLogout}>CerrarSesion</p>
            </div>
        </div>
        
        ): (
            <div>
            </div>
        )}

    </div>
  )
}

export default SidebarProfiles