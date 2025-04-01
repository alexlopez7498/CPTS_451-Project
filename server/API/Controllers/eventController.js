const  Event  = require('../Models/event');
const { Op } = require('sequelize');

// Search for events by name
exports.searchEvents = async (req, res) => {
  try {
    const { query } = req.query;

    const events = await Event.findAll({
      where: {
        Event: { 
          [Op.like]: `%${query}%`,
        },
      },
    });

    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Error fetching events' });
  }
};


exports.testEvents = async (req, res) => {
  try {
    const events = await Event.findAll(); 
    console.log('Fetched events:', events); // Log results to debug
    res.json(events);
  } catch (error) {
    console.error('Error fetching test events:', error);
    res.status(500).json({ error: 'Error fetching test events' });
  }
};