import React from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PieChartComponent = ({ pieChartData }) => {
    const data = Object.keys(pieChartData).map(category => ({
        name: category,
        value: pieChartData[category]
    }));

    return (
        <div>
            <h2>Pie Chart</h2>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie dataKey="value" data={data} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieChartComponent;
