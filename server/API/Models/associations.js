const Athlete = require('./athlete');
const Event = require('./event');
const AthleteEvent = require('./AthleteEvent');
const Team = require('./team');
const AthleteTeam = require('./athleteTeam');
const Region = require('./region');
const AthleteRegion = require('./athleteRegion');

// Set up many-to-many relationship
Athlete.belongsToMany(Event, { through: AthleteEvent, foreignKey: 'id' });
Event.belongsToMany(Athlete, { through: AthleteEvent, foreignKey: 'e_id' });

Athlete.belongsToMany(Team, { through: AthleteTeam, foreignKey: 'id' })
Team.belongsToMany(Athlete, { through: AthleteTeam, foreignKey: 't_id' })

Athlete.belongsToMany(Region, { through: AthleteRegion, foreignKey: 'id' })
Region.belongsToMany(Region, { through: AthleteRegion, foreignKey: 'noc' })

module.exports = {
    Athlete,
    Event,
    AthleteEvent,
    Team,
    AthleteTeam,
    Region,
    AthleteRegion
};