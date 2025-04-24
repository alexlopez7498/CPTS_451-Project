const { DataTypes, Model } = require('sequelize')
const sequelize = require('../../db_connection')
const athlete = require('./athlete')
const event = require('./event')

class AthleteEvent extends Model {

}
AthleteEvent.init({
    A_id: {
        type: DataTypes.INTEGER,
        references: {
            model: athlete,
            key: 'id'
        }
    },
    E_id: {
        type: DataTypes.INTEGER,
        references: {
            model: event,
            key: 'E_id'
        }
    },
    Medal: {
        type: DataTypes.STRING
    }}, {
    sequelize,
    modelName: 'Athlete',
    tableName: 'athlete',
    timestamps: false,
})

module.exports = AthleteEvent