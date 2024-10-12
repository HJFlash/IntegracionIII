import React from 'react'
import { GraficoTorta } from '../../components/GraficoTorta'
import GraficoBarras from '../../components/GraficoBarras'
import GraficoArea from '../../components/GraficoArea'


const pgGraficos = () => {
  return (
    <div className='flex justify-center items-center flex-col'>
      <GraficoTorta/>
      <GraficoBarras/>
      <GraficoArea/>

    </div>
  )
}

export default pgGraficos