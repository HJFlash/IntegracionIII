import { useState, useEffect} from 'react';
import axios from "axios";


function InfoProfileUser() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/api/perfil/", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
    })
        .then((res) => setUser(res.data))
        .catch((err) => console.error(err));
}, []);
  

  return (
    <diva>
      {user ? (
      <div>
          <div className='max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg grid grid-cols-10 gap-6'>
          <div className='grid grid-cols-2  gap-4 col-span-9'>
            <div className='items-center'>
              <div>
                <p className='text-gray-600 text-sm mb-2'>Nombre Completo</p>
                <p className='text-gray-900 font-semibold'>{user.primer_nombre} {user.segundo_nombre} {user.primer_apellido} {user.segundo_apellido}</p>
              </div>
            </div>
            <div className='flex items-center'>
              <div>
                <p className='text-gray-600 text-sm mb-2'>Rut</p>
                <p className='text-gray-900 font-semibold'>{user.rut}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end col-span-1">
            <button className="flex space-x-2 text-blue-500 hover:text-blue-700 hover:underline">
              <span>Edit</span>
            </button>
          </div>
        </div>
        
        <div>
          <div className='max-w-4xl mx-auto my-5 rounded-lg overflow-hidden'>
            <div className='bg-blue-300 p-4 grid grid-cols-3 items-center'>
              <p className='text-gray-800 font-semibold text-center col-start-2'>Contactos</p>
              <button className="justify-self-end text-white hover:text-white-700 hover:underline">
                <span>Edit</span>
              </button>
            </div>

            <div className='flex items-center justify-between px-10 bg-gray-100'>
              <div className='flex items-center'>
                <div className='p-2'>
                  <p className='text-gray-600 text-sm mb-2'>Correo Electronico</p>
                  <p className='text-gray-700 font-semibold'>{user.correo_electronico}</p>
                </div>
              </div>
              <div className='flex items-center'>
                <div className='p-2'>
                  <p className='text-gray-600 text-sm mb-2'>Telefono</p>
                  <p className='text-gray-700 font-semibold'>{user.contacto}</p>
                </div>
              </div>
              <div className='flex items-center'>
                <div className='p-2'>
                  <p className='text-gray-600 text-sm mb-2'>Tel. Emergencia</p>
                  <p className='text-gray-700 font-semibold'>{user.contacto}</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      ) : (
        <div>
        </div>
      ) }





    </diva>
  )
}

export default InfoProfileUser