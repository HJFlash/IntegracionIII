import React, { useState } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, addDays, isSameMonth, isBefore, isSameDay } from "date-fns";
import es from "date-fns/locale/es";
import { useNavigate } from 'react-router-dom';

const Calendario = () => {
  const [fechaActual, setFechaActual] = useState(new Date());
  const [seleccionarFecha, setSeleccionarFecha] = useState(null);
  const [solicitud, setSolicitud] = useState("");
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();


  const startDate = startOfWeek(startOfMonth(fechaActual), { weekStartsOn: 1 });
  const endDate = addDays(endOfMonth(fechaActual), (7 - endOfMonth(fechaActual).getDay()) % 7);

  const isFormComplete = solicitud && seleccionarFecha && horaSeleccionada;

  const OpcionesDeSolicitud = [
    "Podologia",
    "Psicologia",
    "Peluqueria",
    "Kinesiologia",
    "Fonoaudiologia",
    "AsesoriaJuridica",
  ];

  const horasPorSolicitud = {
    Podologia: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:30", "14:00"],
    Psicologia: ["09:00", "10:00", "11:00", "12:00", "13:00"],
    Peluqueria: ["09:00","09:20", "09:30","10:00","10:20","10:40","11:00","11:20","11:40","12:00","12:20"],
    Kinesiologia: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:30", "14:00"],
    Fonoaudiologia: ["09:00","09:20", "09:30","10:00","10:20","10:40","11:00","11:20","11:40","12:00","12:20"],
    AsesoriaJuridica: ["09:00", "10:00", "11:00", "12:00", "13:00"]
  };

  const diasHabilitadosPorSolicitud = {
    Podologia: [1, 2, 3, 4, 5],
    Psicologia: [2, 3, 4, 5],  
    Peluqueria: [1, 2, 3, 4, 5, 6],
    Kinesiologia: [1, 2, 3, 4, 5],
    Fonoaudiologia: [1, 2, 3, 4, 5, 6],
    AsesoriaJuridica: [1, 3, 5],
  };

  const days = [];
  let date = startDate;

  while (date <= endDate) {
    days.push(date);
    date = addDays(date, 1);
  }

  const cambiarMes = (sentido) => {
    const newDate = new Date(fechaActual);
    newDate.setMonth(newDate.getMonth() + sentido);

    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 2);

    const minDate = new Date();
    minDate.setDate(1);

    if (newDate >= minDate && newDate <= maxDate) {
      setFechaActual(newDate);
    }
  };

  const handleDayClick = (day) => {
    setSeleccionarFecha(day);
    if (solicitud) {
      // Actualizar las horas disponibles según la solicitud
      setHorasDisponibles(horasPorSolicitud[solicitud]);
      setHoraSeleccionada(null);
    }
  };

  const handleHourClick = (hora) => {
    setHoraSeleccionada(hora); // Actualizar la hora seleccionada
  };

  const SeleccionarTipoSolicitud = (tipo) => {
    setSolicitud(tipo);
    setHorasDisponibles([]);
    setSeleccionarFecha(null);
    setHoraSeleccionada(null);
  };

  // Filtrar los días habilitados según el tipo de solicitud seleccionado
  const diasHabilitados = solicitud ? diasHabilitadosPorSolicitud[solicitud] : [];


  const handleConfirmar = () => {
    const rutUsuario = localStorage.getItem('rutUsuario');
    const dataToSend = {
      rut_usuario: rutUsuario,
      servicio: solicitud,  // Enviar el tipo de servicio en lugar del rut del prestador
      fecha: seleccionarFecha,  // Formato YYYY-MM-DD
      hora_inicio: `${horaSeleccionada}:00`  // Asegurar el formato de hora con segundos "HH:MM:SS"
    };

    console.log("Datos enviados:", JSON.stringify(dataToSend, null, 2));
    console.log("Solicitud:", solicitud);
    console.log("Fecha:", seleccionarFecha ? format(seleccionarFecha, "yyyy-MM-dd") : "No seleccionada");
    console.log("Hora:", horaSeleccionada);

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
    <div className="h-screen flex flex-col items-center justify-center rounded-lg shadow-lg">
      {/* Tipo de solicitud */}
      <div className="max-w-[1000px] bg-white px-5 py-2 mb-4 rounded-lg shadow-md">
        <p className="font-semibold text-gray-700 mt-2 mb-6 text-center">
          Elija el servicio requerido
        </p>
        <div className="flex items-center justify-center gap-2">
          {OpcionesDeSolicitud.map((opcion) => (
            <button
              key={opcion}
              className={`max-w-[200px] text-black p-2 rounded-lg bg-[#F8F8F8] border border-gray-300 cursor-pointer ${
                solicitud === opcion 
                ? "bg-naranja-claro text-white border-naranja-claro" 
                : ""}`}
              onClick={() => SeleccionarTipoSolicitud(opcion)}
            >
              {opcion}
            </button>
          ))}
        </div>
      </div>


      <div className="w-[1000px] bg-white px-5 py-2 mb-4 rounded-lg shadow-md">
        <p className="font-bold text-xl text-gray-700 text-center">
          Seleccione el Dia habilitado
        </p>
        <div className="flex justify-between items-center mb-4">
          <button
            className={`text-blue-600 font-bold px-4 py-2 ${
              fechaActual.getMonth() === new Date().getMonth() && fechaActual.getFullYear() === new Date().getFullYear()
                ? "opacity-50 cursor-not-allowed"
                : "bg-gray-200"
            }`}
            onClick={() => cambiarMes(-1)}
            disabled={fechaActual.getMonth() === new Date().getMonth() && fechaActual.getFullYear() === new Date().getFullYear()}
          >
            {"<"} Anterior
          </button>
          <h2 className="text-xl font-semibold text-gray-800">
            {format(fechaActual, "MMMM yyyy", { locale: es })}
          </h2>
          <button
            className={`text-blue-600 font-bold px-4 py-2 ${
              fechaActual >= new Date(new Date().setMonth(new Date().getMonth() + 2)) ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => cambiarMes(1)}
            disabled={fechaActual >= new Date(new Date().setMonth(new Date().getMonth() + 2))}
          >
            Siguiente {">"}
          </button>
        </div>

        {/* Dias de la Semana */}
        <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-600">
          {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map(
            (day, index) => (
              <div key={index} className="py-2">
                {day}
              </div>
            )
          )}
        </div>

        {/* Dias */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {days.map((day, index) => {
            const dayOfWeek = day.getDay() === 0 ? 7 : day.getDay();
            const isDayEnabled = diasHabilitados.includes(dayOfWeek); // Verificar si el día está habilitado

            return (
              <div
                key={index}
                className={`py-2 px-1 rounded-lg ${
                  !isSameMonth(day, fechaActual) ? "text-gray-400" : ""
                } 
                ${isBefore(day, new Date()) ? "cursor-not-allowed text-gray-300" : ""}
                ${!isDayEnabled ? "text-gray-300 cursor-not-allowed" : "cursor-pointer"} 
                ${isSameDay(day, seleccionarFecha) ? "bg-naranja-claro text-white font-bold" : ""}`}
                onClick={() => isDayEnabled && !isBefore(day, new Date()) && handleDayClick(day)}
              >
                {format(day, "d")}
              </div>
            );
          })}

        </div>
        <div className="flex items-center justify-center mt-6 mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Seleccionar hora
          </button>
        </div>
      </div>

      {/* Mostrar las horas disponibles */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="max-w-[550px] bg-white py-4 px-4 rounded-lg shadow-md">
            {horasDisponibles.length > 0 && (
              <div className="mt-4">
                <p className="text-center font-semibold text-gray-700 ">Horas disponibles:</p>
                <div className="grid grid-cols-2 md:grid-cols-7 gap-4 ">
                  {horasDisponibles.map((hora) => (
                    <button
                      key={hora}
                      className={`max-w-[100px] p-3 rounded-lg text-gray-700  ${
                        horaSeleccionada === hora
                          ? "bg-naranja-claro text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => handleHourClick(hora)}
                    >
                      {hora}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center justify-center gap-2 mt-5">
              <button 
                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                onClick={() => {setIsModalOpen(false); setHoraSeleccionada(null);}}
              >
                Cancelar
              </button>

              <button 
                className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                onClick={() => setIsModalOpen(false)}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mostrar la solicitud seleccionada, la fecha seleccionada y la hora seleccionada */}

      <div className="w-[500px] p-4 bg-white rounded-lg shadow-lg flex flex-col justify-center items-center">
      <div className="mt-4 text-center text-lg font-semibold text-gray-700">
        Solicitud seleccionada:{" "}
        <span className="text-blue-600">
          {solicitud ? solicitud : "Sin solicitud"}
        </span>
      </div>
      {seleccionarFecha ? (
        <div className="mt-2 text-center text-lg font-semibold text-gray-700">
          Día seleccionado:{" "}
          <span className="text-blue-600">
            {format(seleccionarFecha, "dd MMM yyyy", { locale: es })}
          </span>
        </div>
      ) : (
        <div className="mt-2 text-center text-lg font-semibold text-gray-700">
          Día seleccionado: <span className="text-blue-600">Sin fecha seleccionada</span>
        </div>
      )}

      <div className="mt-4 text-center text-lg font-semibold text-gray-700">
        Hora seleccionada:{" "}
        <span className="text-blue-600">
          {horaSeleccionada ? horaSeleccionada : "Sin hora seleccionada"}
        </span>
      </div>

      <div className="mt-3">
        <button
          className={`px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none ${
            isFormComplete
              ? "bg-green-700 hover:bg-green-800 focus:ring-green-300"
              : "bg-red-700 hover:bg-red-800 focus:ring-red-300 cursor-not-allowed"
          }`}
          onClick={handleConfirmar}
        >
          Confirmar
        </button>
      </div>
    </div>

    </div>
  );
};

export default Calendario;
