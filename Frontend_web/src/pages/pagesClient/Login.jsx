import React from 'react';
import '../../styles/login.css';


function Login() {

  return (
    <div className='container'>
      <div className='login'>
        <div className='contentl'>
          <h2>Login</h2>
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
                <input type="password" id="password" name="password" required/>
              </div>
            </div>

            <div>
              <input type="checkbox"/> Mostrar Contrasena
            </div>

          </form>

        </div>
      </div>
      
      <div className='initRegister'>
        <p>a</p>
      </div>
    </div>
  );
}

export default Login;
