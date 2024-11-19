import React from 'react';
import GraficoTortaMes from '../../components/GtortaMes';
import GraficoBarrasMes from '../../components/GbarraMes';
import AsistenciaTortaConsultorioMes from '../../components/AsistenciaTortaMesConsultorio';
 
const PgGraficosMensuales= () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="col-span-2 text-center mt-4">
          <p className="text-lg font-semibold text-gray-700">Datos para los meses año {currentYear} </p>
          <p className="font-semibold text-gray-700">Mes actual  {months[currentMonth]}</p>
        </div>
        <div className="col-span-2 flex justify-center">
          <GraficoTortaMes />
        </div >
        <div className="col-span-2 flex justify-center">
          <GraficoBarrasMes />
        </div >

        <div className="col-span-2 flex justify-center">
          <AsistenciaTortaConsultorioMes />
        </div >
        
      </div>
    </div>
  );
}

export default PgGraficosMensuales;
