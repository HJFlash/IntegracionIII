import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/register.css';


function Register() {

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

      </div>
    </div>

  );
}

export default Register;
