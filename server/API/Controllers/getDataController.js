import sequelize from '../../db_connection';
const Athlete = require("../Models/athlete");
const Region = require("../Models/region");
const Event = require("../Models/event");
const AthleteEvent = require('../Models/athleteEvent')

const handleGetAthletes = async (req, res) => {
    try {
        // Fetch all athletes from the database
        const athletes = await Athlete.getAthletes();
        if (!athletes) {
            return res.status(404).json({
                message: "No athletes found",
            });
        }

        res.json(athletes)
    } catch (error) {
        console.error("Error retrieving athletes:", error);
        res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
}
const handleGetRegions = async (req, res) => {
    try {
        // Fetch all regions from the database
        const regions = await Region.getRegions();
        if (!regions) {
            return res.status(404).json({
                message: "No regions found",
            });
        }

        // Send the list of regions as a response
        res.json(regions);
    } catch (error) {
        console.error("Error retrieving regions:", error);
        res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
};

const handleGetEvents = async (req, res) => {
    try {
        // Fetch all events from the database
        const events = await Event.getEvents();
        if (!events) {
            return res.status(404).json({
                message: "No events found",
            });
        }

        // Send the list of events as a response
        res.json(events);
    } catch (error) {
        console.error("Error retrieving events:", error);
        res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
}

const handleGetAthleteInfo = async (req, res) => {
    try {
        const name = req.params['name']
        const result = await sequelize.query(`SELECT Event, SUM(Medal) FROM Athlete, Event, AthleteEvent WHERE Athlete.id = AthleteEvent.A_id AND Event.E_Id = AthleteEvent.E_id AND LOWER(name) = ${name} GROUP BY Event`)
        res.json(result)
    } catch (error) {
        console.error(`Error retrieving athelete info:`, error)
        res.status(500).json({
            error: 'Internal Server Error',
            details: error.messsage
        })
    }
}

const handleGetEventInfo = async (req, res) => {
    try {
        const event = req.params['name']
        const result = await sequelize.query(`SELECT Team, SUM(Medal) FROM Athlete, Event, Athlete_Event, Team, Athlete_Team WHERE Athlete.id = AthleteEvent.A_id AND Event.E_Id = AthleteEvent.E_id AND Athlete.id = Athelete_Team.ID AND Athlete_Team.T_Id = Team.T_Id AND LOWER(Event) = ${event} GROUP BY Team`)
        res.json(result)
    } catch (error) {
        console.error(`Error retrieving event info:`, error)
        res.status(500).json({
            error: 'Internal Server Error',
            details: error.messsage
        })
    }
}

const handleGetYearInfo = async (req, res) => {
    try {
        const year = req.params['year']
        const result = await sequelize.query(`SELECT Region, SUM(Medal) FROM Athlete, Event, Athlete_Event, Region, Athlete_Region WHERE Athlete.id = AthleteEvent.A_id AND Event.E_Id = AthleteEvent.E_id AND Athlete.id = Athlete_Region.ID AND Athlete_Region.NOC = Region.NOC AND LOWER(Year) = ${year} GROUP BY Region`)
        res.json(result)
    } catch (error) {
        console.error(`Error retrieving event info:`, error)
        res.status(500).json({
            error: 'Internal Server Error',
            details: error.messsage
        })
    }
}

module.exports = {
    handleGetAthletes,
    handleGetRegions,
    handleGetEvents,
    handleGetAthleteInfo,
    handleGetEventInfo,
    handleGetYearInfo
};