import React, { useState } from "react";
import { validarRut, validarNombre, validarApellidos, validarEmail, validarTel} from '../../auth/valicion';


const RegistrarTrabajador = () => {
  const [errors, setErrors] = useState({});
  const [tipoTrabajo, setTipoTrabajo] = useState('Sin area designada')

  const [formData, setFormData] = useState({
    rut: "",
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    contrasena: "",
    contacto: "",
    calle: "",
    num_casa: "",
    num_apar: "",
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    for (const field of ['rut', 'primer_nombre', 'primer_apellido', 'segundo_nombre','segundo_apellido', 'correo_electronico']) {
      switch(field){
        case 'rut':
          const rutError = validarRut(formData.rut);
          if (rutError) errors.rut = rutError;
          break;
        case 'primer_nombre':
          const primernombreError = validarNombre(formData.primer_nombre);
          if (primernombreError) errors.primer_nombre = primernombreError;
          break;
        case 'segundo_nombre':
          const segundonombreError = validarApellidos(formData.segundo_nombre);
          if (segundonombreError) errors.segundo_nombre = segundonombreError;
          break;
        case 'primer_apellido':
          const primerapellidoError = validarApellidos(formData.primer_apellido);
          if (primerapellidoError) errors.primer_apellido = primerapellidoError;
          break;
        case 'segundo_apellido':
          const segundoapellidoError = validarNombre(formData.segundo_apellido);
          if (segundoapellidoError) errors.segundo_apellido = segundoapellidoError;
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
          return alert('error inesperado ');
      }
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }


    const dataToSend = {
      rut: formData.rut,
      primer_nombre: formData.primer_nombre,
      segundo_nombre: formData.segundo_nombre,
      primer_apellido: formData.primer_apellido,
      segundo_apellido: formData.segundo_apellido,
      contrasena: formData.contrasena,
      contacto: formData.contacto,
      calle: formData.calle,
      num_casa: formData.num_casa,
      num_apar: formData.num_apar,
    };

    

    fetch("http://localhost:8000/registroTrabajador/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(JSON.stringify(err));
          });
        }
        return response.json();
      })
      .then((data) => {
        alert("Registro exitoso");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(`Error: ${error.message}`);
      });
  };

  return (
    <div className="flex items-center justify-center flex-col">
      
      <div className="w-[90%] max-w-full mx-auto border-2 mt-4 p-6 bg-white rounded-lg shadow-lg">
        <p className="mb-5 font-bold">Registro para Trabajador</p>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-2 border-gray-200 mb-4 rounded-lg">
              <div className="flex flex-col">
                <label htmlFor="rut" className="text-gray-500 px-2">
                  Ingrese el RUT
                </label>
                <input
                  type="text"
                  id="rut"
                  name="rut"
                  required
                  onChange={handleChange}
                  value={formData.rut}
                  className="outline-none bg-transparent px-2 py-2"
                />
              </div>
            </div>


            <div className="border-2 border-gray-200 mb-4 rounded-lg">
              <div className="flex flex-col">
                <label htmlFor="primer_nombre" className="text-gray-500  px-2">
                  Ingrese primer nombre
                </label>
                <input
                  type="text"
                  id="primer_nombre"
                  name="primer_nombre"
                  required
                  onChange={handleChange}
                  value={formData.primer_nombre}
                  className="outline-none bg-transparent px-2 py-2"
                />
              </div>
            </div>

            <div className="border-2 border-gray-200 mb-4 rounded-lg">
              <div className="flex flex-col">
                <label htmlFor="segundo_nombre" className="text-gray-500  px-2">
                  Ingrese segundo nombre
                </label>
                <input
                  type="text"
                  id="segundo_nombre"
                  name="segundo_nombre"
                  required
                  onChange={handleChange}
                  value={formData.segundo_nombre}
                  className="outline-none bg-transparent px-2 py-2"
                />
              </div>
            </div>


            <div className="border-2 border-gray-200 mb-4 rounded-lg">
              <div className="flex flex-col">
                <label
                  htmlFor="primer_apellido"
                  className="text-gray-500  px-2"
                >
                  Ingrese primer apellido
                </label>
                <input
                  type="text"
                  id="primer_apellido"
                  name="primer_apellido"
                  required
                  onChange={handleChange}
                  value={formData.primer_apellido}
                  className="outline-none bg-transparent px-2 py-2"
                />
              </div>
            </div>

            <div className="border-2 border-gray-200 mb-4 rounded-lg">
              <div className="flex flex-col">
                <label
                  htmlFor="segundo_apellido"
                  className="text-gray-500  px-2"
                >
                  Ingrese segundo apellido
                </label>
                <input
                  type="text"
                  id="segundo_apellido"
                  name="segundo_apellido"
                  required
                  onChange={handleChange}
                  value={formData.segundo_apellido}
                  className="outline-none bg-transparent px-2 py-2"
                />
              </div>
            </div>


            <div className="border-2 border-gray-200 mb-4 rounded-lg">
              <div className="flex flex-col">
                <label
                  htmlFor="contrasena"
                  className="text-gray-500  px-2"
                >
                  Ingrese contraseña
                </label>
                <input
                  type="password"
                  id="contrasena"
                  name="contrasena"
                  required
                  onChange={handleChange}
                  value={formData.contrasena}
                  className="outline-none bg-transparent px-2 py-2"
                />
              </div>
            </div>

            <div className="border-2 border-gray-200 mb-4 rounded-lg">
              <div className="flex flex-col">
                <label
                  htmlFor="contacto"
                  className="text-gray-500  px-2"
                >
                  Ingrese Numero de Telefono
                </label>
                <input
                  type="tel"
                  id="contacto"
                  name="contacto"
                  required
                  onChange={handleChange}
                  value={formData.contacto}
                  className="outline-none bg-transparent px-2 py-2"
                />
              </div>
            </div>

          {/*

            <div className="border-2 border-gray-200 mb-4 rounded-lg">
              <div className="flex flex-col">
                <label htmlFor="calle" className="text-gray-500  px-2">
                  Ingrese su calle
                </label>
                <input
                  type="text"
                  id="calle"
                  name="calle"
                  required
                  onChange={handleChange}
                  value={formData.calle}
                  className="outline-none bg-transparent px-2 py-2"
                />
              </div>
            </div>


            <div className="border-2 border-gray-200 mb-4 rounded-lg">
              <div className="flex flex-col">
                <label
                  htmlFor="num_casa"
                  className="text-gray-500  px-2"
                >
                  Ingrese su número de casa
                </label>
                <input
                  type="text"
                  id="num_casa"
                  name="num_casa"
                  required
                  onChange={handleChange}
                  value={formData.num_casa}
                  className="outline-none bg-transparent px-2 py-2"
                />
              </div>
            </div>


            <div className="border-2 border-gray-200 mb-4 rounded-lg">
              <div className="flex flex-col">
                <label
                  htmlFor="num_apar"
                  className="text-gray-500  px-2"
                >
                  Ingrese su número de apartamento
                </label>
                <input
                  type="text"
                  id="num_apar"
                  name="num_apar"
                  required
                  onChange={handleChange}
                  value={formData.num_apar}
                  className="outline-none bg-transparent px-2 py-2"
                />
              </div>
            </div>
*/}
            <div className="border-2 border-gray-200 mb-4 rounded-lg">
              <div className="flex flex-col">
                <label
                  htmlFor="tipo_trabajo"
                  value={tipoTrabajo}
                  onChange={(e) => setTipoTrabajo(e.target.value)}
                  className="text-gray-500  px-2"
                >
                  Selecione el Area de trabajo
                </label>
                <select
                   className="text-gray-800 p-2 rounded-md focus:outline-none focus:ring-2" 
                  id="tipo_trabajo"
                >
                    <option value="Sin area designada" className="bg-gray-200 text-gray-800">Sin área designada</option>
                    <option value="Peluqueria" className='bg-gray-200 text-gray-800'>Peluqueria</option>
                    <option value="Psicologia" className='bg-gray-200 text-gray-800'>Psicologia</option>
                    <option value="Podologia" className='bg-gray-200 text-gray-800'>Podologia</option>
                    <option value="Kinesiologia" className='bg-gray-200 text-gray-800'>Kinesiologia</option>  
                    <option value="Fonoaudiologia" className='bg-gray-200 text-gray-800'>Fonoaudiologia</option>
                    <option value="Asesoria Juridica" className='bg-gray-200 text-gray-800'>Asesoria Juridica</option>
                </select>
              </div>
            </div>

            <div className="border-2 border-gray-200 mb-4 rounded-lg">
              <div className="flex flex-col">
                <label
                  htmlFor="num_casa"
                  className="text-gray-500  px-2"
                >
                  Ingrese Correo Electronico
                </label>
                <input
                  type="text"
                  id="num_casa"
                  name="num_casa"
                  required
                  onChange={handleChange}
                  value={formData.num_casa}
                  className="outline-none bg-transparent px-2 py-2"
                />
              </div>
            </div>
          </div>



          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full md:w-[350px] bg-[#E74C3C] border border-[#E74C3C] text-[#EBF5FB] py-2 px-4 rounded-lg font-bold hover:bg-red-600"
            >
              Registrar Trabajador
            </button>
          </div>
        </form>
      </div>
      <div className="w-[50%] py-4 gap-2 mt-8 space-y-2 flex flex-col justify-center items-center bg-white rounded-lg shadow-lg">
        {errors.rut && (
          <p className="text-red-500 text-sm px-2 max-w-[550px] border-l-4 border-red-500 pl-2">
            {errors.rut}
          </p>
        )}
        {errors.primer_nombre && (
          <p className="text-red-500 text-sm px-2 max-w-[550px] border-l-4 border-red-500 pl-2">
            {errors.primer_nombre}
          </p>
        )}
        {errors.segundo_nombre && (
          <p className="text-red-500 text-sm px-2 max-w-[550px] border-l-4 border-red-500 pl-2">
            {errors.segundo_nombre}
          </p>
        )}
        {errors.primer_apellido && (
          <p className="text-red-500 text-sm px-2 max-w-[550px] border-l-4 border-red-500 pl-2">
            {errors.primer_apellido}
          </p>
        )}
        {errors.segundo_apellido && (
          <p className="text-red-500 text-sm px-2 max-w-[550px] border-l-4 border-red-500 pl-2">
            {errors.segundo_apellido}
          </p>
        )}
        {errors.correo_electronico && (
          <p className="text-red-500 text-sm px-2 max-w-[550px] border-l-4 border-red-500 pl-2">
            {errors.correo_electronico}
          </p>
        )}
        {errors.tel && (
          <p className="text-red-500 text-sm px-2 max-w-[550px] border-l-4 border-red-500 pl-2">
            {errors.tel}
          </p>
        )}
      </div>

    </div>
  );
};

export default RegistrarTrabajador;
