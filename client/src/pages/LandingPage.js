import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import "../styles/LandingPage.css";

export default function LandingPage({ isAdmin, setIsAdmin }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log("Search query:", query);
    // Hardcoded sample data for demonstration
    setResults(["Usain Bolt"]); // Example result
    setChartData([
      { event: "100m", medals: 3 },
      { event: "200m", medals: 3 },
      { event: "4x100m Relay", medals: 2 },
    ]);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="overlay"></div>

      {!isAdmin ? (
        <Link to="/login" className="auth-button">
          Log in as Administrator
        </Link>
      ) : (
        <button onClick={handleLogout} className="auth-button">
          Logout
        </button>
      )}

      <div className="content">
        <h1 className="title">Olympic Athlete Database</h1>
        <p className="subtitle">
          Search and explore data about Olympic athletes, events, and records.
        </p>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search athletes, sports, or years..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            🔍 Search
          </button>
        </div>

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

        {isAdmin && (
          <div className="admin-controls">
            <h2>Admin Controls</h2>
            <button className="admin-button">Add Athlete</button>
            <button className="admin-button">Modify Records</button>
            <button className="admin-button">Delete Data</button>
          </div>
        )}
      </div>
    </div>
  );
}