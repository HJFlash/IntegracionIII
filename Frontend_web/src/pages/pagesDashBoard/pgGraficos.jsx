import React from 'react';
import { GraficoTorta } from '../../components/GraficoTorta';
import GraficoBarras from '../../components/GraficoBarras';
//import GraficoArea from '../../components/GraficoArea';
import GraficoLinea from '../../components/GraficoLinea';


const PgGraficos = () => {


  return (
    <div className='flex justify-center items-center flex-col'>      
      <GraficoLinea/>
      <GraficoTorta/>
      <GraficoBarras/>

    </div>
  )
}

export default PgGraficos