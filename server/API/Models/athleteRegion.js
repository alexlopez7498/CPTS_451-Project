const { DataTypes, Model } = require('sequelize')
const sequelize = require('../../db_connection')
const Athlete = require('./athlete')
const Region = require('./region')

class AthleteRegion extends Model {}

AthleteRegion.init({
    id: {
        type: DataTypes.INTEGER,
        references: {
            model: Athlete,
            key: 'id'
        },
        primaryKey: true
    },
    noc: {
        type: DataTypes.STRING(3),
        references: {
            model: Region,
            key: 'noc'
        },
        primaryKey: true
    },
    sequelize,
    modelName: 'Athlete_Region',
    tableName: 'athlete_region',
    timestamps: false,
})

module.exports = AthleteRegion