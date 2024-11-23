import React, { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

export const AsistenciaTortaConsultorio = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/obtener-datos-grafico-asistencia-consultorio/');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const consultorioN = {
        '1': 'Avenida Alemania',
        '2': 'Bulnes 875',
        '3': 'Centro Comunitario Amanecer',
        '4': 'Centro Comunitario Lanín',
        '5': 'Centro Comunitario Pedro de Valdivia',
        '6': 'Centro Comunitario Santa Rosa',
        '7': 'Delegación Labranza',
    };

    const colors = [
        "#58d68d",
        "#e74c3c",
    ];
    const renderTooltip = ({ payload }) => {
        if (payload && payload.length) {
            const { name, value } = payload[0];
            return <div>{`${name}: ${value}`}</div>;
        }
        return null;
    };

    return (
        <div>
            <h3 className='font-semibold text-lg flex justify-center '>Asistencia por sede</h3>
            <div className='grid grid-cols-3 gap-3'>
                {data.map((entry) => {
                    const total = entry.si + entry.no;
                    const siPercentage = total ? ((entry.si / total) * 100).toFixed(1) : 0;
                    const noPercentage = total ? ((entry.no / total) * 100).toFixed(1) : 0;

                    return (
                        <div key={entry.consultorio} className="grid w-[250px] p-3 bg-white rounded-lg shadow-lg my-5">
                            <p className='flex justify-center items-center  text-center font-bold'>Sede {consultorioN[entry.consultorio]}</p>
                            <div className='flex justify-center items-center p-1'>
                                <div className='flex justify-center items-center p-1 mx-1 rounded-lg bg-green-200'>
                                    <span className="font-bold text-lg text-green-600 mx-1">Sí</span>
                                    <span className="text-sm text-green-800">{siPercentage}%</span>
                                </div>
                                <div className='flex justify-center items-center p-1 mx-1 rounded-lg bg-red-200'>
                                    <span className="font-bold text-lg text-red-600 mx-1">No</span>
                                    <span className="text-sm text-red-800">{noPercentage}%</span>
                                </div>
                            </div>
                            <ResponsiveContainer width="100%" height={160}>
                                <PieChart>
                                    <Pie
                                        dataKey="cantidad"
                                        data={[
                                            { name: "Sí", cantidad: entry.si },
                                            { name: "No", cantidad: entry.no },
                                        ]}
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#34495e"
                                    >
                                        <Cell fill={colors[0]} />
                                        <Cell fill={colors[1]} />
                                    </Pie>
                                    <Tooltip content={renderTooltip} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AsistenciaTortaConsultorio;