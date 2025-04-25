import { useState } from "react";
import GraphComponent from "./GraphComponent";

export default function SearchComponent() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("athlete");
  const [results, setResults] = useState([]);
  const [chartData, setChartData] = useState([]);

  // const handleSearch = () => {
  //   if (searchType === "athlete" && query.toLowerCase() === "usain bolt") {
  //     setResults(["Usain Bolt"]);
  //     setChartData([
  //       { event: "100m", medals: 3 },
  //       { event: "200m", medals: 3 },
  //       { event: "4x100m Relay", medals: 2 },
  //     ]);
  //   } else if (searchType === "event" && query.toLowerCase() === "men's basketball") {
  //     setResults(["Men's Basketball"]);
  //     setChartData([
  //       { team: "USA", golds: 15 },
  //       { team: "Soviet Union", golds: 2 },
  //       { team: "Yugoslavia", golds: 1 },
  //       { team: "Argentina", golds: 1 },
  //     ]);
  //   } else if (searchType === "year" && query === "2004") {
  //     setResults(["2004 Olympics"]);
  //     setChartData([
  //       { country: "USA", medals: 101 },
  //       { country: "China", medals: 63 },
  //       { country: "Russia", medals: 90 },
  //       { country: "Australia", medals: 49 },
  //       { country: "Germany", medals: 41 },
  //     ]);
  //   } else {
  //     setResults([]);
  //     setChartData([]);
  //   }
  // };

  const handleSearch = async () => {
    // if no results
    setResults([]);
    setChartData([]);
    //else
    if (searchType === 'athlete') {
      const res = await fetch(`http://localhost:5000/api/getAthleteInfo/${query.toLowerCase()}`)
      setResults([query])
      setChartData([res]) // input dbQuery data
    } else if (searchType === 'event') {
      const res = await fetch(`http://localhost:5000/api/getEventInfo/${query.toLowerCase()}`)
      setResults([query])
      setChartData([res]) // input dbQuery data
    } else if (searchType === 'year') {
      const res = await fetch(`http://localhost:5000/api/getYearInfo/${query.toLowerCase()}`)
      setResults([query + ' Olympics'])
      setChartData([res]) // input dbQuery data
    }
  }

  return (
    <div>
      <div className="search-container">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="athlete">Athlete</option>
          <option value="event">Event</option>
          <option value="year">Year</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
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
          <GraphComponent
            data={chartData}
            xKey={searchType === "athlete" ? "event" : searchType === "event" ? "team" : "country"}
            barKey={searchType === "event" ? "golds" : "medals"}
          />
        )}
      </div>
    </div>
  );
}