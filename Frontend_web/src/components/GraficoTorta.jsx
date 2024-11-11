import React, { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts';

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

    const legendData = data.map((entry, index) => ({
        value: entry.t_consulta || 'sin datos',
        color: colors[index % colors.length]
    }))

    return (
        <div className="w-[400px] p-6 bg-white rounded-lg shadow-lg my-5">
            <p className="text-xl font-semibold text-gray-800 mb-4">Gráfico de solicitudes mensuales</p>
            <div>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            dataKey="cantidad"
                            data={data}
                            innerRadius={60}
                            outerRadius={80}
                            fill="#34495e"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        <Legend
                            layout="horizontal"
                            align="right"
                            verticalAlign="top"
                            wrapperStyle={{ padding: 10, marginTop: '20px' }}
                            iconType="circle"
                            iconSize={10}
                            payload={legendData}
                        />
                        <Tooltip content={renderTooltip} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default GraficoTorta;
