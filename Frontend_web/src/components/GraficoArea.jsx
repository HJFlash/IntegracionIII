import React, { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const GraficoArea = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/obtener-datos-graficos-area/');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <AreaChart
                data={data}
                width={500}
                height={300}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="hombres" stroke="#52be80" fill="#52be80" />
                <Area type="monotone" dataKey="mujeres" stroke="#f7dc6f" fill="#f7dc6f" />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default GraficoArea;
