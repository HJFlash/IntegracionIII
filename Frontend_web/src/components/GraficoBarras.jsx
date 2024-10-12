import React from 'react';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';


const GraficoBarras = () => {
    const data = [
        { name: "maria", age: "10", weigh: 60 },
        { name: "pedro", age: "12", weigh: 55 },
        { name: "luisa", age: "9", weigh: 50 },
        { name: "jose", age: "11", weigh: 62 },
        { name: "sofia", age: "8", weigh: 48 },
        { name: "carlos", age: "13", weigh: 70 },
    ];

  return (
    <ResponsiveContainer width="40%" aspect={2}>
        <BarChart 
            data={data}
            width={500}  
            height={300}
            margin={
                {top:5,right:30,left:20,bottom:5}
            }> 

        <CartesianGrid strokeDasharray="4 1 2" />
        <XAxis dataKey="name"/>
        <YAxis />
        <Tooltip/> 
        <Legend/>
        <Bar dataKey="weigh" fill='#52be80'/>
        <Bar dataKey="age" fill='#f7dc6f'/>
        
        </BarChart>
    </ResponsiveContainer>
  )
}

export default GraficoBarras