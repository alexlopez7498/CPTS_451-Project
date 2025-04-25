const Athlete = require('./athlete');
const Event = require('./event');
const AthleteEvent = require('./AthleteEvent');

// Set up many-to-many relationship
Athlete.belongsToMany(Event, { through: AthleteEvent, foreignKey: 'id' });
Event.belongsToMany(Athlete, { through: AthleteEvent, foreignKey: 'E_id' });

module.exports = {
    Athlete,
    Event,
    AthleteEvent
};