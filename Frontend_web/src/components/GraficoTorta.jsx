import React, { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

export const GraficoTorta = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/obtener-datos-grafico/');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    
    const colors = [
        "#e67e22",
        "#FFDFBA",
        "#bb8fce",
        "#BAFFC9",
        "#BAE1FF",
        "#2ecc71",
        "#FFABAB",
    ];

    // Función para personalizar el contenido del tooltip
    const renderTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <p>{`Solicitud: ${payload[0].payload.t_consulta || 'Sin dato'}`}</p>
                    <p>{`Cantidad de Solicitudes: ${payload[0].payload.cantidad}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="40%" aspect={2}>
            <PieChart>
                <Pie
                    dataKey="cantidad"
                    data={data}
                    innerRadius={60}
                    outerRadius={80}
                    fill='#34495e'
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
                <Tooltip content={renderTooltip} />
            </PieChart>
        </ResponsiveContainer>
    );
}

export default GraficoTorta;
