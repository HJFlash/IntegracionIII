import React, { useState } from "react";
import Header from "../../components/header";
import { Link, useNavigate } from 'react-router-dom';

function TomaSoli() {
  const [solicitud, setSolicitud] = useState("");
  const [hora, setHora] = useState("");
  const [fecha, setFecha] = useState("");  // Cambiar de `dia` a `fecha`
  const [paso, setPaso] = useState(1);
  const navigate = useNavigate();

  const OpcionesDeSolicitud = ["doctor", "peluqueria", "kinesiologia", "fonoaudiologia", "Atencion social"];
  const OpcionesDeHora = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

  const SeleccionarTipoSolicitud = (tipo) => setSolicitud(tipo);
  const SeleccionarHora = (horaSeleccionada) => setHora(horaSeleccionada);

  const handleConfirmar = () => {
    const rutUsuario = localStorage.getItem('rutUsuario');
    const dataToSend = {
      rut_usuario: rutUsuario,
      servicio: solicitud,  // Enviar el tipo de servicio en lugar del rut del prestador
      fecha: fecha,  // Formato YYYY-MM-DD
      hora_inicio: `${hora}:00`  // Asegurar el formato de hora con segundos "HH:MM:SS"
    };

    console.log("Datos enviados:", JSON.stringify(dataToSend, null, 2));

    fetch('http://localhost:8000/CrearConsulta/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify(dataToSend)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Cita agendada correctamente.');
          navigate('/InfoSoliUser');
        } else {
          alert(`Error: ${data.error || 'No se pudo agendar la cita.'}`);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error al agendar la cita.');
      });
  };

  return (
    <div className="soliMain">
      <Header />
      <div className="h-screen flex justify-center items-center bg-[#D4E6F1]">
        {paso < 4 && (
          <div className="flex flex-col items-center justify-center bg-gray-50 p-8 rounded-lg shadow-lg w-[90%] md:w-[50%]">
            {paso === 1 && (
              <div className="w-full bg-white p-8 rounded-lg shadow-md">
                <p className="font-bold text-xl text-gray-700 mt-4 mb-6 text-center">
                  Elija el tipo de solicitud
                </p>
                <div className="solicitud-options grid grid-cols-2 md:grid-cols-3 gap-4">
                  {OpcionesDeSolicitud.map((opcion) => (
                    <button
                      key={opcion}
                      className={`text-black text-lg p-4 rounded-lg bg-[#F8F8F8] border border-gray-300 cursor-pointer ${solicitud === opcion ? "bg-naranja-claro text-white border-naranja-claro" : ""}`}
                      onClick={() => SeleccionarTipoSolicitud(opcion)}
                    >
                      {opcion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {paso === 2 && (
              <div className="w-full bg-white p-8 rounded-lg shadow-md">
                <p className="font-bold text-xl text-gray-700 mt-4 mb-6 text-center">
                  Elija la fecha
                </p>
                <input
                  type="date"
                  className="text-lg p-4 rounded-lg bg-[#F8F8F8] border border-gray-300 cursor-pointer w-full"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
              </div>
            )}

            {paso === 3 && (
              <div className="w-full bg-white p-8 rounded-lg shadow-md">
                <p className="font-bold text-xl text-gray-700 mt-4 mb-6 text-center">
                  Elija la hora
                </p>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                  {OpcionesDeHora.map((opcion) => (
                    <button
                      key={opcion}
                      className={`text-lg p-4 rounded-lg border border-gray-300 cursor-pointer ${hora === opcion ? "bg-naranja-claro text-white border-naranja-claro" : ""} ${["12:00", "17:00"].includes(opcion) ? "bg-[#F97A7A] text-[#F8F2E8] cursor-auto" : ""}`}
                      onClick={() => !["12:00", "17:00"].includes(opcion) && SeleccionarHora(opcion)}
                      disabled={["12:00", "17:00"].includes(opcion)}
                    >
                      {opcion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-center items-center mt-6 space-x-4">
              {paso > 1 && (
                <button className="bg-naranja-claro text-white rounded px-6 py-3" onClick={() => setPaso(paso - 1)}>
                  Atrás
                </button>
              )}
              {paso < 3 && (
                <button className="bg-naranja-claro text-white rounded px-6 py-3" onClick={() => setPaso(paso + 1)}>
                  Siguiente
                </button>
              )}
              {paso === 3 && (
                <button className="bg-naranja-claro text-white rounded px-6 py-3" onClick={() => setPaso(4)}>
                  Finalizar
                </button>
              )}
              <Link to="/" className="bg-[#E74C3C] text-white rounded px-6 py-3">
                Cancelar
              </Link>
            </div>
          </div>
        )}

        {paso === 4 && (
          <div className="resumen-solicitud bg-[#EBF5FB] p-8 flex flex-col justify-center items-center rounded-lg shadow-md">
            <h2 className="font-bold text-2xl mb-4">Resumen de tu solicitud</h2>
            <p className="text-lg">Tipo de Solicitud: {solicitud}</p>
            <p className="text-lg">Fecha seleccionada: {fecha}</p>
            <p className="text-lg">Hora seleccionada: {hora}</p>
            <div className="flex justify-center items-center mt-6 space-x-4">
              <button className="bg-[#E74C3C] text-white rounded px-6 py-3" onClick={() => setPaso(3)}>
                Atrás
              </button>
              <button className="bg-[#E74C3C] text-white rounded px-6 py-3" onClick={handleConfirmar}>
                Confirmar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TomaSoli;