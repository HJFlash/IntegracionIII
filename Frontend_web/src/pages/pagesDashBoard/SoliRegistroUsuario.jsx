import React, { useEffect, useState } from 'react';

const SoliRegistroUsuario = () => {
    const [data, setData] = useState([]);
    const [filterEstado, setFilterEstado] = useState('Pendiente');

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


    const handleChangeEstado = async (rut, nuevoEstado) => {
        try {
            const response = await fetch(`/actualizar-estado-usuario/${rut}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado_solicitud: nuevoEstado }),
            });
            if (!response.ok) {
                console.error('Error al actualizar el estado:', response.statusText);
                return;
            }

            setData((prevData) =>
                prevData.map((item) =>
                    item.rut === rut ? { ...item, estado_solicitud: nuevoEstado } : item
                )
            );
        } catch (error) {
            alert('Error al actualizar el estado:', error);
        }
    };

    const filteredData = data.filter((item) => item.estado_solicitud === filterEstado);



  return (
    <div>
        <div className='max-w-max mx-auto p-6 bg-white shadow-lg rounded-lg'>
            <div className="mb-4">
                <label htmlFor="filterEstado" className="mr-2 text-gray-700 font-semibold">Filtrar por estado:</label>
                <select
                    id="filterEstado"
                    value={filterEstado}
                    onChange={(e) => setFilterEstado(e.target.value)}
                    className={`border rounded-md px-2 py-1 ${
                        filterEstado === 'Pendiente' ? 'bg-orange-200 text-yellow-800' :
                        filterEstado === 'Aceptado' ? 'bg-green-200 text-green-800' :
                        'bg-red-200 text-red-800'
                        }`}
                >
                    <option value="Pendiente" className='bg-gray-200 text-gray-800'>Pendiente</option>
                    <option value="Aceptado" className='bg-gray-200 text-gray-800'>Aceptado</option>
                    <option value="Rechazado" className='bg-gray-200 text-gray-800'>Rechazado</option>
                </select>
            </div>
            <table className='min-w-full table-auto text-sm'>
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
                         <th className='px-6 py-3 text-left text-gray-700 font-semibold'>Estado</th>

                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0? (
                        filteredData.map((item, index) => (
                        <tr className='border-b' key={index}>
                            <td className='px-2 py-1 text-gray-950'>{item.primer_nombre}</td>
                            <td className='px-2 py-1 text-gray-950 bg-gray-200'>{item.segundo_nombre}</td>
                            <td className='px-2 py-1 text-gray-950'>{item.primer_apellido}</td>
                            <td className='px-2 py-1 text-gray-950 bg-gray-200'>{item.segundo_apellido}</td>
                            <td className='px-2 py-1 text-gray-950'>{item.rut}</td>
                            <td className='px-2 py-1 text-gray-950 bg-gray-200'>{item.contacto}</td>
                            <td className='px-2 py-1 text-gray-950'>{item.calle}</td>
                            <td className='px-2 py-1 text-gray-950 bg-gray-200'>{item.num_apar}</td>
                            <td className='px-2 py-1 text-gray-950'>{item.num_casa}</td>
                            <td className='px-2 py-1 text-gray-950 bg-gray-200'>{item.tipo_usuario}</td>
                            <td className="px-2 py-1 text-gray-950">
                                <select
                                    value={item.estado_solicitud}
                                    onChange={(e) => handleChangeEstado(item.rut, e.target.value)}
                                    className={`border rounded-md px-2 py-1 ${
                                    item.estado_solicitud === 'Pendiente' ? 'bg-orange-200 text-yellow-800' :
                                    item.estado_solicitud === 'Aceptado' ? 'bg-green-200 text-green-800' :
                                    'bg-red-200 text-red-800'
                                    }`}
                                >
                                    <option value="Pendiente" className='bg-orange-200 text-orange-800'>Pendiente</option>
                                    <option value="Aceptado" className='bg-green-200 text-green-800'>Aceptado</option>
                                    <option value="Rechazado" className='bg-red-200 text-red-800'>Rechazado</option>
                                </select>
                            </td>
                        </tr>
                    ))
                    ) : (
                        <tr>
                            <td className='text-center py-4 text-gray-700'>No hay datos disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default SoliRegistroUsuario