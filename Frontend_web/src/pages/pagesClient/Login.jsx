import React, { useState } from 'react';
import '../../styles/login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    rut: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      Rut: formData.rut,
      Contraseña: formData.password
    };

    fetch('http://localhost:8000/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
    .then(response => {
      return response.json().then(data => {
        if (!response.ok) {
          // Manejo de errores
          setErrors({ rut: data.error || 'Error en el inicio de sesión' });
          throw new Error(data.error || 'Error en el inicio de sesión');
        }
        return data;
      });
    })
    .then(data => {
      console.log(data);
      alert(data.message);
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      localStorage.setItem('nombreUsuario', data.primer_nombre);
      navigate('/');
    })
    .catch(error => {
      alert(`Error: ${error.message}`);
      console.error('Error:', error);
    });
  };

  return (
    <div className="flex">
      <div className="flex flex-col bg-[#EBF5FB] w-1/2 h-screen justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <div className="self-start mb-12">
            <Link to="/" className=' text-base font-semibold group relative w-max'>
              Regresar al Inicio
              <span class="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-naranja-claro group-hover:w-3/6"></span>
              <span class="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-naranja-claro group-hover:w-3/6"></span>
            </Link>
          </div>
          <p className="mb-2 text-2xl">Ingrese sus datos para</p>
          <p className="mb-8 text-2xl">Iniciar Sesion</p>
          <form id="formLogin" onSubmit={handleSubmit} >
            <div>
            {errors.rut && <p className="text-red-500 text-sm px-2 max-w-[350px]">{errors.rut}</p>}
              <div className="flex border-2 border-[#E74C3C] mb-4">
                <div className="w-1 p-0 bg-[#E74C3C]"></div>
                <div className="flex flex-col min-w-[350px]">
                  <label htmlFor="rut" className="text-gray-500 text-sm px-2">Ingrese su RUT</label>
                  <input 
                    type="text" 
                    id="rut" 
                    name="rut" 
                    required 
                    onChange={handleChange}
                    value={formData.rut}
                    className="outline-none bg-transparent px-2" />
                </div>
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
                  onChange={handleChange}
                  value={formData.password}
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