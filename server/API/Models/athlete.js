const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../db_connection');

class Athlete extends Model {

    static async getAthletes() {
        try {
            const athletes = await Athlete.findAll();
            return athletes;
        } catch (error) {
            return null;
        }
    }

    static async createAthlete(a_name, a_sex, a_age, a_height, a_weight, a_noc) {
        try {

            console.log(`Creating athlete ${a_name}, ${a_sex}, ${a_age}, ${a_height}, ${a_weight}, ${a_noc}`);
            const athlete = await Athlete.create({
                name: a_name,
                sex: a_sex,
                age: a_age,
                height: a_height,
                weight: a_weight,
                noc: a_noc
            });
            return athlete;
        } catch (error) {
            throw error; 
        }
    }

    static async findByIdAndUpdate(id, data) {
        try {
            const athlete = await Athlete.findByPk(id);
            if (!athlete) {
                return null;
            }
            await athlete.update(data);
            return athlete;
        } catch (error) {
            throw error; 
        }
    }

    static async getAthleteById(id) {
        try {
            const athlete = await Athlete.findByPk(id);
            return athlete;
        } catch (error) {
            return null;
        }
    }

}

Athlete.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    sex: {
        type: DataTypes.CHAR(1),
        allowNull: false,
    },
    age: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    height: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    noc: {
        type: DataTypes.CHAR(3),
        allowNull: false,
    },
    }, {
    sequelize,
    modelName: 'Athlete',
    tableName: 'athlete',
    timestamps: false,
});

module.exports = Athlete;