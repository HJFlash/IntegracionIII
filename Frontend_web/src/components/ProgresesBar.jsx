import React, { useEffect, useState } from 'react';

function ProgressBar() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/obtener-datos-barra-asistencia/');
        const result = await response.json();
        console.log('API Response:', result);
        setData(result.values);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setData([]); 
      }
    };
  
    fetchData();
  }, []);

  if (data.length === 0) {
    return <div>Cargando...</div>;
  }

  const total = data.reduce((sum, value) => sum + value.value, 0);

  return (
    <div className='w-[400px] m-4 p-6 bg-white rounded-lg shadow-lg'>
      <h1>Porcentaje de Asistencia General</h1>
      <div className="flex w-full h-5 rounded-lg overflow-hidden">
        {data.map((value, index) => {
          const percentage = (value.value / total) * 100; // Calcular porcentaje
          return (
            <div
              key={index}
              style={{ width: `${percentage}%`, backgroundColor: value.color }}
              className="flex items-center justify-center"
            >
              <span className="text-white font-semibold text-xs px-2">
                {percentage.toFixed(1)}%
              </span>
            </div>
          );
        })}
        
      </div>

      <div className='flex items-center gap-2 py-2'>
          <div className='bg-[#e74c3c] w-[15px] h-[15px]'></div>
          <p>No Asistieron</p>
        </div>
        <div className='flex items-center gap-2'>
          <div className='bg-[#58d68d] w-[15px] h-[15px]'></div>
          <p>Asistieron</p>
        </div>
      <div>

      </div>
    </div>
  );
}

export default ProgressBar;
