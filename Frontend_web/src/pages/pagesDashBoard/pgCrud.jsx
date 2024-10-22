import React, { useEffect, useState } from 'react';

const PgCrud = () => {
  const [data, setData] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const fetchData = async (inicio, fin) => {
    try {
      const response = await fetch(`/consultas/?fecha_inicio=${inicio}&fecha_fin=${fin}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  useEffect(() => {
    // Cargar todas las citas al inicio
    fetchData('', '');
  }, []);

  const handleSearch = () => {
    fetchData(fechaInicio, fechaFin);
  };

  return (
    <div>
      <div>
        <label>
          Fecha Inicio:
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </label>
        <label>
          Fecha Fin:
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </label>
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>RUT Usuario</th>
            <th>RUT Prestador</th>
            <th>Estado</th>
            <th>Servicio</th>
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
}

export default PgCrud;
