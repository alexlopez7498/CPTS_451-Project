const sequelize = require('../../db_connection')
const Athlete = require("../Models/athlete");
const Region = require("../Models/region");
const Event = require("../Models/event");
const Athlete_Event = require('../Models/AthleteEvent')

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
        const result = await sequelize.query(`SELECT event, SUM(medal) FROM athlete, event, athlete_event WHERE athlete.id = athlete_event.id AND event.e_id = athlete_event.e_id AND LOWER(name) = ${name} GROUP BY event`)
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
        const result = await sequelize.query(`SELECT team, SUM(medal) FROM athlete, event, athlete_event, team, athlete_team WHERE athlete.id = athlete_event.id AND event.e_id = athlete_event.e_id AND athlete.id = athelete_team.id AND athlete_team.t_id = team.t_id AND LOWER(event) = ${event} GROUP BY team`)
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
        const result = await sequelize.query(`SELECT region, SUM(medal) FROM athlete, event, athlete_event, region, athlete_region WHERE athlete.id = athlete_event.id AND event.e_id = athlete_event.e_id AND athlete.id = athlete_region.id AND athlete_region.noc = region.noc AND year = ${year} GROUP BY region`)
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