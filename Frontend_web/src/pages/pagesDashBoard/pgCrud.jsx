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
      <div>
        <label>
          Fecha de Inicio:
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </label>
        <label>
          Fecha de Término:
          <input
            type="date"
            value={fechaTermino}
            onChange={(e) => setFechaTermino(e.target.value)}
          />
        </label>
        <button onClick={handleFetchData}>Filtrar Citas</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>fecha</th>
            <th>hora</th>
            <th>rut user</th>
            <th>rut prest</th>
            <th>estado</th>
            <th>servicio</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id_consulta}</td>
              <td>{item.fecha}</td>
              <td>{item.hora_inicio}</td>
              <td>{item.rut_usuario}</td>
              <td>{item.rut_prestador}</td>
              <td>{item.estado}</td>
              <td>{item.servicio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PgCrud;
