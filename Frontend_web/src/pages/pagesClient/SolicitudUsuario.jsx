import React from 'react'
import Calendario from '../../components/calendario'
import Header from '../../components/header'

function SolicitudUsuario() {
  return (
    <div className='bg-gray-100'>
        <div>
            <Header/>
        </div>
        <div>
            <Calendario />  
        </div>
    </div>
  )
}

export default SolicitudUsuario