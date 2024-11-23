import React, { useEffect, useState } from 'react';

const PgCrud = () => {
  const [data, setData] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaTermino, setFechaTermino] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/consultas/');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleFetchData = async () => {
    // Validar que la fecha de inicio sea anterior a la fecha de término
    if (new Date(fechaInicio) > new Date(fechaTermino)) {
      setError('La fecha de inicio debe ser anterior a la fecha de término.');
      return;
    }

    setError(''); // Limpiar error si las fechas son válidas

    try {
      const response = await fetch(`/consultas/?fecha_inicio=${fechaInicio}&fecha_termino=${fechaTermino}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error al obtener los datos filtrados:', error);
    }
  };

  return (
    <div>
      <div className='max-w-max mx-auto p-6 bg-white shadow-lg rounded-lg mt-7'>
      
        <div className='flex justify-between items-center mb-3'>
          <label className='flex items-center'>
            <p>Fecha de Inicio:</p>
            <input
              className='p-0 pl-1'
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </label>
          <label className='flex items-center'>
            <p>Fecha de Término:</p>
            <input
              className='p-0 pl-1'
              type="date"
              value={fechaTermino}
              onChange={(e) => setFechaTermino(e.target.value)}
            />
          </label>
          <button className="px-2 py-1 bg-naranja-claro text-white rounded-md shadow-md mb-3"
            onClick={handleFetchData}>Filtrar Citas</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        
        <div>
          <table className='min-w-full table-auto text-sm'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='px-6 py-3 text-left text-gray-700 font-semibold'>id</th>
                <th className='px-6 py-3 text-left text-gray-700 font-semibold'>fecha</th>
                <th className='px-6 py-3 text-left text-gray-700 font-semibold'>hora</th>
                <th className='px-6 py-3 text-left text-gray-700 font-semibold'>rut user</th>
                <th className='px-6 py-3 text-left text-gray-700 font-semibold'>rut prest</th>
                <th className='px-6 py-3 text-left text-gray-700 font-semibold'>estado</th>
                <th className='px-6 py-3 text-left text-gray-700 font-semibold'>servicio</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className='px-2 py-1 text-gray-950'>{item.id_consulta}</td>
                  <td className='px-2 py-1 text-gray-950 bg-gray-200'>{item.fecha}</td>
                  <td className='px-2 py-1 text-gray-950'>{item.hora_inicio}</td>
                  <td className='px-2 py-1 text-gray-950 bg-gray-200'>{item.rut_usuario}</td>
                  <td className='px-2 py-1 text-gray-950'>{item.rut_prestador}</td>
                  <td className='px-2 py-1 text-gray-950 bg-gray-200'>{item.estado}</td>
                  <td className='px-2 py-1 text-gray-950'>{item.servicio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
};

export default PgCrud;