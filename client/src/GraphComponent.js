import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
  } from "recharts";
  
  export default function GraphComponent({ data, xKey, barKey }) {
    return (
      <div className="chart-container">
        <h3>{barKey.charAt(0).toUpperCase() + barKey.slice(1)} by {xKey}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey}
                interval={0}    // Show all labels
             />
            
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={barKey} fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }