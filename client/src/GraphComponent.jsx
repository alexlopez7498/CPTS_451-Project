import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export default function GraphComponent({ data, xKey, barKey }) {
  // fatten data if needed
  const chartData = Array.isArray(data) && data.length > 0 && Array.isArray(data[0]) ? data[0] : data;

  // parse and sort to dsc
  const processedData = chartData
    .map(item => ({
      ...item,
      [barKey]: parseInt(item[barKey], 10) || 0, // string to int
      [xKey]: item[xKey] || 'Unknown', // Fallback for missing labels
    }))
    .sort((a, b) => b[barKey] - a[barKey]); // sort by medals/

  // dynamic height
  const chartHeight = Math.max(processedData.length * 50, 600);

  return (
    <div
      className="chart-container w-full mt-4 relative overflow-y-auto bg-white rounded-lg shadow-lg p-4"
      style={{ minHeight: `${chartHeight}px`, maxHeight: '600px' }}
    >
      <h3 className="text-black text-lg font-semibold mb-2">
        {barKey.charAt(0).toUpperCase() + barKey.slice(1)} by {xKey.charAt(0).toUpperCase() + xKey.slice(1)}
      </h3>
      <div style={{ height: `${chartHeight}px`, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={processedData}
            layout="vertical" // horizontal bars
            margin={{ top: 10, right: 30, left: 120, bottom: 20 }} // Increased left margin for long country names
          >
            <XAxis
              type="number"
              stroke="black"
              tick={{ fill: 'black' }}
              label={{
                value: barKey === 'golds' ? 'Gold Medals' : 'Total Medals',
                position: 'bottom',
                fill: 'black',
                offset: 10,
              }}
              interval={0}
            />
            <YAxis
              type="category"
              dataKey={xKey}
              stroke="white"
              tick={{ fill: 'white' }}
              width={110} //wider so country manes fit
              label={{
                value: xKey.charAt(0).toUpperCase() + xKey.slice(1),
                angle: 90,
                position: 'left',
                fill: 'white',
                offset: 20,
              }}
            />
            <Tooltip
              contentStyle={{
                border: '2px solid #000000',
                color: 'black',
              }}
            />

            <Bar
              dataKey={barKey}
              fill="#FFD700" 
              barSize={20} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}