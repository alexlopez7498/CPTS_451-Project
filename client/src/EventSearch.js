import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const EventSearch = () => {
  const [query, setQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [chartData, setChartData] = useState({});

  // Search for events
  const searchEvents = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/events/search?query=${query}`); // Ensure this matches the backend route
      setEvents(res.data);

      const eventNames = res.data.map(event => event.event_name); // Make sure this matches the field returned from the backend
      const athleteCount = res.data.map(event => event.athlete_count); // Example field, adjust as necessary

      setChartData({
        labels: eventNames,
        datasets: [
          {
            label: 'Number of Athletes',
            data: athleteCount,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      });
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for an event..."
        className="border p-2 rounded-lg"
      />
      <button onClick={searchEvents} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
        Search
      </button>

      {events.length > 0 && (
        <div className="mt-4">
          <Bar data={chartData} />
        </div>
      )}
    </div>
  );
};

export default EventSearch;
