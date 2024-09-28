import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex">
      <div className="flex flex-col bg-[#EBF5FB] w-1/2 h-screen justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <div className="self-start mb-12">
            <Link to="/" className="text-[#E74C3C] hover:underline">
              Regresar al Inicio
            </Link>
          </div>
          <p className="mb-2 text-2xl">Ingrese sus datos para</p>
          <p className="mb-8 text-2xl">Iniciar Sesion</p>
          <form id="formLogin">
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
                <label htmlFor="password" className="text-gray-500 text-sm px-2">Ingrese su contraseña</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  className="outline-none bg-transparent px-2"
                />
              </div>
            </div>

            <div className="flex items-center mb-8">
              <input
                type="checkbox"
                id="mostrarPassword"
                className="mr-2"
                checked={showPassword}
                onChange={handleCheckboxChange}
              />
              <p>Mostrar Contraseña</p>
            </div>

            <div className="flex justify-center">
              <button type="submit" className="bg-[#E74C3C] border border-[#E74C3C] text-[#EBF5FB] py-2 px-4 rounded-lg font-bold hover:bg-red-600">
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-[#095b92] w-1/2 h-screen flex justify-center items-center">
        <div className="flex flex-col items-center mt-32">
          <p className="text-white text-4xl font-bold mb-12 text-center">
            Aun no tienes una cuenta?
          </p>
          <p className="text-white text-2xl font-bold mb-12 text-center">
            Solicita tu registro aqui
          </p>
          <div className="flex justify-center">
            <Link to="/Register">
              <button className="w-auto h-16 bg-[#E74C3C] border border-[#E74C3C] text-[#EBF5FB] py-2 px-4 rounded-lg text-2xl font-bold hover:bg-red-600">
                Solicitar Registro
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
