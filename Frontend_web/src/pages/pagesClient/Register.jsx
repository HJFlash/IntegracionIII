import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/register.css';
import { useState } from 'react';


function Register() {
  const [fileName, setFileName] = useState('Ningún archivo seleccionado');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : 'Ningún archivo seleccionado');
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
        <form action="">
          <div className='rutContainer1'>
            <div className='IconRed'></div>
            <div className='rut1'>
              <label for="rut1">Ingrese su RUT</label>
              <input 
                type="text" 
                id="rut1" 
                name="rut1" 
                required/>
            </div>
          </div>

          <div className='nombresContainer'>
            <div className='IconRed'></div>
            <div className='nombres'>
              <label for="nombres">Ingrese sus Nombres</label>
              <input type="text" id="nombres" name="nombres" required/>
            </div>
          </div>

          <div className='apellidoContainer'>
            <div className='IconRed'></div>
            <div className='apellido'>
              <label for="apellido">Ingrese sus Apellidos</label>
              <input type="text" id="apellido" name="apellido" required/>
            </div>
          </div>


          <div className='contrasenaContainer'>
            <div className='IconRed'></div>
            <div className='contrasena1'>
              <label for="contrasena1">Ingrese su Contraseña</label>
              <input type="password" id="contrasena1" name="contrasena1" required/>
            </div>
          </div>

          <div className='telContainer'>
            <div className='IconRed'></div>
            <div className='tel'>
              <label for="tel">Ingrese su Contacto Telefonico</label>
              <input type="tel" id="tel" name="tel" required/>
            </div>
          </div>

          <div className='residencia'>
            <p>Ingrese sus datos de residencia</p>
            <div className='residenciacontainer'>
              
              <div className='sectorContainer'>
                <div className='IconRed'></div>
                <div className='sector'>
                  <label for="sector">Sector</label>
                  <input type="text" id="sector" name="sector" required/>
                </div>
              </div>

              <div className='numeros'>
                <div className='calleContainer'>
                  <div className='IconRed'></div>
                  <div className='calle'>
                    <label for="calle">Calle</label>
                    <input type="text" id="calle" name="calle" required/>
                  </div>
                </div>


                <div className='NcasaContainer'>
                  <div className='IconRed'></div>
                  <div className='Ncasa'>
                    <label for="Ncasa">N° Casa</label>
                    <input type="text" id="Ncasa" name="Ncasa" required/>
                  </div>
                </div>
              </div>


            </div>
          </div>

          <div className='archContainer'>
            <p>Subir registro social de hogares</p>
            <div className='archivo'>
              <label for="file" class="custom-file-upload">Subir archivo</label>
              <input 
                type="file" 
                id="file" 
                name="file" 
                onChange={handleFileChange}
                />
                <span>{fileName}</span>

            </div>
          </div>
          
          <div id='enviar' className='btn-orange1'>
            <button type='submit'>enviar peticion de registro</button>
          </div>

        </form>



      </div>
    </div>

  );
}

export default Register;
