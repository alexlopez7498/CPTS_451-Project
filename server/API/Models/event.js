const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../db_connection');

class Event extends Model {

    static async getEvents() {
        try {
            const events = await Event.findAll();
            return events;
        } catch (error) {
            console.error('Error fetching events:', error);
            return null;
        }
    }

    static async createEvent(eventName, sport, city, season, year) {
        try {
            console.log(`Creating Event: ${eventName}, ${sport}, ${city}, ${season}, ${year}`);
            const event = await Event.create({
                Event: eventName,
                Sport: sport,
                City: city,
                Season: season,
                Year: year,
            });
            return event;
        } catch (error) {
            console.error('Error creating event:', error);
            return null;
        }
    }

    static async getEventById(eventId) {
        try {
            const event = await Event.findByPk(eventId);
            return event;
        } catch (error) {
            console.error('Error fetching event by ID:', error);
            return null;
        }
    }

    static async findByIdAndUpdate(id, data) {
        try {
            const event = await Event.findByPk(id);
            if (!event) {
                return null;
            }
            await event.update(data);
            return event;
        } catch (error) {
            console.error('Error updating event:', error);
            return null;
        }
    }
}

Event.init({
    e_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    event: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    sport: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    season: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Event',
    tableName: 'event',
    timestamps: false,
});

module.exports = Event;