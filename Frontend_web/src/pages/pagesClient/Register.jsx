import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validarRut, validarNombre, validarApellidos, validarEmail, validarTel} from '../../auth/valicion';

function Register() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    rut: '',
    contrasena: '',
    correo_electronico: '',
    primer_nombre: '',
    primer_apellido: '',
    tel: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de errores
    const errors = {};
    for (const field of ['rut', 'primer_nombre', 'primer_apellido', 'correo_electronico']) {
      switch (field) {
        case 'rut':
          const rutError = validarRut(formData.rut);
          if (rutError) errors.rut = rutError;
          break;
        case 'primer_nombre':
          const primernombreError = validarNombre(formData.primer_nombre);
          if (primernombreError) errors.primer_nombre = primernombreError;
          break;
        case 'primer_apellido':
          const primerapellidoError = validarApellidos(formData.primer_apellido);
          if (primerapellidoError) errors.primer_apellido = primerapellidoError;
          break;
        case 'correo_electronico':
          const emailError = validarEmail(formData.correo_electronico);
          if (emailError) errors.correo_electronico = emailError;
          break;
        case 'tel':
          const telError = validarTel(formData.tel);
          if (telError) errors.tel = telError;
          break;
        default:
          return alert('No se qué pasa');
      }
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // Estructura de los datos que se enviarán al backend
    const dataToSend = {
      rut: formData.rut,
      contrasena: formData.contrasena,
      primer_nombre: formData.primer_nombre,
      primer_apellido: formData.primer_apellido,
      contacto: formData.tel,
      correo_electronico: formData.correo_electronico,
    };

    // Petición POST al backend
    fetch('http://localhost:8000/registro/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => { throw new Error(JSON.stringify(err)); });
      }
      return response.json();
    })
    .then(data => {
      alert('Registro exitoso');
      navigate('/');
    })
    .catch(error => {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    });
  };


  return (
    <div className='flex'>
      <div className='flex flex-col justify-center items-center h-screen bg-[#095b92] w-[50%]'>
        <div className='containerInitL'> 
          <div className="self-start mb-12 text-2xl">
            <Link to="/" className='text-white text-base font-semibold group relative w-max'>
              Regresar al Inicio
              <span class="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-naranja-claro group-hover:w-3/6"></span>
              <span class="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-naranja-claro group-hover:w-3/6"></span>
            </Link>
          </div>
          <div className='flex justify-center items-center flex-col'>
            <p className='text-4xl text-[#EBF5FB]'>Ya Tienes una cuenta?</p>
            <p className='text-4xl text-[#EBF5FB]'>Es necesario Iniciar Sesión <br /> para realizar una solicitud</p>
          </div>
          <div className='text-[#EBF5FB] flex justify-center items-center pt-10 hover:text-[#E74C3C]'>
            <Link to="/Login" className='text-white text-2xl font-semibold group relative w-max'>
              Ir a Iniciar Sesión
              <span class="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-naranja-claro group-hover:w-3/6"></span>
              <span class="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-naranja-claro group-hover:w-3/6"></span>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-[#EBF5FB] w-[50%] mx-auto">
        <p className="mb-5 text-2xl flex justify-center items-center">Iniciar Proceso de Registro</p>
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit}>
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
                    className="outline-none bg-transparent px-2" 
                  />
                </div>
              </div>
            </div>

            <div>
              {errors.primer_nombre && <p className="text-red-500 text-sm px-2 max-w-[350px]">{errors.primer_nombre}</p>}
              <div className="flex border-2 border-[#E74C3C] mb-4">
                <div className="w-1 p-0 bg-[#E74C3C]"></div>
                <div className="flex flex-col min-w-[350px]">
                  <label htmlFor="primer_nombre" className="text-gray-500 text-sm px-2">Ingrese su Primer Nombre</label>
                  <input 
                    type="text" 
                    id="primer_nombre" 
                    name="primer_nombre" 
                    required 
                    onChange={handleChange} 
                    value={formData.primer_nombre} 
                    className="outline-none bg-transparent px-2" 
                  />
                </div>
              </div>
            </div>


            <div>
              {errors.primer_apellido && <p className="text-red-500 text-sm px-2 max-w-[350px]">{errors.primer_apellido}</p>}
              <div className="flex border-2 border-[#E74C3C] mb-4">
                <div className="w-1 p-0 bg-[#E74C3C]"></div>
                <div className="flex flex-col min-w-[350px]">
                  <label htmlFor="primer_apellido" className="text-gray-500 text-sm px-2">Ingrese su Primer Apellido</label>
                  <input 
                    type="text" 
                    id="primer_apellido" 
                    name="primer_apellido" 
                    required 
                    onChange={handleChange} 
                    value={formData.primer_apellido} 
                    className="outline-none bg-transparent px-2" 
                  />
                </div>
              </div>
            </div>

            <div>
              {errors.correo_electronico && <p className="text-red-500 text-sm px-2 max-w-[350px]">{errors.correo_electronico}</p>}
              <div className="flex border-2 border-[#E74C3C] mb-4">
                <div className="w-1 p-0 bg-[#E74C3C]"></div>
                <div className="flex flex-col min-w-[350px]">
                  <label htmlFor="correo_electronico" className="text-gray-500 text-sm px-2">Ingrese su Correo Electronico</label>
                  <input 
                    type="email" 
                    id="correo_electronico" 
                    name="correo_electronico" 
                    required 
                    onChange={handleChange} 
                    value={formData.correo_electronico} 
                    className="outline-none bg-transparent px-2" 
                  />
                </div>
              </div>
            </div>

            <div>
              {errors.tel && <p className="text-red-500 text-sm px-2 max-w-[350px]">{errors.tel}</p>}
              <div className="flex border-2 border-[#E74C3C] mb-4">
                <div className="w-1 p-0 bg-[#E74C3C]"></div>
                <div className="flex flex-col min-w-[350px]">
                  <label htmlFor="tel" className="text-gray-500 text-sm px-2">Ingrese su teléfono</label>
                  <input 
                    type="tel" 
                    id="tel" 
                    name="tel" 
                    required 
                    onChange={handleChange} 
                    value={formData.tel} 
                    className="outline-none bg-transparent px-2" 
                  />
                </div>
              </div>
            </div>


            <div>

              <div className="flex border-2 border-[#E74C3C] mb-4">
                <div className="w-1 p-0 bg-[#E74C3C]"></div>
                <div className="flex flex-col min-w-[350px]">
                  <label htmlFor="contrasena" className="text-gray-500 text-sm px-2">Ingrese su contraseña</label>
                  <input 
                    type="password" 
                    id="contrasena" 
                    name="contrasena" 
                    required 
                    onChange={handleChange} 
                    value={formData.contrasena} 
                    className="outline-none bg-transparent px-2" 
                  />
                </div>
              </div>
            </div>
            
            <div id='enviar' className='flex justify-center items-center'>
              <button type='submit' className="bg-[#095b92] text-white py-2 px-6 rounded hover:bg-[#0770bb] transition-colors">
                Enviar Solicitud
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
