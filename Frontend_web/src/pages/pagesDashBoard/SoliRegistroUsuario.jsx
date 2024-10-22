import React, { useEffect, useState } from 'react';

const SoliRegistroUsuario = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/obtener-datos-registro_soli/');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchData();
    }, []);

  return (
    <div>
        <div className='max-w-max mx-auto p-6 bg-white shadow-lg rounded-lg'>
            <table className='min-w-full table-auto'>
                <thead>
                    <tr className='bg-gray-200'>
                        <th className='px-6 py-3 text-left text-gray-700 font-semibold'>1°Nombre</th>
                        <th className='px-6 py-3 text-left text-gray-700 font-semibold'>2°Nombre</th>
                        <th className='px-6 py-3 text-left text-gray-700 font-semibold'>1°Apellido</th>
                        <th className='px-6 py-3 text-left text-gray-700 font-semibold'>2°Apellido</th>
                         <th className='px-6 py-3 text-left text-gray-700 font-semibold'>RUT</th>
                         <th className='px-6 py-3 text-left text-gray-700 font-semibold'>contacto</th>
                         <th className='px-6 py-3 text-left text-gray-700 font-semibold'>calle</th>
                         <th className='px-6 py-3 text-left text-gray-700 font-semibold'>num_apar </th>
                         <th className='px-6 py-3 text-left text-gray-700 font-semibold'>num_casa </th>
                         <th className='px-6 py-3 text-left text-gray-700 font-semibold'>tipo usuario</th>

                    </tr>
                </thead>
                <tbody>
                    {data.length > 0? (
                    data.map((item, index) => (
                        <tr className='border-b' key={index}>
                            <td className='px-2 py-1 text-gray-950'>{item.primer_nombre}</td>
                            <td className='px-2 py-1 text-gray-950'>{item.segundo_nombre}</td>
                            <td className='px-2 py-1 text-gray-950'>{item.primer_apellido}</td>
                            <td className='px-2 py-1 text-gray-950'>{item.segundo_apellido}</td>
                            <td className='px-2 py-1 text-gray-950'>{item.rut}</td>
                            <td className='px-2 py-1 text-gray-950'>{item.contacto}</td>
                            <td className='px-2 py-1 text-gray-950'>{item.calle}</td>
                            <td className='px-2 py-1 text-gray-950'>{item.num_apar}</td>
                            <td className='px-2 py-1 text-gray-950'>{item.num_casa}</td>
                            <td className='px-2 py-1 text-gray-950'>
                                <select>
                                    <option value="aceptado">Aceptado</option>
                                    <option value="rechazado">Rechazado</option>
                                    <option value="pendiente">Pendiente</option>
                                </select>
                            </td>
                        </tr>
                    ))
                    ) : (
                        <tr>
                            <td>No hay datos disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default SoliRegistroUsuario