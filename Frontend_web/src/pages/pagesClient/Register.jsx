import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/register.css';

function Register() {
  const [fileName, setFileName] = useState('Ningún archivo seleccionado');
  const [formData, setFormData] = useState({
    rut: '',
    contrasena: '',
    email: '',
    nombres: '',
    apellidos: '',
    tel: '',
    sector: '',
    calle: '',
    Ncasa: ''
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : 'Ningún archivo seleccionado');
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
  
    // Estructura de los datos que se enviarán al backend
    const dataToSend = {
      Rut: formData.rut,
      Contraseña: formData.contrasena,
      Email: formData.email,
      Nombre: formData.nombres,
      Apellidos: formData.apellidos,
      Telefono: formData.tel,
      Sector: formData.sector,
      Calle: formData.calle,
      Ncasa: formData.Ncasa
    };
  
    // Petición POST al backend
    fetch('http://localhost:8000/registro/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(`Error: ${data.error}`);
      } else {
        alert('Registro exitoso');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className='container'>
      <div className='initlogin'>
        <div className='containerInitL'>
          <div className='regresar1'>
            <Link to="/" className='btn-inicio1'>
              Regresar al Inicio
            </Link>
          </div>
          <div className='infoSoli1'>
            <p>Ya Tienes una cuenta?</p>
            <p>Es necesario Iniciar Sesión <br /> para realizar una solicitud</p>
          </div>
          <div className='btn-orange1'>
            <Link to="/Login">
              <button>Ir a Iniciar Sesión</button>
            </Link>
          </div>
        </div>
      </div>

      <div className='Register'>
        <h2> Iniciar Proceso de Registro  </h2>
        <form onSubmit={handleSubmit}>
          {/* RUT */}
          <div className='rutContainer1'>
            <div className='IconRed'></div>
            <div className='rut1'>
              <label htmlFor="rut1">Ingrese su RUT</label>
              <input 
                type="text" 
                id="rut1" 
                name="rut" 
                required 
                onChange={handleChange} 
                value={formData.rut} 
              />
            </div>
          </div>

          {/* Email */}
          <div className='emailContainer'>
            <div className='IconRed'></div>
            <div className='email'>
              <label htmlFor="email">Ingrese su Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                onChange={handleChange} 
                value={formData.email} 
              />
            </div>
          </div>

          {/* Nombres */}
          <div className='nombresContainer'>
            <div className='IconRed'></div>
            <div className='nombres'>
              <label htmlFor="nombres">Ingrese sus Nombres</label>
              <input 
                type="text" 
                id="nombres" 
                name="nombres" 
                required 
                onChange={handleChange} 
                value={formData.nombres} 
              />
            </div>
          </div>

          {/* Apellidos */}
          <div className='apellidoContainer'>
            <div className='IconRed'></div>
            <div className='apellido'>
              <label htmlFor="apellido">Ingrese sus Apellidos</label>
              <input 
                type="text" 
                id="apellido" 
                name="apellidos" 
                required 
                onChange={handleChange} 
                value={formData.apellidos} 
              />
            </div>
          </div>

          {/* Contraseña */}
          <div className='contrasenaContainer'>
            <div className='IconRed'></div>
            <div className='contrasena1'>
              <label htmlFor="contrasena1">Ingrese su Contraseña</label>
              <input 
                type="password" 
                id="contrasena1" 
                name="contrasena" 
                required 
                onChange={handleChange} 
                value={formData.contrasena} 
              />
            </div>
          </div>

          {/* Teléfono */}
          <div className='telContainer'>
            <div className='IconRed'></div>
            <div className='tel'>
              <label htmlFor="tel">Ingrese su Contacto Telefónico</label>
              <input 
                type="tel" 
                id="tel" 
                name="tel" 
                required 
                onChange={handleChange} 
                value={formData.tel} 
              />
            </div>
          </div>

          {/* Residencia */}
          <div className='residencia'>
            <p>Ingrese sus datos de residencia</p>
            <div className='residenciacontainer'>
              <div className='sectorContainer'>
                <div className='IconRed'></div>
                <div className='sector'>
                  <label htmlFor="sector">Sector</label>
                  <input 
                    type="text" 
                    id="sector" 
                    name="sector" 
                    required 
                    onChange={handleChange} 
                    value={formData.sector} 
                  />
                </div>
              </div>

              <div className='numeros'>
                <div className='calleContainer'>
                  <div className='IconRed'></div>
                  <div className='calle'>
                    <label htmlFor="calle">Calle</label>
                    <input 
                      type="text" 
                      id="calle" 
                      name="calle" 
                      required 
                      onChange={handleChange} 
                      value={formData.calle} 
                    />
                  </div>
                </div>

                <div className='NcasaContainer'>
                  <div className='IconRed'></div>
                  <div className='Ncasa'>
                    <label htmlFor="Ncasa">N° Casa</label>
                    <input 
                      type="text" 
                      id="Ncasa" 
                      name="Ncasa" 
                      required 
                      onChange={handleChange} 
                      value={formData.Ncasa} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Archivo opcional */}
          <div className='archContainer'>
            <p>Subir registro social de hogares (opcional)</p>
            <div className='archivo'>
              <label htmlFor="file" className="custom-file-upload">Subir archivo</label>
              <input 
                type="file" 
                id="file" 
                name="file" 
                onChange={handleFileChange}
              />
              <span>{fileName}</span>
            </div>
          </div>

          {/* Botón de enviar */}
          <div id='enviar' className='btn-orange1'>
            <button type='submit'>Enviar petición de registro</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;