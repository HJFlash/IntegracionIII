import React, { useEffect, useState } from 'react';

const PgCrud = () => {


  const [data, setData] = useState([]);

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
  return (
    <div>
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
            <tr>
              <td>{item.id_consulta}</td>
              <td>{item.fecha}</td>
              <td>{item.hora}</td>
              <td>{item.rut_usuario}</td>
              <td>{item.rut_prestador}</td>
              <td>{item.estado}</td>
              <td>{item.servicio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PgCrud