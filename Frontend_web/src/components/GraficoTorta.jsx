import React from 'react';
import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from 'recharts';




export const GraficoTorta = () => {
    const data = [
        { name: "Grupo A", Value: 2000 },
        { name: "Grupo B", Value: 1500 },
        { name: "Grupo C", Value: 3000 },
        { name: "Grupo D", Value: 2500 },
        { name: "Grupo E", Value: 1800 },
        { name: "Grupo F", Value: 2200 },
    ];


    const colors = [
        "#FFB3BA", // Rosa pastel
        "#FFDFBA", // Amarillo pastel
        "#FFFABA", // Amarillo suave
        "#BAFFC9", // Verde pastel
        "#BAE1FF", // Azul pastel
        "#FFABAB", // Rojo claro pastel
    ];

    return (
    <ResponsiveContainer aspect={2}>
        <PieChart>
            <Pie
                dataKey="Value"
                data={data}
                innerRadius={60}
                outerRadius={80}
                fill='#34495e'
            >
                {data.map((entry, index) =>(
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
                ))}
            <Tooltip/>
            </Pie> 
        </PieChart>
    </ResponsiveContainer>
  )
}

export default GraficoTorta;