import React from 'react';
import '../../styles/login.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Login() {

  const [showPassword, setShowPassword] = useState(false);

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
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
            <h2>Ingrese sus datos para <br /> Iniciar Sesion</h2>
            <form id='formLogin' action="">

              <div className='rutContainer'>
                <div className='IconRed'></div>
                <div className='rut'>
                  <label for="rut">Ingrese su RUT</label>
                  <input type="text" id="rut" name="rut" required/>
                </div>
              </div>

              <div className='contrasenaContainer'>
                <div className='IconRed'></div>
                <div className='contrasena'>
                  <label for="password">Ingrese su contraseña</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
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
          <p>Aun no tienes una cuenta? <br />
          Solicita tu registro aqui</p>
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
