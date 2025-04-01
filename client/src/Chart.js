// import React from 'react';
// import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// const Chart = ({ chartData, title }) => (
//   <div className="chart-container">
//     <h3>{title}</h3>
//     <ResponsiveContainer width="100%" height={300}>
//       <BarChart data={chartData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="event" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="medals" fill="#8884d8" />
//       </BarChart>
//     </ResponsiveContainer>
//   </div>
// );

// export default Chart;


import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

export default function Chart({ chartData }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="medals" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
