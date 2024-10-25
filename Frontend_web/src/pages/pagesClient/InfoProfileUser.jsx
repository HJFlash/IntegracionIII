import React from 'react';

function InfoProfileUser() {
  return (
    <div>
      <div className='max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg grid grid-cols-10 gap-6'>
        <div className='grid grid-cols-2  gap-4 col-span-9'>
          <div className='items-center'>
            <div>
              <p className='text-gray-600 text-sm mb-2'>Nombre Completo</p>
              <p className='text-gray-900 font-semibold'>Maria Jaime suarez perez</p>
            </div>
          </div>
          <div className='flex items-center'>
            <div>
              <p className='text-gray-600 text-sm mb-2'>Fecha de Nacimiento</p>
              <p className='text-gray-900 font-semibold'>10/10/1999</p>
            </div>
          </div>
          <div className='flex items-center'>
            <div>
              <p className='text-gray-600 text-sm mb-2'>Rut</p>
              <p className='text-gray-900 font-semibold'>8.444.222-2</p>
            </div>
          </div>
          <div className='flex items-center'>
            <div>
              <p className='text-gray-600 text-sm mb-2'>Direccion</p>
              <p className='text-gray-900 font-semibold'>En algun lugar muy lejano</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end col-span-1">
          <button className="flex space-x-2 text-blue-500 hover:text-blue-700 hover:underline">
            <span>Edit</span>
          </button>
        </div>
      </div>
      

      <div className='max-w-4xl mx-auto my-5 rounded-lg overflow-hidden flex space-x-4'>
      <div className='w-1/2'>
        <div className='bg-blue-300 p-4'>
          <p className='text-gray-800 font-semibold flex justify-center'>Sede perteneciente / Cesfam</p>
        </div>
        <div className='bg-gray-100 p-4 flex justify-evenly'>
          <p className='text-gray-900'>CESFAM FUNDO EL CARMEN</p>
        </div>
      </div>
      
      <div className='w-1/2'>
        <div className='bg-blue-300 p-4'>
          <p className='text-gray-800 font-semibold flex justify-center'>Algun dato extra</p>
        </div>
        <div className='bg-gray-100 p-4 flex justify-evenly'>
          <p className='text-gray-900'>dato extra</p>
        </div>
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
                <p className='text-gray-700 font-semibold'>hola@outlook.cl</p>
              </div>
            </div>
            <div className='flex items-center'>
              <div className='p-2'>
                <p className='text-gray-600 text-sm mb-2'>Telefono</p>
                <p className='text-gray-700 font-semibold'>+569-20121524</p>
              </div>
            </div>
            <div className='flex items-center'>
              <div className='p-2'>
                <p className='text-gray-600 text-sm mb-2'>Tel. Emergencia</p>
                <p className='text-gray-700 font-semibold'>+569-12345678</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>





      <div>
      </div>
    </div>
  )
}

export default InfoProfileUser