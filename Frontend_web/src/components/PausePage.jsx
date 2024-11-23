import React from 'react';
import { useNavigate } from 'react-router-dom';

const PausePage = () => {
    const navigate = useNavigate();

    const handleReturn = () => {
        navigate('/'); // Redirige al usuario al inicio
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>¡Tómate un descanso!</h1>
            <p>Has excedido el tiempo máximo de uso. Por favor, toma un descanso.</p>
            <button onClick={handleReturn}>Volver al inicio</button>
        </div>
    );
};

export default PausePage;
