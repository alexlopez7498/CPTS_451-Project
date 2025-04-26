const sequelize = require('../../db_connection')
const Athlete = require("../Models/athlete");
const Region = require("../Models/region");
const Event = require("../Models/event");
const Athlete_Event = require('../Models/AthleteEvent')
const { QueryTypes } = require('sequelize')

const handleGetAthletes = async (req, res) => {
    try {
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
        const regions = await Region.getRegions();
        if (!regions) {
            return res.status(404).json({
                message: "No regions found",
            });
        }

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
        const events = await Event.getEvents();
        if (!events) {
            return res.status(404).json({
                message: "No events found",
            });
        }

        res.json(events);
    } catch (error) {
        console.error("Error retrieving events:", error);
        res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
}


const handleGetAthlete = async (req, res) => {
    const { id } = req.params;
    try {
        const athlete = await Athlete.getAthleteById(id);
        if (!athlete) {
            return res.status(404).json({
                message: "Athlete not found",
            });
        }

        res.json(athlete);
    } catch (error) {
        console.error("Error retrieving athlete:", error);
        res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
}

const handleGetEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.getEventById(id);
        if (!event) {
            return res.status(404).json({
                message: "Event not found",
            });
        }

        res.json(event);
    } catch (error) {
        console.error("Error retrieving event:", error);
        res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
}

const handleGetRegion = async (req, res) => {
    const { id } = req.params;
    try {
        const region = await Region.getRegionById(id);
        if (!region) {
            return res.status(404).json({
                message: "Region not found",
            });
        }

        res.json(region);
    } catch (error) {
        console.error("Error retrieving region:", error);
        res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
}
const handleGetAthleteInfo = async (req, res) => {
    try {
        const name = req.params['name']
        const result = await sequelize.query(`SELECT event, COUNT(Medal) AS medals FROM athlete, event, athlete_event WHERE athlete.id = athlete_event.id AND event.e_id = athlete_event.e_id AND LOWER(name) = :name GROUP BY event`, {
            replacements: { name: name },
            type: QueryTypes.SELECT
        })
        console.log(result)
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
        const result = await sequelize.query(`SELECT team, COUNT(Medal) AS golds FROM athlete, event, athlete_event, team, athlete_team WHERE athlete.id = athlete_event.id AND event.e_id = athlete_event.e_id AND athlete.id = athlete_team.id AND athlete_team.t_id = team.t_id AND LOWER(event) = :event AND LOWER(Medal) = 'gold' GROUP BY team`, {
            replacements: { event: event },
            type: QueryTypes.SELECT
            
        })
        console.log(result)
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
        const result = await sequelize.query(`SELECT region AS country, COUNT(Medal) AS medals FROM athlete, event, athlete_event, region, athlete_region WHERE athlete.id = athlete_event.id AND event.e_id = athlete_event.e_id AND athlete.id = athlete_region.id AND athlete_region.noc = region.noc AND year = ${year} GROUP BY region`, {
            type: QueryTypes.SELECT
        })
        console.log(result)
        res.json(result)
    } catch (error) {
        console.error(`Error retrieving year info:`, error)
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
    handleGetAthlete,
    handleGetEvent,
    handleGetRegion,
    handleGetAthleteInfo,
    handleGetEventInfo,
    handleGetYearInfo,
};
