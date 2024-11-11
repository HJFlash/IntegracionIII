import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GraficoLinea = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/obtener-datos-graficos-linea/');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full p-6 bg-white rounded-lg shadow-lg">
            <p className="text-xl font-semibold text-gray-800 mb-4">Grafico de solicitudes mensuales</p>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" tick={{fontSize: 10}} angle={-30}  textAnchor="end"/>
                    <YAxis />
                    <Tooltip />
                    <Legend 
                        verticalAlign="top" 
                        align="right" 
                        iconType="line"
                    />
                    <Line type="monotone" dataKey="cantidad_hombres" stroke="#8884d8" name="Hombres"  activeDot={{ r: 8 }}/>
                    <Line type="monotone" dataKey="cantidad_mujeres" stroke="#82ca9d" name="Mujeres"  activeDot={{ r: 8 }}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GraficoLinea;
