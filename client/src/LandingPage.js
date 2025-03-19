import { useState } from "react";
import "./styles/LandingPage.css";

export default function LandingPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    console.log("Search query:", query);
    setResults(["This is how the results will show up. Test for search query and now we just integrate queries with the backend."]);
  };

  return (
    <div className="container">
      <div className="overlay"></div>

      {/* Main Content */}
      <div className="content">
        <h1 className="title">Olympic Athlete Database</h1>
        <p className="subtitle">
          Search and explore data about Olympic athletes, events, and records.
        </p>

        {/* Search Bar */}
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

        {/* Search Results */}
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
        </div>

        {/* Data Visualization Placeholder */}
        <div className="visualization-container">
          <h2 className="visualization-title">Data Visualization</h2>
          <p className="visualization-text">
            This is where the data visualization on Olympic athletes will show up.
          </p>
        </div>
      </div>
    </div>
  );
}