import React from 'react';
import { GraficoTorta } from '../../components/GraficoTorta';
import GraficoBarras from '../../components/GraficoBarras';
import GraficoLinea from '../../components/GraficoLinea';
 
const PgGraficosAnuales = () => {

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
      <div className="col-span-2 text-center mt-4">
          <p className="text-lg font-semibold text-gray-700">Datos para el año actual {currentYear} </p>
        </div>
        <div className="col-span-2 flex justify-center">
          <GraficoLinea />
        </div >
        <div className="flex justify-center">
          <GraficoTorta />
        </div>
        <div className="col-span-2 flex justify-center">
          <GraficoBarras />
        </div>
      </div>
    </div>
  );
}

export default PgGraficosAnuales;
