const Athlete = require("../Models/athlete");
const Region = require("../Models/region");
const Event = require("../Models/event");

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

module.exports = {
    handleGetAthletes,
    handleGetRegions,
    handleGetEvents
};