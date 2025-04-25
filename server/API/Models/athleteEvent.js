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
    E_id: {
        type: DataTypes.INTEGER,
        references: {
            model: event,
            key: 'e_id'
        },
        primaryKey: true
    },
    Medal: {
        type: DataTypes.STRING(255),
    }}, {
    sequelize,
    modelName: 'Athlete_Event',
    tableName: 'athlete_event',
    timestamps: false,
})

module.exports = AthleteEvent