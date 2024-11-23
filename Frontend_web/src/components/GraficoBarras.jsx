import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const GraficoBarras = () => {
    const [data, setData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/obtener-datos-graficos-barra/?year=${selectedYear}`);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [selectedYear]);
    

    return (
        <div className="p-6 w-full bg-white rounded-lg shadow-lg my-5">

            <div className="mb-4">
                <label htmlFor="year" className="mr-2">Selecciona el año:</label>
                <select
                    id="year"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                </select>
            </div>

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
