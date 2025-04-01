import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from 'react-select';
import SearchComponent from "../SearchComponent";
import "../styles/LandingPage.css";

export default function LandingPage({ isAdmin, setIsAdmin }) {
  const navigate = useNavigate();

  // Add Athlete Modal states
  const [showAddAthleteModal, setShowAddAthleteModal] = useState(false);
  const [newAthlete, setNewAthlete] = useState({
    name: '',
    sex: '',
    age: '',
    height: '',
    weight: '',
    noc: ''
  });

  // Delete Data Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCriteria, setDeleteCriteria] = useState({
    type: 'athlete',
    id: '',
    name: '',
    confirmation: ''
  });

  // State for dynamically fetched data
  const [dataOptions, setDataOptions] = useState({
    athlete: [],
    event: [],
    region: []
  });

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [athleteRes, eventRes, regionRes] = await Promise.all([
          fetch('http://localhost:5000/api/getAthletes'),
          fetch('http://localhost:5000/api/getRegions'),
          fetch('http://localhost:5000/api/getEvents')
        ]);

        const [athletes, events, regions] = await Promise.all([
          athleteRes.json(),
          eventRes.json(),
          regionRes.json()
        ]);
        setDataOptions({
          athlete: athletes,
          event: events,
          region: regions
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    setIsAdmin(false);
    navigate("/");
  };

  // Add Athlete handlers
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
    const athleteData = {
      name: newAthlete.name,
      sex: newAthlete.sex,
      age: newAthlete.age,
      height: newAthlete.height,
      weight: newAthlete.weight,
      noc: newAthlete.noc
    };

    try {
      const response = await fetch('http://localhost:5000/api/insertAthlete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(athleteData),
      });

      if (response.ok) {
        alert('New Athlete inserted!');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Insert failed');
      }

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

  const handleDeleteDataClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteInputChange = (e) => {
    const { name, value } = e.target;
    setDeleteCriteria(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'type' && { name: '' })
    }));
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    const deleteData = {
      type: deleteCriteria.type,
      id: deleteCriteria.id,
      name: deleteCriteria.name
    };

    try {
      const response = await fetch(`http://localhost:5000/api/delete${deleteCriteria.type}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deleteData),
      });

      if (response.ok) {
        alert(`${deleteCriteria.name} (${deleteCriteria.type}) deleted successfully!`);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Delete failed');
      }

      setShowDeleteModal(false);
      setDeleteCriteria({
        type: 'athlete',
        id: '',
        name: '',
        confirmation: ''
      });
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Failed to delete data");
    }
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
        <SearchComponent />
        {isAdmin && (
          <div className="admin-controls">
            <h2>Admin Controls</h2>
            <div className="admin-buttons-container">
              <button className="admin-button" onClick={handleAddAthleteClick}>
                Add Athlete
              </button>
              <button className="admin-button">Modify Records</button>
              <button className="admin-button" onClick={handleDeleteDataClick}>
                Delete Data
              </button>
            </div>
          </div>
        )}
      </div>
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
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Delete Data</h3>
            <div className="danger-text">Warning: This action cannot be undone</div>
            <form onSubmit={handleDeleteSubmit}>
              <div className="form-group">
                <label>Data Type:</label>
                <select
                  name="type"
                  value={deleteCriteria.type}
                  onChange={handleDeleteInputChange}
                  className="delete-select"
                  required
                >
                  <option value="athlete">Athlete</option>
                  <option value="event">Event</option>
                  <option value="region">Region</option>
                </select>
              </div>
              <div className="form-group">
                <label>Select {deleteCriteria.type} to Delete:</label>
                <Select
                  options={dataOptions[deleteCriteria.type]?.map(item => ({
                    value: item.id,
                    label: item.name
                  })) || []}
                  value={dataOptions[deleteCriteria.type]?.map(item => ({
                    value: item.id,
                    label: item.name
                  })).find(option => option.value === deleteCriteria.id)}
                  onChange={(selectedOption) =>
                    setDeleteCriteria(prev => ({
                      ...prev,
                      id: selectedOption?.value || '',
                      name: selectedOption?.label || ''
                    }))
                  }
                  isDisabled={!deleteCriteria.type}
                  placeholder={`-- Select ${deleteCriteria.type} --`}
                  isSearchable
                />
              </div>
              <div className="form-group">
                <label>Type "DELETE" to confirm:</label>
                <input
                  type="text"
                  name="confirmation"
                  value={deleteCriteria.confirmation}
                  onChange={handleDeleteInputChange}
                  placeholder="Type DELETE to confirm"
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="delete-button"
                  disabled={!deleteCriteria.name || deleteCriteria.confirmation !== "DELETE"}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}