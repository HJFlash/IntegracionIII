import { useEffect } from 'react';

const PingHandler = () => {
    useEffect(() => {
        const interval = setInterval(() => {
            const token = localStorage.getItem('access_token'); // Obtén el token JWT desde localStorage
            if (!token) {
                console.error('No hay token de acceso disponible. La sesión puede haber expirado.');
                return;
            }

            fetch('http://localhost:8000/ping/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Agrega el token JWT al encabezado
                },
                body: JSON.stringify({}) // Enviar un cuerpo vacío si es necesario
            })
            .then(response => {
                if (!response.ok) {
                    console.error('Ping falló. Tal vez la sesión expiró o el servidor no respondió.');
                } else {
                    console.log('Ping exitoso');
                }
            })
            .catch(err => console.error('Error en el ping:', err));
        }, 10000); // Enviar un ping cada 10 segundos

        return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
    }, []);

    return null; // No renderiza nada en pantalla
};

export default PingHandler;