const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../db_connection');

class Region extends Model {

    static async getRegions() {
        try {
            const Regions = await Region.findAll();
            return Regions;
        } catch (error) {
            return null;
        }
    }

    static async createRegion(r_noc, r_region, r_notes) {
        try {
            console.log(`Creating Region ${r_noc}, ${r_region}, ${r_notes}`);
            const region = await Region.create({
                noc: r_noc,
                region: r_region,
                notes: r_notes,
            });
            return region;
        } catch (error) {
            return null;
        }
    }

    static async getRegionById(noc) {
        try {
            const region = await Region.findByPk(noc);
            return region;
        } catch (error) {
            return null;
        }
    }

}

Region.init({
    noc: {
        type: DataTypes.CHAR(3),
        primaryKey: true,
    },
    region: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    notes: {
        type: DataTypes.STRING(255),
    }
    }, {
    sequelize,
    modelName: 'Region',
    tableName: 'region',
});

module.exports = Region;