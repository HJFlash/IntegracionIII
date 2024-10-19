import React, { useState } from "react";

const RegistrarTrabajador = () => {
  const [formData, setFormData] = useState({
    rut: "",
    nombres: "",
    apellidos: "",
    contrasena: "",
    contacto: "",
    servicio: "",
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

    const dataToSend = {
      rut: formData.rut,
      nombres: formData.nombres,
      apellidos: formData.apellidos,
      contrasena: formData.contrasena,
      contacto: formData.contacto,
      servicio: formData.servicio,
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
    <div>
      <div className="w-[90%] max-w-full mx-auto border-2 p-6">
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
                <label htmlFor="nombres" className="text-gray-500  px-2">
                  Ingrese sus nombres
                </label>
                <input
                  type="text"
                  id="nombres"
                  name="nombres"
                  required
                  onChange={handleChange}
                  value={formData.nombres}
                  className="outline-none bg-transparent px-2 py-2"
                />
              </div>
            </div>


            <div className="border-2 border-gray-200 mb-4 rounded-lg">
              <div className="flex flex-col">
                <label
                  htmlFor="apellidos"
                  className="text-gray-500  px-2"
                >
                  Ingrese sus apellidos
                </label>
                <input
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  required
                  onChange={handleChange}
                  value={formData.apellidos}
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
                  Ingrese su contraseña
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
                  Ingrese su contacto
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


            <div className="border-2 border-gray-200 mb-4 rounded-lg">
              <div className="flex flex-col">
                <label
                  htmlFor="servicio"
                  className="text-gray-500  px-2"
                >
                  Ingrese su servicio
                </label>
                <input
                  type="text"
                  id="servicio"
                  name="servicio"
                  required
                  onChange={handleChange}
                  value={formData.servicio}
                  className="outline-none bg-transparent px-2 py-2"
                />
              </div>
            </div>


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
    </div>
  );
};

export default RegistrarTrabajador;