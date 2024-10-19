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
        <table border="1">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>RUT-------------------------</th>
                    <th>contacto</th>
                    <th>calle</th>
                    <th>num_apar </th>
                    <th>num_casa </th>
                    <th>Estatus Solicitud</th>

                </tr>
            </thead>
            <tbody>
                {data.length > 0? (
                  data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.nombres}</td>
                        <td>{item.apellidos}</td>
                        <td>{item.rut}</td>
                        <td>{item.contacto}</td>
                        <td>{item.calle}</td>
                        <td>{item.num_apar}</td>
                        <td>{item.num_casa}</td>
                        <td>
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
  )
}

export default SoliRegistroUsuario