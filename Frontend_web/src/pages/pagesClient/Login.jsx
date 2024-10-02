import React, { useState } from 'react';
import '../../styles/login.css';
import { Link } from 'react-router-dom';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    rut: '',
    password: ''
  });

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
          // Aquí puedes manejar diferentes tipos de errores según el mensaje devuelto
          throw new Error(data.error || 'Error en el inicio de sesión');
        }
        return data;
      });
    })
    .then(data => {
      alert(data.message); // Mensaje de éxito
      // Aquí puedes redirigir al usuario a otra página o almacenar información de sesión
    })
    .catch(error => {
      alert(`Error: ${error.message}`);
      console.error('Error:', error);
    });
  };
  

  return (
    <div className='container'>
      <div className='login'>
        <div className='content01'>
          <div className='regresar'>
            <Link to="/" className='btn-inicio'>
              Regresar al Inicio
            </Link>
          </div>
          <div className='contentLog'>
            <h2>Ingrese sus datos para <br /> Iniciar Sesión</h2>
            <form id='formLogin' onSubmit={handleSubmit}>

              <div className='rutContainer'>
                <div className='IconRed'></div>
                <div className='rut'>
                  <label htmlFor="rut">Ingrese su RUT</label>
                  <input
                    type="text"
                    id="rut"
                    name="rut"
                    required
                    onChange={handleChange}
                    value={formData.rut}
                  />
                </div>
              </div>

              <div className='contrasenaContainer'>
                <div className='IconRed'></div>
                <div className='contrasena'>
                  <label htmlFor="password">Ingrese su contraseña</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    onChange={handleChange}
                    value={formData.password}
                  />
                </div>
              </div>

              <div className='mostrarContrasena'>
                <input
                  type="checkbox"
                  id="mostrarPassword"
                  className='checkboxContra'
                  checked={showPassword}
                  onChange={handleCheckboxChange}
                />
                <p>Mostrar Contraseña</p>
              </div>

              <div className='btn-orange'>
                <button type='submit'>Iniciar Sesión</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div className='initRegister'>
        <div className='containerRegister'>
          <p>Aún no tienes una cuenta? <br />
          Solicita tu registro aquí</p>
          <div className='btn-orange'>
            <Link to="/Register">
              <button>Solicitar Registro</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
