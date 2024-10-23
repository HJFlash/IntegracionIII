import React from 'react'

function infoSoliUser() {
  return (
    <div>

      <div className='max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg mb-5'>
        <div>
          <p className='font-bold flex item justify-center mb-4'>Servicios Restantes</p>
        </div>
        <div className='flex gap-5 items-center justify-center'>
          <div className='w-[110px] h-[135px] bg-orange-600 flex flex-col items-center rounded-lg shadow-lg'>
            <div className='rounded-full bg-white w-[65px] h-[65px] mt-3 flex items-center justify-center border '>
              <p className='text-xl font-semibold text-orange-600'>6</p>
            </div>
            <div className='flex items-center justify-center py-2'>
              <p className='text-white text-sm font-medium'>Podología</p>
            </div>
          </div>

          <div className='w-[110px] h-[135px] bg-blue-600 flex flex-col items-center rounded-lg shadow-lg'>
            <div className='rounded-full bg-white w-[65px] h-[65px] mt-3 flex items-center justify-center border'>
              <p className='text-xl font-semibold text-blue-600'>3</p>
            </div>
            <div className='flex items-center justify-center py-2'>
              <p className='text-white text-sm font-medium'>Asesoría Jurídica</p>
            </div>
          </div>


          <div className='w-[110px] h-[135px] bg-cyan-600 flex flex-col items-center rounded-lg shadow-lg'>
            <div className='rounded-full bg-white w-[65px] h-[65px] mt-3 flex items-center justify-center border '>
              <p className='text-xl font-semibold text-cyan-600'>2</p>
            </div>
            <div className='flex items-center justify-center py-2'>
              <p className='text-white text-sm font-medium'>Psicologia</p>
            </div>
          </div>

          <div className='w-[110px] h-[135px] bg-purple-600 flex flex-col items-center rounded-lg shadow-lg'>
            <div className='rounded-full bg-white w-[65px] h-[65px] mt-3 flex items-center justify-center border '>
              <p className='text-xl font-semibold text-purple-600'>1</p>
            </div>
            <div className='flex items-center justify-center py-2'>
              <p className='text-white text-sm font-medium'>Fonoaudiologia</p>
            </div>
          </div>

          <div className='w-[110px] h-[135px] bg-pink-600 flex flex-col items-center rounded-lg shadow-lg'>
            <div className='rounded-full bg-white w-[65px] h-[65px] mt-3 flex items-center justify-center border '>
              <p className='text-xl font-semibold text-pink-600'>7</p>
            </div>
            <div className='flex items-center justify-center py-2'>
              <p className='text-white text-sm font-medium'>Kinesiologia</p>
            </div>
          </div>

          <div className='w-[110px] h-[135px] bg-teal-600 flex flex-col items-center rounded-lg shadow-lg'>
            <div className='rounded-full bg-white w-[65px] h-[65px] mt-3 flex items-center justify-center border '>
              <p className='text-xl font-semibold text-teal-600'>2</p>
            </div>
            <div className='flex items-center justify-center py-2'>
              <p className='text-white text-sm font-medium'>Peluqueria</p>
            </div>
          </div>
        </div>


      </div>

      <div className='max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg'>
        <div>
          <p className='font-bold flex item justify-center mb-4'>Tu Historial de Solicitudes</p>
        </div>
        <table className='min-w-full table-auto'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='px-6 py-3 text-left text-gray-700 font-semibold'>Tipo solicitud</th>
              <th className='px-6 py-3 text-left text-gray-700 font-semibold'>Trabajador</th>
              <th className='px-6 py-3 text-left text-gray-700 font-semibold'>Dia</th>
              <th className='px-6 py-3 text-left text-gray-700 font-semibold'>Hora</th>
              <th className='px-6 py-3 text-left text-gray-700 font-semibold'>Asistencia</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b'>
              <td className='px-6 py-4 text-gray-950'>Podologia</td>
              <td className='px-6 py-4 text-gray-950'>Sara Gutierrez</td>
              <td className='px-6 py-4 text-gray-950'>10/10/2024</td>
              <td className='px-6 py-4 text-gray-950'>09:00 - 09:30</td>
              <td className='px-6 py-4 text-green-600 font-semibold '>Si</td>
            </tr>
            <tr className='border-b'>
              <td className='px-6 py-4 text-gray-900'>Peluquería</td>
              <td className='px-6 py-4 text-gray-900'>Juan Pérez</td>
              <td className='px-6 py-4 text-gray-900'>11/10/2024</td>
              <td className='px-6 py-4 text-gray-900'>10:00 - 10:30</td>
              <td className='px-6 py-4 text-red-600 font-semibold'>No</td>
            </tr>
          </tbody>
        </table>
      </div>




    </div>
  )
}

export default infoSoliUser