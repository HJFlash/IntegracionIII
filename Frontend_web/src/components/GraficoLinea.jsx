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
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
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
    );
};

export default GraficoLinea;
