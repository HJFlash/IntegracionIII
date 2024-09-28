import React from 'react';
import { Link } from 'react-router-dom';

import { useState } from 'react';


function Register() {
  const [fileName, setFileName] = useState('Ningún archivo seleccionado');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : 'Ningún archivo seleccionado');
  };



  return (
    <div className='flex'>

      <div className='flex flex-col justify-center items-center h-screen bg-[#095b92] w-[50%]'>
        <div className='containerInitL'> 
          <div className="self-start mb-12 text-2xl">
            <Link to="/" className="text-[#E74C3C] hover:underline">
              Regresar al Inicio
            </Link>
          </div>
          <div className='flex justify-center items-center flex-col'>
            <p className='text-4xl text-[#EBF5FB]'>Ya Tienes una cuenta?</p>
            <p className='text-4xl text-[#EBF5FB]'>Es necesario Iniciar Sesión <br /> para realizar una solicitud</p>
          </div>
          <div className='text-[#EBF5FB] flex justify-center items-center pt-10 hover:text-[#E74C3C]'>
            <Link to="/Login">
              <button className='text-2xl underline underline-offset-[6px]'>Ir a Iniciar Sesión</button>
            </Link>
          </div>
          
        </div>
      </div>


      <div className="flex flex-col items-center justify-center bg-[#EBF5FB] w-[50%] mx-auto">
        <p className="mb-2 text-2xl flex justify-center items-center">Iniciar Proceso de Registro  </p>
        <div className="max-w-md mx-auto">
        <form action="">
        <div className="flex border-2 border-[#E74C3C] mb-4">
            <div className="w-1 p-0 bg-[#E74C3C]"></div>
            <div className="flex flex-col min-w-[350px]">
              <label for="rut1" className="text-gray-500 text-sm px-2">Ingrese su RUT</label>
              <input 
                type="text" 
                id="rut1" 
                name="rut1"
                className="outline-none bg-transparent px-2" 
                required/>
            </div>
          </div>

          <div className="flex border-2 border-[#E74C3C] mb-4">
            <div className="w-1 p-0 bg-[#E74C3C]"></div>
            <div className="flex flex-col min-w-[350px]">
              <label htmlFor="rut" className="text-gray-500 text-sm px-2">Ingrese su RUT</label>
              <input type="text" id="rut" name="rut" required className="outline-none bg-transparent px-2" />
            </div>
          </div>
          <div className="flex border-2 border-[#E74C3C] mb-4">
              <div className="w-1 p-0 bg-[#E74C3C]"></div>
              <div className="flex flex-col min-w-[350px]">
                <label htmlFor="rut" className="text-gray-500 text-sm px-2">Ingrese su RUT</label>
                <input type="text" id="rut" name="rut" required className="outline-none bg-transparent px-2" />
              </div>
            </div>


            <div className="flex border-2 border-[#E74C3C] mb-4">
              <div className="w-1 p-0 bg-[#E74C3C]"></div>
              <div className="flex flex-col min-w-[350px]">
                <label htmlFor="rut" className="text-gray-500 text-sm px-2">Ingrese su RUT</label>
                <input type="text" id="rut" name="rut" required className="outline-none bg-transparent px-2" />
              </div>
            </div>

            <div className="flex border-2 border-[#E74C3C] mb-4">
              <div className="w-1 p-0 bg-[#E74C3C]"></div>
              <div className="flex flex-col min-w-[350px]">
                <label htmlFor="rut" className="text-gray-500 text-sm px-2">Ingrese su RUT</label>
                <input type="text" id="rut" name="rut" required className="outline-none bg-transparent px-2" />
              </div>
            </div>

          <div className='residencia'>
            <p className='text-xl'>Ingrese sus datos de residencia</p>
            <div className='residenciacontainer'>
              
            <div className="flex border-2 border-[#E74C3C] mb-4">
              <div className="w-1 p-0 bg-[#E74C3C]"></div>
              <div className="flex flex-col min-w-[350px]">
                <label for="sector" className="text-gray-500 text-sm px-2">Sector</label>
                <input type="text" id="sector" name="sector"  className="outline-none bg-transparent px-2" required/>
              </div>
            </div>

              <div className='flex items-center justify-between'>

                <div className="flex border-2 border-[#E74C3C] mb-4 max-w-[49%]">
                  <div className="w-1 p-0 bg-[#E74C3C] min-w-1"></div>
                  <div className="flex flex-col">
                    <label for="calle" className="text-gray-500 text-sm px-2">Calle</label>
                    <input type="text" id="calle" name="calle" className="outline-none bg-transparent px-2" required/>
                  </div>
                </div>

                <div className="flex border-2 border-[#E74C3C] mb-4 max-w-[49%]">
                  <div className="w-1 p-0 bg-[#E74C3C] min-w-1"></div>
                  <div className="flex flex-col">
                    <label for="Ncasa" className="text-gray-500 text-sm px-2">N° Casa</label>
                    <input type="text" id="Ncasa" name="Ncasa" className="outline-none bg-transparent px-2" required/>
                  </div>
                </div>
              </div>


            </div>
          </div>

          <div className='archContainer'>
            <p className='text-xl'>Subir registro social de hogares</p>
            <div className='pb-4'>
              <label for="file" 
              className='inline-block px-4 py-2 cursor-pointer bg-[#E74C3C] text-[#EBF5FB] rounded-md text-lg text-center'>
                Subir archivo</label>
              <input 
                type="file" 
                id="file" 
                name="file" 
                className="hidden"
                onChange={handleFileChange}
                />
                <span className='ml-2'>{fileName}</span>

            </div>
          </div>
          
          <div id='enviar' className='flex justify-center items-center'>
            <button type='submit' className="bg-[#E74C3C] border border-[#E74C3C] text-[#EBF5FB] py-2 px-4 rounded-lg font-bold hover:bg-red-600">enviar peticion de registro</button>
          </div>

        </form>
        </div>
        



      </div>
    </div>

  );
}

export default Register;
