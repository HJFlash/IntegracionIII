import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const GraficoBarrasMes = () => {
    const [data, setData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

    const months = [
        { value: 1, label: "Enero" },
        { value: 2, label: "Febrero" },
        { value: 3, label: "Marzo" },
        { value: 4, label: "Abril" },
        { value: 5, label: "Mayo" },
        { value: 6, label: "Junio" },
        { value: 7, label: "Julio" },
        { value: 8, label: "Agosto" },
        { value: 9, label: "Septiembre" },
        { value: 10, label: "Octubre" },
        { value: 11, label: "Noviembre" },
        { value: 12, label: "Diciembre" }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/obtener-datos-graficos-barra-mes/?month=${selectedMonth}`);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [selectedMonth]);

    return (
        <div className="p-6 w-full bg-white rounded-lg shadow-lg my-5">
            

            <div className="mb-4">
                <label htmlFor="month" className="mr-2">Selecciona el mes:</label>
                <select
                    id="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="p-2 border rounded"
                >
                    {months.map(month => (
                        <option key={month.value} value={month.value}>
                            {month.label} del {new Date().getFullYear()}
                        </option>
                    ))}
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

export default GraficoBarrasMes;
