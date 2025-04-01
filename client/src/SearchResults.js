import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SearchResults = ({ results, chartData }) => (
  <div className="results-container">
    <h2 className="results-title">Results</h2>
    <ul>
      {results.length > 0 ? (
        results.map((result, index) => (
          <li key={index} className="result-item">{result}</li>
        ))
      ) : (
        <p className="no-results">No results found.</p>
      )}
    </ul>

    {chartData.length > 0 && (
      <div className="chart-container">
        <h3>Medal Wins by Event</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="event" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="medals" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )}
  </div>
);

export default SearchResults;
