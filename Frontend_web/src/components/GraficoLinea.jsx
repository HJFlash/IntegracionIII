import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GraficoLinea = () => {
    const [data, setData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/obtener-datos-graficos-linea/?year=${selectedYear}`);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchData();
    }, [selectedYear]);

    return (
        <div className="w-full p-6 bg-white rounded-lg shadow-lg">
            <p className="text-xl font-semibold text-gray-800 mb-4">Gráfico de solicitudes mensuales</p>

            <div className="mb-4">
                <label htmlFor="year" className="mr-2">Seleccionar Año:</label>
                <select 
                    id="year" 
                    value={selectedYear} 
                    onChange={handleYearChange} 
                    className="p-2 border border-gray-300 rounded"
                >
                    <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                    <option value={2023}>2023</option>
                    <option value={2022}>2022</option>
                </select>
            </div>

            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="top" align="right" iconType="line" />
                    <Line type="monotone" dataKey="cantidad_hombres" stroke="#8884d8" name="Hombres" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="cantidad_mujeres" stroke="#82ca9d" name="Mujeres" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GraficoLinea;
