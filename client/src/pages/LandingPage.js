import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";

export default function LandingPage({ isAdmin, setIsAdmin }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const [showAddAthleteModal, setShowAddAthleteModal] = useState(false);
  const [newAthlete, setNewAthlete] = useState({
    name: '',
    sex: '',
    age: '',
    height: '',
    weight: '',
    noc: ''
  });

  const handleSearch = () => {
    console.log("Search query:", query);
    setResults(["This is how the results will show up. Test for search query and now we just integrate queries with the backend."]);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    navigate("/");
  };

  const handleAddAthleteClick = () => {
    setShowAddAthleteModal(true);
  };

  const handleAthleteInputChange = (e) => {
    const { name, value } = e.target;
    setNewAthlete(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitAthlete = async (e) => {
    e.preventDefault();
    console.log("Submitting new athlete:", newAthlete);
    
    try {
      // API call here
      // const response = await fetch(...)
      alert("Athlete added successfully!");
      setShowAddAthleteModal(false);
      setNewAthlete({
        name: '',
        sex: '',
        age: '',
        height: '',
        weight: '',
        noc: ''
      });
    } catch (error) {
      console.error("Error adding athlete:", error);
      alert("Failed to add athlete");
    }
  };

  return (
    <div className="container">
      <div className="overlay"></div>

      {/* Authentication button */}
      {!isAdmin ? (
        <Link to="/login" className="auth-button">Log in as Administrator</Link>
      ) : (
        <button onClick={handleLogout} className="auth-button">Logout</button>
      )}

      <div className="content">
        <h1 className="title">Olympic Athlete Database</h1>
        <p className="subtitle">
          Search and explore data about Olympic athletes, events, and records.
        </p>

        {/* Search section */}
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

        {/* Results section */}
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

        {/* Admin Controls section */}
        {isAdmin && (
          <div className="admin-controls">
            <h2>Admin Controls</h2>
            <div className="admin-buttons-container">
              <button className="admin-button" onClick={handleAddAthleteClick}>
                Add Athlete
              </button>
              <button className="admin-button">Modify Records</button>
              <button className="admin-button">Delete Data</button>
            </div>
          </div>
        )}
      </div>

      {/* Add Athlete Modal */}
      {showAddAthleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Athlete</h3>
            <form onSubmit={handleSubmitAthlete}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={newAthlete.name}
                    onChange={handleAthleteInputChange}
                    maxLength="255"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Sex (M/F):</label>
                  <input
                    type="text"
                    name="sex"
                    value={newAthlete.sex}
                    onChange={handleAthleteInputChange}
                    maxLength="1"
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Age:</label>
                  <input
                    type="number"
                    name="age"
                    value={newAthlete.age}
                    onChange={handleAthleteInputChange}
                    step="0.1"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Height:</label>
                  <input
                    type="number"
                    name="height"
                    value={newAthlete.height}
                    onChange={handleAthleteInputChange}
                    step="0.1"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Weight:</label>
                  <input
                    type="number"
                    name="weight"
                    value={newAthlete.weight}
                    onChange={handleAthleteInputChange}
                    step="0.1"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>NOC (3-letter code):</label>
                <input
                  type="text"
                  name="noc"
                  value={newAthlete.noc}
                  onChange={handleAthleteInputChange}
                  maxLength="3"
                  required
                />
              </div>
              
              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={() => setShowAddAthleteModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}