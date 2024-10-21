import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validarRut, validarNombre, validarApellidos, validarTel, validarEmail } from '../../auth/valicion';

function Register() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    rut: '',
    contrasena: '',
    email: '',
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    tel: '',
    sector: '',
    calle: '',
    Ncasa: ''
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
    for (const field of ['rut', 'primer_nombre', 'segundo_nombre', 'primer_apellido', 'segundo_apellido', 'tel', 'email']) { // Asegúrate de que los nombres de los campos coincidan
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
        case 'segundo_nombre':
          const segundonombreError = validarNombre(formData.segundo_nombre);
          if (segundonombreError) errors.segundo_nombre = segundonombreError;
          break;
        case 'segundo_apellido':
          const segundoapellidoError = validarApellidos(formData.segundo_apellido);
          if (segundoapellidoError) errors.segundo_apellido = segundoapellidoError;
          break;
        case 'tel':
          const telError = validarTel(formData.tel);
          if (telError) errors.tel = telError;
          break;
        case 'email':
          const emailError = validarEmail(formData.email);
          if (emailError) errors.email = emailError;
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
      contacto: formData.tel,
      primer_nombre: formData.primer_nombre,
      segundo_nombre: formData.segundo_nombre,
      primer_apellido: formData.primer_apellido,
      segundo_apellido: formData.segundo_apellido,
      calle: formData.calle,
      num_casa: formData.Ncasa,
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
        <p className="mb-2 text-2xl flex justify-center items-center">Iniciar Proceso de Registro</p>
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
              {errors.email && <p className="text-red-500 text-sm px-2 max-w-[350px]">{errors.email}</p>}
              <div className="flex border-2 border-[#E74C3C] mb-4">
                <div className="w-1 p-0 bg-[#E74C3C]"></div>
                <div className="flex flex-col min-w-[350px]">
                  <label htmlFor="email" className="text-gray-500 text-sm px-2">Ingrese su email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    onChange={handleChange} 
                    value={formData.email} 
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
                  <label htmlFor="primer_nombre" className="text-gray-500 text-sm px-2">Ingrese su primer nombre</label>
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
              {errors.segundo_nombre && <p className="text-red-500 text-sm px-2 max-w-[350px]">{errors.segundo_nombre}</p>}
              <div className="flex border-2 border-[#E74C3C] mb-4">
                <div className="w-1 p-0 bg-[#E74C3C]"></div>
                <div className="flex flex-col min-w-[350px]">
                  <label htmlFor="segundo_nombre" className="text-gray-500 text-sm px-2">Ingrese su segundo nombre</label>
                  <input 
                    type="text" 
                    id="segundo_nombre" 
                    name="segundo_nombre" 
                    required 
                    onChange={handleChange} 
                    value={formData.segundo_nombre} 
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
                  <label htmlFor="primer_apellido" className="text-gray-500 text-sm px-2">Ingrese su primer apellido</label>
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
              {errors.segund_apellido && <p className="text-red-500 text-sm px-2 max-w-[350px]">{errors.segundo_apellido}</p>}
              <div className="flex border-2 border-[#E74C3C] mb-4">
                <div className="w-1 p-0 bg-[#E74C3C]"></div>
                <div className="flex flex-col min-w-[350px]">
                  <label htmlFor="segundo_apellido" className="text-gray-500 text-sm px-2">Ingrese su segundo apellido</label>
                  <input 
                    type="text" 
                    id="segundo_apellido" 
                    name="segundo_apellido" 
                    required 
                    onChange={handleChange} 
                    value={formData.segundo_apellido} 
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
                  <label htmlFor="sector" className="text-gray-500 text-sm px-2">Ingrese su sector</label>
                  <input 
                      type="text" 
                      id="sector" 
                      name="sector" 
                    required 
                    onChange={handleChange} 
                    value={formData.sector} 
                    className="outline-none bg-transparent px-2" 
                  />
                </div>
              </div>
            </div>

            <div>

              <div className="flex border-2 border-[#E74C3C] mb-4">
                <div className="w-1 p-0 bg-[#E74C3C]"></div>
                <div className="flex flex-col min-w-[350px]">
                  <label htmlFor="calle" className="text-gray-500 text-sm px-2">calle</label>
                  <input 
                    type="text" 
                    id="calle" 
                    name="calle" 
                    required 
                    onChange={handleChange} 
                    value={formData.calle} 
                    className="outline-none bg-transparent px-2" 
                  />
                </div>
              </div>
            </div>

            
            <div>

              <div className="flex border-2 border-[#E74C3C] mb-4">
                <div className="w-1 p-0 bg-[#E74C3C]"></div>
                <div className="flex flex-col min-w-[350px]">
                  <label htmlFor="Ncasa" className="text-gray-500 text-sm px-2">Ingrese sus Ncasa</label>
                  <input 
                    type="text" 
                    id="Ncasa" 
                    name="Ncasa" 
                    required 
                    onChange={handleChange} 
                    value={formData.Ncasa} 
                    className="outline-none bg-transparent px-2" 
                  />
                </div>
              </div>
            </div>

            

            {/* Botón para enviar el formulario */}
            <div id='enviar' className='flex justify-center items-center'>
              <button type='submit' className="bg-[#095b92] text-white py-2 px-6 rounded hover:bg-[#0770bb] transition-colors">
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
