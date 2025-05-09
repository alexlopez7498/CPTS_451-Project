import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from 'react-select';
import SearchComponent from "../SearchComponent";
import "../styles/LandingPage.css";

const PaginatedSearchableDropdown = ({ dataOptions, deleteCriteria, setDeleteCriteria }) => {
  const [page] = useState(0); 
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 100;

  const filteredOptions = (dataOptions[deleteCriteria.type] || []).filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedOptions = filteredOptions.slice(
    page * pageSize,
    (page + 1) * pageSize
  ).map(item => ({
    value: item.value,
    label: item.label,
  }));

  const handleSearchChange = (inputValue) => {
    setSearchQuery(inputValue);
  };

  return (
    <div>
      <Select
        options={paginatedOptions}
        value={paginatedOptions.find(option => option.value === deleteCriteria.id)}
        onChange={(selectedOption) =>
          setDeleteCriteria(prev => ({
            ...prev,
            id: selectedOption?.value || "",
            name: selectedOption?.label || "",
          }))
        }
        onInputChange={handleSearchChange}
        isClearable
        placeholder={`Select ${deleteCriteria.type}...`}
        isSearchable
      />
    </div>
  );
};

const ModifyForm = ({ type, id, onInputChange, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    sex: '',
    age: '',
    height: '',
    weight: '',
    noc: '',
    Event: '',
    Sport: '',
    City: '',
    Season: '',
    Year: '',
    region: '',
    notes: ''
  });

  useEffect(() => {
    const fetchCurrentData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/get${type}/${id}`);
        const data = await response.json();
        
        if (response.ok) {
          const mappedData = {};
          switch (type) {
            case 'athlete':
              mappedData.name = data.name || data.athlete_name || '';
              mappedData.sex = data.sex || '';
              mappedData.age = data.age || '';
              mappedData.height = data.height || '';
              mappedData.weight = data.weight || '';
              mappedData.noc = data.noc || '';
              break;
            case 'event':
              mappedData.Event = data.Event || '';
              mappedData.Sport = data.Sport || '';
              mappedData.City = data.City || '';
              mappedData.Season = data.Season || '';
              mappedData.Year = data.Year || '';
              break;
            case 'region':
              mappedData.noc = data.noc || '';
              mappedData.region = data.region || '';
              mappedData.notes = data.notes || '';
              break;
            default:
              break;
          }
          setFormData(prev => ({ ...prev, ...mappedData }));
        }
      } catch (error) {
        console.error(`Error fetching ${type} data:`, error);
      }
    };

    if (id) {
      fetchCurrentData();
    }
  }, [type, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {type === 'athlete' && (
        <>
          <div className="form-row">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                maxLength="255"
                required
              />
            </div>
            <div className="form-group">
              <label>Sex (M/F):</label>
              <input
                type="text"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
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
                value={formData.age}
                onChange={handleChange}
                step="0.1"
                required
              />
            </div>
            <div className="form-group">
              <label>Height (cm):</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                step="0.1"
                required
              />
            </div>
            <div className="form-group">
              <label>Weight (kg):</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
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
              value={formData.noc}
              onChange={handleChange}
              maxLength="3"
              required
            />
          </div>
        </>
      )}

      {type === 'event' && (
        <>
          <div className="form-group">
            <label>Event Name:</label>
            <input
              type="text"
              name="Event"
              value={formData.Event}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Sport:</label>
            <input
              type="text"
              name="Sport"
              value={formData.Sport}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>City:</label>
              <input
                type="text"
                name="City"
                value={formData.City}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Season:</label>
              <select
                name="Season"
                value={formData.Season}
                onChange={handleChange}
                required
              >
                <option value="">Select Season</option>
                <option value="Summer">Summer</option>
                <option value="Winter">Winter</option>
              </select>
            </div>
            <div className="form-group">
              <label>Year:</label>
              <input
                type="number"
                name="Year"
                value={formData.Year}
                onChange={handleChange}
                min="1896"
                max="2024"
                required
              />
            </div>
          </div>
        </>
      )}

      {type === 'region' && (
        <>
          <div className="form-group">
            <label>NOC Code (3 letters):</label>
            <input
              type="text"
              name="noc"
              value={formData.noc}
              onChange={handleChange}
              maxLength="3"
              required
            />
          </div>
          <div className="form-group">
            <label>Region Name:</label>
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Notes:</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="notes-textarea"
            />
          </div>
        </>
      )}

      <div className="modal-actions">
        <button type="button" className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="modify-button">
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default function LandingPage({ isAdmin, setIsAdmin }) {
  const navigate = useNavigate();
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [modifyCriteria, setModifyCriteria] = useState({
    type: 'athlete',
    id: '',
    name: '',
    confirmation: ''
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [addType, setAddType] = useState('athlete');
  const [newData, setNewData] = useState({
    name: '',
    sex: '',
    age: '',
    height: '',
    weight: '',
    noc: '',
    Event: '',
    Sport: '',
    City: '',
    Season: '',
    Year: '',
    region: '',
    notes: ''
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCriteria, setDeleteCriteria] = useState({
    type: 'athlete',
    id: '',
    name: '',
    confirmation: ''
  });
  const [dataOptions, setDataOptions] = useState({
    athlete: [],
    event: [],
    region: []
  });

  const fetchData = async () => {
    try {
      const [athleteRes, regionRes, eventRes] = await Promise.all([
        fetch('http://localhost:5000/api/getAthletes'),
        fetch('http://localhost:5000/api/getRegions'),
        fetch('http://localhost:5000/api/getEvents')
      ]);

      const [athletes, regions, events] = await Promise.all([
        athleteRes.json(),
        regionRes.json(),
        eventRes.json()
      ]);

      setDataOptions({
        athlete: athletes.map(a => ({
          value: a.id || a.athlete_id,
          label: a.name || a.athlete_name
        })),
        event: events.map(e => ({
          value: e.E_Id,
          label: `${e.Event} (${e.Year})`
        })),
        region: regions.map(r => ({
          value: r.noc,
          label: r.region
        }))
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    navigate("/");
  };

  const handleAddClick = (type) => {
    setAddType(type);
    setShowAddModal(true);
    setNewData({
      name: '',
      sex: '',
      age: '',
      height: '',
      weight: '',
      noc: '',
      Event: '',
      Sport: '',
      City: '',
      Season: '',
      Year: '',
      region: '',
      notes: ''
    });
  };

  const handleNewDataChange = (e) => {
    const { name, value } = e.target;
    setNewData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitNewData = async (e) => {
    e.preventDefault();
    let apiEndpoint = '';
    let requestData = {};

    switch (addType) {
      case 'athlete':
        apiEndpoint = 'insertAthlete';
        requestData = {
          name: newData.name,
          sex: newData.sex,
          age: newData.age,
          height: newData.height,
          weight: newData.weight,
          noc: newData.noc
        };
        break;
      case 'event':
        apiEndpoint = 'insertEvent';
        requestData = {
          eventName: newData.Event,
          sport: newData.Sport,
          city: newData.City,
          season: newData.Season,
          year: newData.Year
        };
        break;
      case 'region':
        apiEndpoint = 'insertRegion';
        requestData = {
          noc: newData.noc,
          region: newData.region,
          notes: newData.notes
        };
        break;
      default:
        break;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/${apiEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        alert(`New ${addType} inserted successfully!`);
        setShowAddModal(false);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Insert failed');
      }
    } catch (error) {
      console.error(`Error adding ${addType}:`, error);
      alert(`Failed to add ${addType}: ${error.message}`);
    }
  };

  const handleModifyRecordsClick = () => {
    fetchData();
    setShowModifyModal(true);
  };

  const handleDeleteDataClick = () => {
    fetchData();
    setShowDeleteModal(true);
  };

  const handleDeleteInputChange = (e) => {
    const { name, value } = e.target;
    setDeleteCriteria(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'type' && { name: '', id: '' })
    }));
  };

  const handleModifyInputChange = (e) => {
    const { name, value } = e.target;
    setModifyCriteria(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'type' && { name: '', id: '' })
    }));
  };

  const handleModifySubmit = async (formData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/modify${modifyCriteria.type}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: modifyCriteria.id,
          ...formData
        }),
      });

      if (response.ok) {
        alert(`${modifyCriteria.name} (${modifyCriteria.type}) modified successfully!`);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Modify failed');
      }

      setShowModifyModal(false);
      setModifyCriteria({
        type: 'athlete',
        id: '',
        name: '',
        confirmation: ''
      });
    } catch (error) {
      console.error("Error modifying data:", error);
      alert(`Failed to modify ${modifyCriteria.type}: ${error.message}`);
    }
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();

    if (deleteCriteria.confirmation !== "DELETE") {
      alert("Please type 'DELETE' to confirm");
      return;
    }

    try {
      let deleteData = {};
      switch (deleteCriteria.type) {
        case 'athlete':
          deleteData = { id: deleteCriteria.id };
          break;
        case 'event':
          deleteData = { E_Id: deleteCriteria.id };
          break;
        case 'region':
          deleteData = { noc: deleteCriteria.id };
          break;
        default:
          throw new Error("Invalid delete type");
      }

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
      alert(`Failed to delete ${deleteCriteria.type}: ${error.message}`);
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
              <button className="admin-button" onClick={() => handleAddClick('athlete')}>
                Add Athlete
              </button>
              <button className="admin-button" onClick={() => handleAddClick('event')}>
                Add Event
              </button>
              <button className="admin-button" onClick={() => handleAddClick('region')}>
                Add Region
              </button>
              <button className="admin-button" onClick={handleModifyRecordsClick}>
                Modify Records
              </button>
              <button className="admin-button" onClick={handleDeleteDataClick}>
                Delete Data
              </button>
            </div>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New {addType.charAt(0).toUpperCase() + addType.slice(1)}</h3>
            <form onSubmit={handleSubmitNewData}>
              {addType === 'athlete' && (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Name:</label>
                      <input
                        type="text"
                        name="name"
                        value={newData.name}
                        onChange={handleNewDataChange}
                        maxLength="255"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Sex (M/F):</label>
                      <input
                        type="text"
                        name="sex"
                        value={newData.sex}
                        onChange={handleNewDataChange}
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
                        value={newData.age}
                        onChange={handleNewDataChange}
                        step="0.1"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Height (cm):</label>
                      <input
                        type="number"
                        name="height"
                        value={newData.height}
                        onChange={handleNewDataChange}
                        step="0.1"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Weight (kg):</label>
                      <input
                        type="number"
                        name="weight"
                        value={newData.weight}
                        onChange={handleNewDataChange}
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
                      value={newData.noc}
                      onChange={handleNewDataChange}
                      maxLength="3"
                      required
                    />
                  </div>
                </>
              )}

              {addType === 'event' && (
                <>
                  <div className="form-group">
                    <label>Event Name:</label>
                    <input
                      type="text"
                      name="Event"
                      value={newData.Event}
                      onChange={handleNewDataChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Sport:</label>
                    <input
                      type="text"
                      name="Sport"
                      value={newData.Sport}
                      onChange={handleNewDataChange}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>City:</label>
                      <input
                        type="text"
                        name="City"
                        value={newData.City}
                        onChange={handleNewDataChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Season:</label>
                      <select
                        name="Season"
                        value={newData.Season}
                        onChange={handleNewDataChange}
                        required
                      >
                        <option value="">Select Season</option>
                        <option value="Summer">Summer</option>
                        <option value="Winter">Winter</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Year:</label>
                      <input
                        type="number"
                        name="Year"
                        value={newData.Year}
                        onChange={handleNewDataChange}
                        min="1896"
                        max="2024"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {addType === 'region' && (
                <>
                  <div className="form-group">
                    <label>NOC Code (3 letters):</label>
                    <input
                      type="text"
                      name="noc"
                      value={newData.noc}
                      onChange={handleNewDataChange}
                      maxLength="3"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Region Name:</label>
                    <input
                      type="text"
                      name="region"
                      value={newData.region}
                      onChange={handleNewDataChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Notes:</label>
                    <textarea
                      name="notes"
                      value={newData.notes}
                      onChange={handleNewDataChange}
                      className="notes-textarea"
                    />
                  </div>
                </>
              )}

              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={() => setShowAddModal(false)}>
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
                <PaginatedSearchableDropdown
                  dataOptions={dataOptions}
                  deleteCriteria={deleteCriteria}
                  setDeleteCriteria={setDeleteCriteria}
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
                  disabled={!deleteCriteria.id || deleteCriteria.confirmation !== "DELETE"}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showModifyModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Modify {modifyCriteria.type}</h3>
            <div className="form-group">
              <label>Data Type:</label>
              <select
                name="type"
                value={modifyCriteria.type}
                onChange={handleModifyInputChange}
                className="delete-select"
                required
              >
                <option value="athlete">Athlete</option>
                <option value="event">Event</option>
                <option value="region">Region</option>
              </select>
            </div>
            <div className="form-group">
              <label>Select {modifyCriteria.type} to Modify:</label>
              <PaginatedSearchableDropdown
                dataOptions={dataOptions}
                deleteCriteria={modifyCriteria}
                setDeleteCriteria={setModifyCriteria}
              />
            </div>
            <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={() => setShowModifyModal(false)}>
                  Cancel
                </button>
            </div>
            
            {modifyCriteria.id && (
              <>
                {(
                  <ModifyForm
                    type={modifyCriteria.type}
                    id={modifyCriteria.id}
                    onSubmit={handleModifySubmit}
                    onCancel={() => setShowModifyModal(false)}
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}