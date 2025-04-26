const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../db_connection');
const Athlete = require('./athlete');
const Team = require('./team');

class AthleteTeam extends Model {}

AthleteTeam.init({
    id: {
        type: DataTypes.INTEGER,
        references: {
            model: Athlete,
            key: 'id'
        },
        primaryKey: true
    },
    t_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Team,
            key: 't_id'
        },
        primaryKey: true
    },
    sequelize,
    modelName: 'Athlete_Team',
    tableName: 'athlete_team',
    timestamps: false,
})

module.exports = AthleteTeam