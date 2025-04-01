import React from 'react';

const AdminControls = ({ setShowAddAthleteModal, setShowDeleteModal }) => (
  <div className="admin-controls">
    <h2>Admin Controls</h2>
    <div className="admin-buttons-container">
      <button className="admin-button" onClick={() => setShowAddAthleteModal(true)}>Add Athlete</button>
      <button className="admin-button">Modify Records</button>
      <button className="admin-button" onClick={() => setShowDeleteModal(true)}>Delete Data</button>
    </div>
  </div>
);

export default AdminControls;
