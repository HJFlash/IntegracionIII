import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const GraficoBarras = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/obtener-datos-graficos-barra/');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="w-[400px] p-6 bg-white rounded-lg shadow-lg my-5">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart 
                    data={data}
                    margin={{ top: 5, right: 30, bottom: 5 }}
                > 
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="t_consulta" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="hombres" fill="#52be80" />
                    <Bar dataKey="mujeres" fill="#f7dc6f" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default GraficoBarras;
