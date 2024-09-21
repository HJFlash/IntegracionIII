import React, { useState } from "react";
import Header from "../../components/header";
import "../../styles/tomaSoli.css";

function TomaSoli() {
  const [solicitud, setSolicitud] = useState("");
  const [hora, setHora] = useState("");
  const [dia, setDia] = useState("");

  //Controla el paso en el que se encuentra
  const [paso, setPaso] = useState(1);

  // Opciones Solicitud
  const OpcionesDeSolicitud = [
    "doctor",
    "peluqueria",
    "kinesiologia",
    "fonoaudiologia",
    "Atencion social",
  ];
  const OpcionesDeHora = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
  ];
  const OpcionesDeDia = [
    "lunes",
    "martes",
    "miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];

  const SeleccionarTipoSolicitud = (tipo) => {
    setSolicitud(tipo);
  };

  const SeleccionarHora = (horaSeleccionada) => {
    setHora(horaSeleccionada);
  };

  const SeleccionarDia = (diaSeleccionado) => {
    setDia(diaSeleccionado);
  };

  const RetrocederPaso = () => {
    setPaso(paso > 1 ? paso - 1 : 1);
  };

  const SiguentePaso = () => {
    if (paso < 3) {
      setPaso(paso + 1);
    }
  };

  const Finalizar = () => {
    setPaso(4);
  };

  return (
    <div className="soliMain">
      <Header />
      <div className="formulario">
        {paso < 4 && (
          <div>
            {paso === 1 && (
              <div className="contenedorOpciones">
                <p>Elija el tipo de solicitud</p>
                <div className="solicitud-options">
                  {OpcionesDeSolicitud.map((opcion) => (
                    <button
                      key={opcion}
                      className={`opcion-button ${
                        solicitud === opcion ? "OpcionSelecionada" : ""
                      }`}
                      onClick={() => SeleccionarTipoSolicitud(opcion)}
                    >
                      {opcion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {paso === 2 && (
              <div className="contenedorOpciones">
                <p>Elija el día</p>
                <div className="dia-options">
                  {OpcionesDeDia.map((opcion) => (
                    <button
                      key={opcion}
                      className={`opcion-button ${
                        dia === opcion ? "OpcionSelecionada" : ""
                      }`}
                      onClick={() => SeleccionarDia(opcion)}
                    >
                      {opcion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {paso === 3 && (
              <div className="contenedorOpciones">
                <p>Elija la hora</p>
                <div className="hora-options">
                  {OpcionesDeHora.map((opcion) => (
                    <button
                      key={opcion}
                      className={`opcion-button ${hora === opcion ? "OpcionSelecionada" : ""} 
                                                ${["12:00","17:00",].includes(opcion)? "horaNoDisponible": ""}`}
                      onClick={() =>
                        ![].includes(opcion) && SeleccionarHora(opcion)
                      }
                      disabled={["12:00", "17:00"].includes(opcion)}
                    >
                      {opcion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="buttonsSolicitud">
              {paso > 1 && <button onClick={RetrocederPaso}>Atrás</button>}
              {paso < 3 && <button onClick={SiguentePaso}>Siguiente</button>}
              {paso === 3 && <button onClick={Finalizar}>Finalizar</button>}
              <button>Cancelar</button>
            </div>
          </div>
        )}

        {paso === 4 && (
          <div className="resumen-solicitud">
            <h2>Resumen de tu solicitud</h2>
            <p>Tipo de Solicitud: {solicitud}</p>
            <p>Día seleccionado: {dia}</p>
            <p>Hora seleccionada: {hora}</p>
            <div className="botonesResumen">
              {paso > 1 && <button onClick={RetrocederPaso}>Atrás</button>}
              <button>Confirmar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TomaSoli;
