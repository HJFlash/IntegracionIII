import React from 'react'
import { GraficoTorta } from '../../components/GraficoTorta'
import GraficoBarras from '../../components/GraficoBarras'
import GraficoArea from '../../components/GraficoArea'


const pgGraficos = () => {
  return (
    <div>
      <GraficoTorta/>
      <GraficoBarras/>
      <GraficoArea/><GraficoTorta/>
    </div>
  )
}

export default pgGraficos