const AthleteEvent = require('./athleteEvent')
const athelete = require('./athlete')
const event = require('./event')
const region = require('./region')

athelete.belongsToMany(event, {through: AthleteEvent})
event.belongsToMany(athelete, {through: AthleteEvent})

module.exports = {
    athelete,
    event,
    AthleteEvent
}