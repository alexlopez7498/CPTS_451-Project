const { DataTypes, Model } = require('sequelize')
const sequelize = require('../../db_connection')
const athlete = require('./athlete')
const event = require('./event')

class AthleteEvent extends Model {

}
AthleteEvent.init({
    id: {
        type: DataTypes.INTEGER,
        references: {
            model: athlete,
            key: 'id'
        },
        primaryKey: true
    },
    e_id: {
        type: DataTypes.INTEGER,
        references: {
            model: event,
            key: 'e_id'
        },
        primaryKey: true
    },
    medal: {
        type: DataTypes.STRING(20),
    }}, {
    sequelize,
    modelName: 'Athlete_Event',
    tableName: 'athlete_event',
    timestamps: false,
})

module.exports = AthleteEvent