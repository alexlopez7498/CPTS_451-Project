import { useState } from "react";
import GraphComponent from "./GraphComponent";

export default function SearchComponent() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("athlete");
  const [results, setResults] = useState([]);
  const [chartData, setChartData] = useState([]);

  const handleSearch = () => {
    if (searchType === "athlete" && query.toLowerCase() === "usain bolt") {
      setResults(["Usain Bolt"]);
      setChartData([
        { event: "100m", medals: 3 },
        { event: "200m", medals: 3 },
        { event: "4x100m Relay", medals: 2 },
      ]);
    } else if (searchType === "event" && query.toLowerCase() === "men's basketball") {
      setResults(["Men's Basketball"]);
      setChartData([
        { team: "USA", golds: 15 },
        { team: "Soviet Union", golds: 2 },
        { team: "Yugoslavia", golds: 1 },
        { team: "Argentina", golds: 1 },
      ]);
    } else if (searchType === "year" && query === "2004") {
      setResults(["2004 Olympics"]);
      setChartData([
        { country: "USA", medals: 101 },
        { country: "China", medals: 63 },
        { country: "Russia", medals: 90 },
        { country: "Australia", medals: 49 },
        { country: "Germany", medals: 41 },
      ]);
    } else {
      setResults([]);
      setChartData([]);
    }
  };

  const createQuery = (searchType, query) => {
    let dbQuery = ''
    if (searchType === 'athelete') {
      dbQuery = 'SELECT Sport, Event, SUM(Medal) FROM Athlete, Event, Athlete_Event WHERE Athlete.ID = Athlete_Event.ID AND Event.E_Id = Athlete_Event.E_Id AND LOWER(Name) = ' + query.toLowerCase() + ' GROUP BY Sport, Event'
    } else if (searchType === 'event') {
      dbQuery = 'SELECT Team, SUM(Medal) FROM Athlete, Event, Athlete_Event, Team, Athlete_Team WHERE Athlete.ID = Athlete_Event.ID AND Event.E_Id = Athlete_Event.E_Id AND Athlete.ID = Athelete_Team.ID AND Athlete_Team.T_Id = Team.T_Id AND LOWER(Event) = ' + query.toLowerCase() + ' GROUP BY Team'
    } else if (searchType === 'year') {
      dbQuery = 'SELECT Region, SUM(Medal) FROM Athlete, Event, Athlete_Event, Region, Athlete_Region WHERE Athlete.ID = Athlete_Event.ID AND Event.E_Id = Athlete_Event.E_Id AND Athlete.ID = Athlete_Region.ID AND Athlete_Region.NOC = Region.NOC AND LOWER(Year) = ' + query.toLowerCase() + ' GROUP BY Region'
    }
    return dbQuery
  }

  // const handleSearch = () => {
  //   const [query, setQuery] = useState("");
  //   const [searchType, setSearchType] = useState("athlete");
  //   const [results, setResults] = useState([]);
  //   const [chartData, setChartData] = useState([]);
  //   const dbQuery = createQuery(searchType, query);

  //   // send dbQuery

  //   // if no results
  //   setResults([]);
  //   setChartData([]);
  //   //else
  //   if (searchType === 'athelete') {
  //     setResults([query])
  //     setChartData([]) // input dbQuery data
  //   } else if (searchType === 'event') {
  //     setResults([query])
  //     setChartData([]) // input dbQuery data
  //   } else if (searchType === 'year') {
  //     setResults([query + ' Olympics'])
  //     setChartData([]) // input dbQuery data
  //   }
  // }

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