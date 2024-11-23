import React, { useState } from 'react';

const ServiceCard = ({ image, servicio, descripcion, duracion, cost }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-80 mx-4 mb-8 transform transition duracion-300 hover:scale-105">
      <img 
        src={image} 
        alt={servicio} 
        className="h-40 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{servicio}</h3>
        <button 
          className="text-blue-500 hover:text-blue-600 focus:outline-none" 
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Ocultar información' : 'Más información'}
        </button>

        {showDetails && (
          <div className="mt-4 text-gray-700">
            <p className="mb-2">{descripcion}</p>
            <p><strong>Duración:</strong> {duracion}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ServiceCards = () => {
  const Servicios = [
    {
        servicio: 'Podología',
        image: 'https://via.placeholder.com/300x200',
        descripcion: 'Servicio de podología está diseñado para atender las necesidades específicas de los pies de los adultos mayores. Con un enfoque en la salud y el bienestar. Este servicio ayuda a prevenir problemas que pueden afectar la movilidad y calidad de vida.',
        duracion: '30 minutos',
    },
    {
        servicio: 'Peluquería',
        image: 'https://via.placeholder.com/300x200',
        descripcion: 'Servicios de peluquería adaptados a las preferencias y necesidades de los adultos mayores.',
        duracion: '20 minutos',
    },
    {
        servicio: 'Asesoría Jurídica',
        image: 'https://via.placeholder.com/300x200',
        descripcion: 'Servicio de asesoría jurídica se especializa en brindar orientación legal a adultos mayores en temas como herencias, testamentos y derechos de los ancianos.',
        duracion: '45 minutos',
    },
    {
        servicio: 'kinesiologia',
        image: 'https://via.placeholder.com/300x200',
        descripcion: 'Servicio de kinesiología está orientado a ayudar a los adultos mayores a mantener y mejorar su movilidad.',
        duracion: '30 minutos',
    },
    {
        servicio: 'Psicología',
        image: 'https://via.placeholder.com/300x200',
        descripcion: 'Servicio de psicología ofrece sesiones individuales para abordar temas como la soledad, la adaptación a cambios en la vida y la gestión del estrés. ',
        duracion: '1 hora',
    },
    {
        servicio: 'Fonoaudiología',
        image: 'https://via.placeholder.com/300x200',
        descripcion: 'Servicio de fonoaudiología se centra en mejorar la comunicación y audicion',
        duracion: '20 minutos',
    },
  ];

  return (
    <div className="flex flex-wrap justify-center">
      {Servicios.map((service, index) => (
        <ServiceCard 
          key={index}
          image={service.image}
          servicio={service.servicio}
          descripcion={service.descripcion}
          duracion={service.duracion}
        />
      ))}
    </div>
  );
};

export default ServiceCards;
