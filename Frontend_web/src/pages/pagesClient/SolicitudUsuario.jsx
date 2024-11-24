import React from 'react'
import Calendario from '../../components/calendario'
import Header from '../../components/header'
import Footer from '../../components/footer';


function SolicitudUsuario() {
  return (
<div className="flex flex-col min-h-screen bg-gray-100">
  <Header />

  <div className="flex-grow mt-[100px]">
    <Calendario />
  </div>

  <Footer />
</div>
  )
}

export default SolicitudUsuario