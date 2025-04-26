const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../db_connection');

class Team extends Model {}

Team.init({
    t_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    noc: {
        type: DataTypes.STRING(3),
        allowNull: false
    },
    team: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    sequelize,
    modelName: 'Team',
    tableName: 'team',
    timestamps: false,
})

module.exports = Team