import React from 'react';

const AddAthleteModal = ({ setShowAddAthleteModal }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h3>Add New Athlete</h3>
      {/* Form logic for adding athlete */}
      <div className="modal-actions">
        <button type="button" className="cancel-button" onClick={() => setShowAddAthleteModal(false)}>Cancel</button>
        <button type="submit" className="submit-button">Submit</button>
      </div>
    </div>
  </div>
);

export default AddAthleteModal;
