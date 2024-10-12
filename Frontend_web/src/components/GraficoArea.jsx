import React from 'react'
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const GraficoArea = () => {
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
        <AreaChart            
            data={data}
            width={500}  
            height={300}
            margin={
                {top:10,right:30,left:0,bottom:0}
            }> 

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name"/>
        <YAxis />
        <Tooltip/> 
        <Legend/>
        <Area type="monotone" stackId="1" dataKey="weigh" fill='#52be80'/>
        <Area type="monotone" stackId="2" dataKey="age" fill='#f7dc6f'/>

        </AreaChart>
    </ResponsiveContainer>
  )
}

export default GraficoArea