import { useState, useEffect} from 'react';

function InfoProfileUser() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [nombreUsuariosegundo, setnombreUsuariosegundo] = useState('');
  const [apellidoUsuario, setapellidoUsuario] = useState('');
  const [apellidoUsuariosegundo, setapellidoUsuariosegundo] = useState('');
  const [correoUsuario, setCorreoUsuario] = useState('');
  const [telefonoUsuario, settelefonoUsuario] = useState('');
  const [rutUsuario, setRut] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const nombre = localStorage.getItem('nombreUsuario');
    const correo = localStorage.getItem('correoUsuario');

    const segnombre = localStorage.getItem('nombreUsuariosegundo');
    const apellido = localStorage.getItem('apellidoUsuario');
    const segapellido = localStorage.getItem('apellidoUsuariosegundo');
    const tel = localStorage.getItem('telefonoUsuario');
    const rut = localStorage.getItem('rutUsuario');
    
    if (token) {
      setIsAuthenticated(true);
      setNombreUsuario(nombre);
      setCorreoUsuario(correo);

      setnombreUsuariosegundo(segnombre);
      setapellidoUsuario(apellido);
      setapellidoUsuariosegundo(segapellido);
      settelefonoUsuario(tel);
      setRut(rut);
    } else {
      setIsAuthenticated(false);
    }
  }, []);


  return (
    <diva>
      {isAuthenticated ? (
      <div>
          <div className='max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg grid grid-cols-10 gap-6'>
          <div className='grid grid-cols-2  gap-4 col-span-9'>
            <div className='items-center'>
              <div>
                <p className='text-gray-600 text-sm mb-2'>Nombre Completo</p>
                <p className='text-gray-900 font-semibold'>{nombreUsuario} {nombreUsuariosegundo} {apellidoUsuario} {apellidoUsuariosegundo}</p>
              </div>
            </div>
            <div className='flex items-center'>
              <div>
                <p className='text-gray-600 text-sm mb-2'>Fecha de Nacimiento</p>
                <p className='text-gray-900 font-semibold'>10/10/1950</p>
              </div>
            </div>
            <div className='flex items-center'>
              <div>
                <p className='text-gray-600 text-sm mb-2'>Rut</p>
                <p className='text-gray-900 font-semibold'>{rutUsuario}</p>
              </div>
            </div>
            <div className='flex items-center'>
              <div>
                <p className='text-gray-600 text-sm mb-2'>Direccion</p>
                <p className='text-gray-900 font-semibold'>Bach 0110</p>
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
                  <p className='text-gray-700 font-semibold'>{correoUsuario}</p>
                </div>
              </div>
              <div className='flex items-center'>
                <div className='p-2'>
                  <p className='text-gray-600 text-sm mb-2'>Telefono</p>
                  <p className='text-gray-700 font-semibold'>{telefonoUsuario}</p>
                </div>
              </div>
              <div className='flex items-center'>
                <div className='p-2'>
                  <p className='text-gray-600 text-sm mb-2'>Tel. Emergencia</p>
                  <p className='text-gray-700 font-semibold'>{telefonoUsuario}</p>
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