import React from 'react';
import Header from '../../components/header';
import ServiceCards from '../../components/cardServicios';


function FuncionamientoUser() {
  return (
    <div className='flex justify-center items-center flex-col'>
        <Header />
        <div className='max-w-[1100px]'>

        <div className='flex justify-center items-center flex-col mt-20 mb-20 bg-[#f7fafc] shadow-lg rounded-md p-6'>
            <h3 className='mb-4 mt-4 text-3xl'>Informacion de uso</h3>
            <p className='mb-4 mt-4 text-2xl'>En el siguente video encontrar la informacion de como realizar  una peticion de servicio </p>
            <div className='mb-16 mt-16'>
            <iframe 
                className="video-container" 
                id="videoSection"
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/Y-x0efG1seA?si=Bw2I4bQeYNd_s8jU" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen>
            </iframe>
            </div>
        </div>

        <div className='flex justify-center items-center flex-col mt-20 mb-20 bg-[#f7fafc] shadow-lg rounded-md pt-6'>
            <ServiceCards/>        
        </div>


        <div className='flex justify-center items-center flex-col mt-20 mb-20 bg-[#f7fafc] shadow-lg rounded-md p-6'>
            <h3 className='text-3xl mb-6 font-semibold text-center'>Preguntas Frecuentes</h3>
            
            <details className="mb-4 group border border-[#e2e8f0] rounded-md pb-2 max-w-[860px]">
                <summary className="min-w-[860px] cursor-pointer flex justify-between items-center bg-[#e2e8f0] hover:bg-[#cbd5e1] px-4 py-2 rounded-md transition-colors duration-300">
                    <span className="font-medium text-lg">¿Como Registrarme?</span>
                    <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06 0L10 10.92l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>
                </summary>
                <p className="pl-6 mt-2 text-gray-700">Puede solicitar su peticion de registro <span className='text-naranja-claro'>Aqui</span></p>
            </details>

            <details className="mb-4 group border border-[#e2e8f0] rounded-md pb-2 max-w-[860px]">
                <summary className="min-w-[860px] cursor-pointer flex justify-between items-center bg-[#e2e8f0] hover:bg-[#cbd5e1] px-4 py-2 rounded-md transition-colors duration-300">
                    <span className="font-medium text-lg">¿Cómo puedo cancelar una solicitud?</span>
                    <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06 0L10 10.92l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>
                </summary>
                <p className="pl-6 mt-2 text-gray-700">Puedes cancelar tu solicitud desde tu perfil de usuario o llamando al número de atención al cliente. <span className='text-naranja-claro'>9 39393939</span></p>
            </details>

            <details className="mb-4 group border border-[#e2e8f0] rounded-md pb-2 max-w-[860px]">
                <summary className="min-w-[860px] cursor-pointer flex justify-between items-center bg-[#e2e8f0] hover:bg-[#cbd5e1] px-4 py-2 rounded-md transition-colors duration-300">
                    <span className="font-medium text-lg">¿Donde puedo ver la informacion de mi Cita?</span>
                    <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06 0L10 10.92l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>
                </summary>
                <p className="pl-6 mt-2 text-gray-700">La informacion de la Cita se puede encontrar en su perfil y tambien se enviara un comprobante a su correo Electronico</p>
            </details>

            <details className="mb-4 group border border-[#e2e8f0] rounded-md pb-2 max-w-[860px]">
                <summary className="min-w-[860px] cursor-pointer flex justify-between items-center bg-[#e2e8f0] hover:bg-[#cbd5e1] px-4 py-2 rounded-md transition-colors duration-300">
                    <span className="font-medium text-lg">Cambie mi numero de telefono ¿Que puedo hacer?</span>
                    <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06 0L10 10.92l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>
                </summary>
                <p className="pl-6 mt-2 text-gray-700">Para modificar datos, puedo ir a su perfil y modificar los datos que necesite cambiar o  llamando al número de atención al cliente. <span className='text-naranja-claro'>9 39393939</span></p>
            </details>

        </div>

        </div>


    </div>
  )
}

export default FuncionamientoUser