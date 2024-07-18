import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarChartComponent = ({ barChartData, month }) => {
    const data = [
        { name: '0-100', items: barChartData['0-100'] || 0 },
        { name: '101-200', items: barChartData['101-200'] || 0 },
        { name: '201-300', items: barChartData['201-300'] || 0 },
        { name: '301-400', items: barChartData['301-400'] || 0 },
        { name: '401-500', items: barChartData['401-500'] || 0 },
        { name: '501-600', items: barChartData['501-600'] || 0 },
        { name: '601-700', items: barChartData['601-700'] || 0 },
        { name: '701-800', items: barChartData['701-800'] || 0 },
        { name: '801-900', items: barChartData['801-900'] || 0 },
        { name: '901-above', items: barChartData['901-above'] || 0 }
    ];

    return (
        <div>
            <h2>Bar Chart</h2>
            <BarChart width={600} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="items" fill="#8884d8" />
            </BarChart>
        </div>
    );
};

export default BarChartComponent;
