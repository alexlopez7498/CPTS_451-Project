import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Chart from '../Chart'; // Chart component for visualizations
import SearchResults from '../SearchResults'; // Search results component
import AdminControls from '../AdminControls'; // Admin controls component
import AddAthleteModal from '../AddAthleteModal'; // Add Athlete Modal
import DeleteDataModal from '../DeleteDataModal'; // Delete Data Modal
import EventSearch from '../EventSearch';
import "../styles/LandingPage.css";

export default function LandingPage({ isAdmin, setIsAdmin }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [showAddAthleteModal, setShowAddAthleteModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataOptions, setDataOptions] = useState({
    athlete: [],
    event: [],
    region: [],
  });

  const navigate = useNavigate();

  // Fetch data logic
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

        console.log("Fetched athletes:", athletes);
        console.log("Fetched events:", events);

        // Correctly calling setDataOptions
        setDataOptions({
          athlete: athletes,
          event: events,
          region: regions
        });

        console.log("Data options set:", {
          athlete: athletes,
          event: events,
          region: regions
        });

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Runs on initial render

  const handleSearch = async () => {
    console.log('Search query:', query);

    try {
      const response = await fetch(`http://localhost:5000/api/events/search?query=${query}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data.results);

        // Check if the query matches an event name and fetch event data
        const matchedEvent = data.results.find((item) => item.type === 'event');
        if (matchedEvent) {
          await fetchEventData(matchedEvent.name);
        } else {
          setChartData([]);
        }
      } else {
        console.error('Search failed');
        setResults([]);
      }
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    navigate('/');
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
        <p className="subtitle">Search and explore data about Olympic athletes, events, and records.</p>

        {/* Search section */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search athletes, sports, or years..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">🔍 Search</button>
        </div>

        <EventSearch dataOptions={dataOptions} />

        {/* Results section */}
        <SearchResults results={results} chartData={chartData} />

        {/* Admin Controls */}
        {isAdmin && <AdminControls setShowAddAthleteModal={setShowAddAthleteModal} setShowDeleteModal={setShowDeleteModal} />}

        {/* Modals */}
        {showAddAthleteModal && <AddAthleteModal setShowAddAthleteModal={setShowAddAthleteModal} />}
        {showDeleteModal && <DeleteDataModal setShowDeleteModal={setShowDeleteModal} />}
      </div>
    </div>
  );
}









// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Select from 'react-select';
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";
// import "../styles/LandingPage.css";

// export default function LandingPage({ isAdmin, setIsAdmin }) {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [chartData, setChartData] = useState([]);
//   const navigate = useNavigate();

//   // Add Athlete Modal states
//   const [showAddAthleteModal, setShowAddAthleteModal] = useState(false);
//   const [newAthlete, setNewAthlete] = useState({
//     name: '',
//     sex: '',
//     age: '',
//     height: '',
//     weight: '',
//     noc: ''
//   });

//   // Delete Data Modal states
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deleteCriteria, setDeleteCriteria] = useState({
//     type: 'athlete',
//     id: '', // Add id field
//     name: '',
//     confirmation: ''
//   });

//   // State for dynamically fetched data
//   const [dataOptions, setDataOptions] = useState({
//     athlete: [],
//     event: [],
//     region: []
//   });

//   // Fetch data from the backend
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [athleteRes, eventRes, regionRes] = await Promise.all([
//           fetch('http://localhost:5000/api/getAthletes'),
//           fetch('http://localhost:5000/api/getRegions'),
//           fetch('http://localhost:5000/api/getEvents')
//         ]);

//         const [athletes, events, regions] = await Promise.all([
//           athleteRes.json(),
//           eventRes.json(),
//           regionRes.json()
//         ]);
//         console.log("Fetched athletes:", athletes);
//         console.log("Fetched events:", events);
//         setDataOptions({
//           athlete: athletes,
//           event: events,
//           region: regions
//         });
//         console.log("Data options set:", dataOptions);
//         console.log("Data options athletes:", dataOptions.athlete);
//         console.log("Data options events:", dataOptions.event);
//         console.log("Data options regions:", dataOptions.region);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleSearch = () => {
//     console.log("Search query:", query);
//     // Hardcoded sample data for demonstration
//     setResults(["Usain Bolt"]); // Example result
//     setChartData([
//       { event: "100m", medals: 3 },
//       { event: "200m", medals: 3 },
//       { event: "4x100m Relay", medals: 2 },
//     ]);
//   };

//   const handleLogout = () => {
//     setIsAdmin(false);
//     navigate("/");
//   };

//   // Add Athlete handlers
//   const handleAddAthleteClick = () => {
//     setShowAddAthleteModal(true);
//   };

//   const handleAthleteInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewAthlete(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmitAthlete = async (e) => {
//     e.preventDefault();
//     console.log("Submitting new athlete:", newAthlete);

//     const athleteData = {
//       name: newAthlete.name,
//       sex: newAthlete.sex,
//       age: newAthlete.age,
//       height: newAthlete.height,
//       weight: newAthlete.weight,
//       noc: newAthlete.noc
//     };

//     try {
//       const response = await fetch('http://localhost:5000/api/insertAthlete', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(athleteData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         alert('New Athlete inserted!');
//       } else {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Insert failed');
//       }

//       setShowAddAthleteModal(false);
//       setNewAthlete({
//         name: '',
//         sex: '',
//         age: '',
//         height: '',
//         weight: '',
//         noc: ''
//       });
//     } catch (error) {
//       console.error("Error adding athlete:", error);
//       alert("Failed to add athlete");
//     }
//   };

//   const handleDeleteDataClick = () => {
//     setShowDeleteModal(true);
//   };

//   const handleDeleteInputChange = (e) => {
//     const { name, value } = e.target;
//     setDeleteCriteria(prev => ({
//       ...prev,
//       [name]: value,
//       ...(name === 'type' && { name: '' })
//     }));
//   };

//   const handleDeleteSubmit = async (e) => {
//     e.preventDefault();

//     console.log("Deleting:", deleteCriteria);

//     try {
//       // Prepare the data to send to the API
//       const deleteData = {
//         type: deleteCriteria.type,
//         id: deleteCriteria.id, // Include id
//         name: deleteCriteria.name
//       };

//       // Make the API call
//       const response = await fetch(`http://localhost:5000/api/delete${deleteCriteria.type}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(deleteData),
//       });

//       if (response.ok) {
//         alert(`${deleteCriteria.name} (${deleteCriteria.type}) deleted successfully!`);
//       } else {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Delete failed');
//       }

//       // Reset the delete modal state
//       setShowDeleteModal(false);
//       setDeleteCriteria({
//         type: 'athlete',
//         id: '', 
//         name: '',
//         confirmation: ''
//       });
//     } catch (error) {
//       console.error("Error deleting data:", error);
//       alert("Failed to delete data");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="overlay"></div>

//       {/* Authentication button */}
//       {!isAdmin ? (
//         <Link to="/login" className="auth-button">
//           Log in as Administrator
//         </Link>
//       ) : (
//         <button onClick={handleLogout} className="auth-button">
//           Logout
//         </button>
//       )}

//       <div className="content">
//         <h1 className="title">Olympic Athlete Database</h1>
//         <p className="subtitle">
//           Search and explore data about Olympic athletes, events, and records.
//         </p>

//         {/* Search section */}
//         <div className="search-container">
//           <input
//             type="text"
//             placeholder="Search athletes, sports, or years..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="search-input"
//           />
//           <button onClick={handleSearch} className="search-button">
//             🔍 Search
//           </button>
//         </div>

//         {/* Results section */}
//         <div className="results-container">
//           <h2 className="results-title">Results</h2>
//           <ul>
//             {results.length > 0 ? (
//               results.map((result, index) => (
//                 <li key={index} className="result-item">{result}</li>
//               ))
//             ) : (
//               <p className="no-results">No results found.</p>
//             )}
//           </ul>
//           {chartData.length > 0 && (
//             <div className="chart-container">
//               <h3>Medal Wins by Event</h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={chartData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="event" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="medals" fill="#8884d8" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           )}
//         </div>

//         {isAdmin && (
//           <div className="admin-controls">
//             <h2>Admin Controls</h2>
//             <div className="admin-buttons-container">
//               <button className="admin-button" onClick={handleAddAthleteClick}>
//                 Add Athlete
//               </button>
//               <button className="admin-button">Modify Records</button>
//               <button className="admin-button" onClick={handleDeleteDataClick}>
//                 Delete Data
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Add Athlete Modal */}
//       {showAddAthleteModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Add New Athlete</h3>
//             <form onSubmit={handleSubmitAthlete}>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Name:</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={newAthlete.name}
//                     onChange={handleAthleteInputChange}
//                     maxLength="255"
//                     required
//                   />
//                 </div>
                
//                 <div className="form-group">
//                   <label>Sex (M/F):</label>
//                   <input
//                     type="text"
//                     name="sex"
//                     value={newAthlete.sex}
//                     onChange={handleAthleteInputChange}
//                     maxLength="1"
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Age:</label>
//                   <input
//                     type="number"
//                     name="age"
//                     value={newAthlete.age}
//                     onChange={handleAthleteInputChange}
//                     step="0.1"
//                     required
//                   />
//                 </div>
                
//                 <div className="form-group">
//                   <label>Height:</label>
//                   <input
//                     type="number"
//                     name="height"
//                     value={newAthlete.height}
//                     onChange={handleAthleteInputChange}
//                     step="0.1"
//                     required
//                   />
//                 </div>
                
//                 <div className="form-group">
//                   <label>Weight:</label>
//                   <input
//                     type="number"
//                     name="weight"
//                     value={newAthlete.weight}
//                     onChange={handleAthleteInputChange}
//                     step="0.1"
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div className="form-group">
//                 <label>NOC (3-letter code):</label>
//                 <input
//                   type="text"
//                   name="noc"
//                   value={newAthlete.noc}
//                   onChange={handleAthleteInputChange}
//                   maxLength="3"
//                   required
//                 />
//               </div>
              
//               <div className="modal-actions">
//                 <button type="button" className="cancel-button" onClick={() => setShowAddAthleteModal(false)}>
//                   Cancel
//                 </button>
//                 <button type="submit" className="submit-button">
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Delete Data Modal */}
//       {showDeleteModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Delete Data</h3>
//             <div className="danger-text">Warning: This action cannot be undone</div>
//             <form onSubmit={handleDeleteSubmit}>
//               <div className="form-group">
//                 <label>Data Type:</label>
//                 <select
//                   name="type"
//                   value={deleteCriteria.type}
//                   onChange={handleDeleteInputChange}
//                   className="delete-select"
//                   required
//                 >
//                   <option value="athlete">Athlete</option>
//                   <option value="event">Event</option>
//                   <option value="region">Region</option>
//                 </select>
//               </div>
              
//               <div className="form-group">
//                 <label>Select {deleteCriteria.type} to Delete:</label>
//                 <Select
//                   options={dataOptions[deleteCriteria.type]?.map(item => ({
//                     value: item.id, // Use id as the value
//                     label: item.name // Display name as the label
//                   })) || []}
//                   value={dataOptions[deleteCriteria.type]?.map(item => ({
//                     value: item.id,
//                     label: item.name
//                   })).find(option => option.value === deleteCriteria.id)} // Match by id
//                   onChange={(selectedOption) =>
//                     setDeleteCriteria(prev => ({
//                       ...prev,
//                       id: selectedOption?.value || '', // Set id
//                       name: selectedOption?.label || '' // Set name
//                     }))
//                   }
//                   isDisabled={!deleteCriteria.type}
//                   placeholder={`-- Select ${deleteCriteria.type} --`}
//                   isSearchable
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label>Type "DELETE" to confirm:</label>
//                 <input
//                   type="text"
//                   name="confirmation"
//                   value={deleteCriteria.confirmation}
//                   onChange={handleDeleteInputChange}
//                   placeholder="Type DELETE to confirm"
//                   required
//                 />
//               </div>
              
//               <div className="modal-actions">
//                 <button type="button" className="cancel-button" onClick={() => setShowDeleteModal(false)}>
//                   Cancel
//                 </button>
//                 <button 
//                   type="submit" 
//                   className="delete-button"
//                   disabled={!deleteCriteria.name || deleteCriteria.confirmation !== "DELETE"}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }